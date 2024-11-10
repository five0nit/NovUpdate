// app/components/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { CircleUser, Menu as MenuIcon, Hammer, Search as SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            {/* Desktop Navigation */}
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Hammer className="h-6 w-6" />
                    <span className="">OzQuotes</span>
                </Link>
                <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
                    Dashboard
                </Link>
                <Link href="/projects" className="text-muted-foreground transition-colors hover:text-foreground">
                    Projects
                </Link>
                <Link href="/renovate" className="text-muted-foreground transition-colors hover:text-foreground">
                    Renovate
                </Link>
                <Link href="/companies" className="text-muted-foreground transition-colors hover:text-foreground">
                    Companies
                </Link>
                <Link href="/analytics" className="text-muted-foreground transition-colors hover:text-foreground">
                    Analytics
                </Link>
                <Link href="/settings" className="text-muted-foreground transition-colors hover:text-foreground">
                    Settings
                </Link>
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <MenuIcon className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                            <Hammer className="h-6 w-6" />
                            <span className="">OzQuotes</span>
                        </Link>
                        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                            Dashboard
                        </Link>
                        <Link href="/projects" className="text-muted-foreground hover:text-foreground">
                            Projects
                        </Link>
                        <Link href="/renovate" className="text-muted-foreground hover:text-foreground">
                            Renovate
                        </Link>
                        <Link href="/companies" className="text-muted-foreground hover:text-foreground">
                            Companies
                        </Link>
                        <Link href="/analytics" className="text-muted-foreground hover:text-foreground">
                            Analytics
                        </Link>
                        <Link href="/settings" className="text-muted-foreground hover:text-foreground">
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>

            {/* Right Side Icons */}
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search quotes ..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;