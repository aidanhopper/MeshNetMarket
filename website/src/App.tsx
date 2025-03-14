import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './UserProvider';
import SocketProvider from './SocketProvider';
import Landing from './Landing';
import Login from './Login';
import Success from './Success';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import UserSubscriber from './UserSubscriber';

const App = () => {
    return (
        <UserProvider>
            <SocketProvider>
                <UserSubscriber>
                    <Router>
                        <Routes>
                            <Route path='/' element={<Landing />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/login/success' element={<Success />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/dashboard/communities' element={<Dashboard />} />
                            <Route path='/dashboard/services' element={<Dashboard />} />
                            <Route path='/dashboard/services/create' element={<Dashboard />} />
                            <Route path='/dashboard/services/edit/:id' element={<Dashboard />} />
                            <Route path='/dashboard/devices' element={<Dashboard />} />
                            <Route path='/dashboard/devices/add' element={<Dashboard />} />
                            <Route path='/dashboard/settings' element={<Dashboard />} />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </Router >
                </UserSubscriber>
            </SocketProvider>
        </UserProvider>
    )
}

export default App;
