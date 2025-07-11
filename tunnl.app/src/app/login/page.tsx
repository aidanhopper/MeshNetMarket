'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const Login = () => {
    const params = useSearchParams();
    const redirect = params?.get('redirect');
    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <Card>
                <CardContent className='flex p-4'>
                    <div className='flex flex-col gap-6 items-center w-sm'>
                        <h1 className="text-2xl font-bold text-center">Welcome</h1>
                        <p className="text-balance text-muted-foreground text-center">
                            Login or register your <span className='font-semibold'>tunnl.app</span> account
                        </p>
                        <Button
                            onClick={() => signIn('keycloak', { callbackUrl: redirect ?? '/' })}
                            className="w-64 cursor-pointer">
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}

export default Login;
