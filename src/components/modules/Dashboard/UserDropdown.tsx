'use client';

import { UserInfo } from '@/services/types/user.interface';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import LogoutButton from '../Shared/LogoutButton';
import Link from 'next/link';
import { Settings, User } from 'lucide-react';

interface UserDropdownProps {
    userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <span className="text-sm font-semibold">{userInfo && userInfo.name.charAt(0).toUpperCase()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" sideOffset={12}>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{userInfo.name}</p>
                        <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                        <p className="text-xs text-primary capitalize">{userInfo.role.toLowerCase()}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={'/my-profile'} className="cursor-pointer flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Link>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/change-password'} className="cursor-pointer flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            Change Password
                        </Link>
                        <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    GitHub
                    <DropdownMenuShortcut>⇧⌘G</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    API
                    <DropdownMenuShortcut>⇧⌘G</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                    <LogoutButton />
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
