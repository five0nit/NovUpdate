"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Moon, Sun, Menu, X, Search, User, LogOut, Settings 
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', ariaLabel: 'Navigate to Dashboard' },
  { href: '/projects', label: 'Projects', ariaLabel: 'View Projects' },
  { href: '/renovate', label: 'Renovate', ariaLabel: 'Renovation Services' },
  { href: '/companies', label: 'Companies', ariaLabel: 'View Companies' },
  { href: '/analytics', label: 'Analytics', ariaLabel: 'View Analytics' },
  { href: '/settings', label: 'Settings', ariaLabel: 'Adjust Settings' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // Persist dark mode preference and check authentication
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const authToken = localStorage.getItem('authToken');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
    
    setIsAuthenticated(!!authToken);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'unset' : 'hidden';
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search navigation or modal
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        "bg-white dark:bg-gray-900 shadow-md"
      )}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold text-primary"
          aria-label="OzQuotes Home"
        >
          OzQuotes
        </Link>

        {/* Search Input (Desktop) */}
        <form 
          onSubmit={handleSearch} 
          className="hidden md:flex items-center flex-grow mx-4 max-w-md"
        >
          <div className="relative w-full">
            <input 
              type="search"
              placeholder="Search quotes, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              size={20} 
            />
          </div>
        </form>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="mr-2"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                aria-label={item.ariaLabel}
                className={cn(
                  "text-gray-600 dark:text-gray-300 hover:text-primary transition-colors",
                  pathname === item.href && "text-primary font-semibold"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          
          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {isAuthenticated ? (
              <>
                <Link href="/profile" aria-label="User Profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/logout" aria-label="Logout">
                  <Button variant="ghost" size="icon">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </ul>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-white/90 dark:bg-gray-900/95 z-50 overflow-y-auto"
            role="menu"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Search */}
              <form 
                onSubmit={handleSearch} 
                className="mb-6 flex items-center"
              >
                <div className="relative w-full">
                  <input 
                    type="search"
                    placeholder="Search quotes, projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <Search 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                    size={20} 
                  />
                </div>
              </form>

              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleMenu}
                  aria-label="Close Menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      onClick={toggleMenu}
                      role="menuitem"
                      aria-label={item.ariaLabel}
                      className={cn(
                        "block py-3 px-4 rounded-md text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                        pathname === item.href && "bg-primary/10 text-primary font-semibold"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                {/* Mobile User Actions */}
                <div className="mt-6 pt-4 border-t dark:border-gray-700 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm dark:text-gray-300">Dark Mode</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleDarkMode}
                      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </div>

                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <Link 
                        href="/profile" 
                        onClick={toggleMenu}
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <User className="mr-3 h-5 w-5" />
                        Profile
                      </Link>
                      <Link 
                        href="/settings" 
                        onClick={toggleMenu}
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
                      </Link>
                      <Link 
                        href="/logout" 
                        onClick={toggleMenu}
                        className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500"
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <Link 
                      href="/login" 
                      onClick={toggleMenu}
                      className="block w-full text-center py-3 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
