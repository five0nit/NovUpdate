// app/components/Footer.tsx
'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t bg-gray-100 mt-8 py-6">
            <div className="mx-auto max-w-7xl px-4">
                <Separator />
                <p className="text-center text-sm text-gray-500 mt-4">
                    &copy; 2024 Oz Quotes
                </p>
            </div>
        </footer>
    );
};

export default Footer;
