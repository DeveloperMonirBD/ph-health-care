import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getCookie } from '@/services/auth/tokenHandlers';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const PublicNavbar = async () => {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Consultation', href: '/consultation' },
        { name: 'Health Plans', href: '/health-plans' },
        { name: 'Diagnostics', href: '/diagnostics' },
        { name: 'NGOs', href: '/ngos' }
    ];

    const accessToken = await getCookie('accessToken');

    return (
        <header className=" flex items-center justify-between sticky top-0 z-50 w-full bg-background/95 px-4 shadow-md">
            <div className="container mx-auto flex h-16 w-full items-center justify-between px-4">
                {/* Logo Section */}
                <div>
                    <Link href="/" className="flex items-center justify-center text-xl font-bold text-primary">
                        PH-DOC.
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-6">
                        {navItems.map(item => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login Button */}
                <div className="hidden md:block items-center space-x-2">
                    {accessToken ? (
                        <LogoutButton />
                    ) : (
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu Placeholder */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-name">Name</Label>
                                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="sheet-demo-username">Username</Label>
                                <Input id="sheet-demo-username" defaultValue="@peduarte" />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                            <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default PublicNavbar;
