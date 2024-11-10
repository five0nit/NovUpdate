"use client";

import { Charts } from "@/app/components/Charts";

export default function AnalyticsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">View Analytics from your Quotes</h1>
            <Charts />
        </div>
    );
}