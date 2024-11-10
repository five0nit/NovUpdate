// app/api/generate/route.ts

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { promptConfig, PromptConfig } from '@/utils/promptConfig';


// Initialize Replicate client with your API token
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
    try {
        const { imageUrl, prompt } = await request.json();

        // Ensure the API token is set
        if (!process.env.REPLICATE_API_TOKEN) {
            console.error('REPLICATE_API_TOKEN is not set');
            return NextResponse.json(
                { error: 'REPLICATE_API_TOKEN is not set' },
                { status: 500 }
            );
        }

        // Create a prediction using the Replicate library
        const prediction = await replicate.predictions.create({
            version:
                '854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b', // Use your model version ID
            input: {
                image: imageUrl,
                prompt: prompt,
                ...promptConfig as PromptConfig,
            },
        });

        console.log('Prediction created:', prediction);

        // Poll for completion
        let output = null;
        while (!output && prediction.status !== 'failed') {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const updatedPrediction = await replicate.predictions.get(
                prediction.id
            );
            if (updatedPrediction.status === 'succeeded') {
                output = updatedPrediction.output;
            } else if (updatedPrediction.status === 'failed') {
                return NextResponse.json(
                    { error: 'Failed to generate the image.' },
                    { status: 500 }
                );
            }
        }

        console.log('Output from Replicate:', output);

        // The output is an array of image URLs
        // Return the second image URL (index 1) as the restored image
        let restoredImage: string | null = null;

        if (Array.isArray(output) && typeof output[1] === 'string') {
            restoredImage = output[1]; // Get the second image
        } else if (Array.isArray(output) && typeof output[0] === 'string') {
            restoredImage = output[0]; // Fallback to the first image if second is not available
        } else if (typeof output === 'string') {
            restoredImage = output;
        } else {
            console.error('Unexpected output structure:', output);
            return NextResponse.json(
                { error: 'Unexpected output structure from Replicate API.' },
                { status: 500 }
            );
        }

        console.log('Restored Image URL:', restoredImage);

        return NextResponse.json({ restoredImage }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error in API route:', error);

        let errorMessage = 'Internal Server Error';

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
