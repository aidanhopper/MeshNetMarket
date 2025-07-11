'use client'

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { BadgeCheck, Download, Github, LogOut, Terminal } from 'lucide-react';
import ThemeSwitcher from '@/components/theme-switcher';
import Content from '@/components/content';
import { clearLocalSession, useCachedImage, useLocalSession } from '@/lib/hooks';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data } = useLocalSession();
    const router = useRouter();
    const cachedAvatar = useCachedImage(data?.user?.image);

    return (
        <nav className='w-full h-14 top-0 flex items-center bg-background/60 backdrop-blur-3xl sticky'>
            <Content className='grid grid-cols-2'>
                <div>
                    <span className='flex h-full font-mono items-center text-lg'>
                        tunnl.app
                    </span>
                </div>
                <div className='gap-4 flex h-full justify-end items-center'>
                    <Button
                        size='icon'
                        variant='ghost'
                        className='cursor-pointer text-muted-foreground'
                        asChild>
                        <Link
                            target='_blank'
                            href='https://github.com/aidanhopper/MeshNetMarket'>
                            <Github />
                        </Link>
                    </Button>
                    <Button
                        variant='ghost'
                        className='text-muted-foreground cursor-pointer hidden md:block'>
                        Download
                    </Button>
                    {data?.user ? <>
                        <Button
                            variant='ghost'
                            className='cursor-pointer text-muted-foreground hidden md:block'
                            asChild>
                            <Link href='/dashboard'>
                                Dashboard
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant='ghost' className='cursor-pointer' asChild>
                                    <Avatar className="h-9 w-9 p-0">
                                        <AvatarImage
                                            src={cachedAvatar ?? ''}
                                        />
                                        <AvatarFallback className="rounded-lg">A</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className='cursor-pointer'>
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer md:hidden' asChild>
                                    <Link href='/dashboard'>
                                        <Terminal />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer md:hidden'>
                                    <Download />
                                    Download
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        signOut({ redirect: false });
                                        clearLocalSession();
                                        router.push('/');
                                    }}
                                    className='cursor-pointer'>
                                    <LogOut />
                                    Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </> :
                        <>
                            <Button asChild>
                                <Link href={`/login?redirect=${encodeURIComponent('/dashboard')}`}>
                                    Sign in
                                </Link>
                            </Button>
                        </>
                    }
                    <ThemeSwitcher />
                </div>
            </Content>
        </nav>
    );
}

export default Navbar;
