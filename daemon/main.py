import socketio
import subprocess
import platform
from hashlib import sha256
import time
import threading
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
import requests
import json
from tunneler import Tunneler
from dotenv import load_dotenv
import os
import atexit

load_dotenv()

app = FastAPI()
sio = socketio.Client()

origins = [
    "http://localhost:5173",
    "https://tunnl.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_hardware_id():
    sys = platform.system().lower()
    id = None

    match sys:
        case 'darwin':
            id = subprocess.check_output("""
                ioreg -rd1 -c IOPlatformExpertDevice |
                 grep -E "IOPlatformUUID" | awk '{ print $3 }' | sed 's/\"//g'
                """, shell=True
            ).decode().strip()

        case 'win32':
            id = subprocess.check_output("""
                reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid
                """, shell=True
            ).decode().strip()

        case 'linux':
            id = subprocess.check_output("""
                cat /etc/machine-id
                """, shell=True
            ).decode().strip()

    if id == None:
        return None

    return sha256(id.encode()).hexdigest()

token = None
hwid = get_hardware_id()
tunneler = Tunneler(hwid)

# for some reason the tunneler is not stopping on my linux box
atexit.register(tunneler.stop)

if hwid is None:
    print('Cannot generate HWID')
    exit(1)

def get_hostname():
    return subprocess.check_output('hostname').decode().strip()

@sio.event
def connect():
    print('Connected to https://tunnl.app')

@sio.event
def disconnect():
    print('Disconnected from https://tunnl.app')

@sio.on('register:request')
def handle_server_register_request():
    return { 'hwid': hwid, 'enrolled': tunneler.enrolled }

@sio.on('register:response')
def handle_register_response(data):
    global token
    token = data['token']

@sio.on('tunneler:start')
def handle_start_tunneler():
    print('Starting tunneler')
    tunneler.start()
    time.sleep(1)
    return { 'success': tunneler.is_running() }

@sio.on('tunneler:stop')
def handle_start_tunneler():
    print('Stopping tunneler')
    tunneler.stop()
    return { 'success': not tunneler.is_running() }

@sio.on('tunneler:status')
def handle_tunneler_status_request():
    return tunneler.status()

@sio.on('tunneler:set:dns-ip-range')
def handle_set_dns_ip_range(data):
    tunneler.dns_ip_range = data['dns_ip_range']
    return { 'success': True }

@sio.on('tunneler:enroll')
def handle_enroll(data):
    jwt = data['jwt']
    tunneler.enroll(jwt)
    return { 'success': tunneler.enrolled }

@sio.on('tunneler:is-enrolled')
def handle_is_enrolled():
    return tunneler.enrolled

def start_socket_client():
    print("Trying to connect to https://tunnl.app")
    while True:
        try: 
            sio.connect(f'{os.getenv('SERVER_URL')}', socketio_path='/daemon.sock')
            break
        except socketio.exceptions.ConnectionError:
            time.sleep(5)
    sio.wait()

@app.get('/v1/authenticate/{userid}')
async def authenticate(userid: str):
    global token
    if token is None:
        raise HTTPException(status_code=500, detail='Daemon not registered')

    url = f'{os.getenv('SERVER_URL')}/api/v1/daemon'

    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    }

    body = {
        'userid': userid,
        'hostname': get_hostname(),
    }

    r = requests.post(url, json=body, headers=headers)

    if r.status_code != 200:
        raise HTTPException(status_code=500, detail='Failed to authenticate')

    return { 'message': 'Successfully authenticated user with daemon' }

@app.get('/v1/hostname')
async def hostname():
    return { 'hostname': get_hostname() }

def start_unvicorn():
    uvicorn.run(app, host='127.0.0.1', port=45789)

if __name__ == '__main__':
    socket_thread = threading.Thread(target=start_socket_client, daemon=True)
    uvicorn_thread = threading.Thread(target=start_unvicorn, daemon=True)
    socket_thread.start()
    uvicorn_thread.start()
    uvicorn_thread.join()
