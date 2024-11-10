"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NeedQuotesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Need Quotes Fast!</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                We're working on getting you quotes as quickly as possible. This feature is coming soon!
            </p>
            <div className="flex justify-center">
                <Link href="/">
                    <Button
                        variant="default"
                        size="lg"
                        className="bg-black hover:bg-[#5fd0c7] text-white hover:text-black transition-colors duration-300"
                    >
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}