"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { CompareSlider } from "../components/CompareSlider";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/resizablePanel";
import Toggle from "../components/Toggle";
import appendNewToName from "@/utils/appendNewToName";
import downloadPhoto from "@/utils/downloadPhoto";

// Initialize the uploader with your API key or use "free" for testing
const uploader = Uploader({
    apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY || "free",
});

// Configuration options for the uploader
const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    styles: { colors: { primary: "#000" } },
};

const Home: NextPage = () => {
    // State variables
    const [prompt, setPrompt] = useState<string>("");
    const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
    const [restoredImage, setRestoredImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
    const [sideBySide, setSideBySide] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [photoName, setPhotoName] = useState<string | null>(null);

    // UploadDropZone component
    const UploadDropZone = () => (
        <UploadDropzone
            uploader={uploader}
            options={options}
            onUpdate={(file) => {
                if (file.length !== 0) {
                    setPhotoName(file[0].originalFile.originalFileName);
                    setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
                }
            }}
            width="100%"
            height="250px"
        />
    );

    // generatePhoto function
    async function generatePhoto(fileUrl: string, prompt: string) {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl: fileUrl, prompt: prompt }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.error || "An error occurred");
                return;
            }
            const data = await res.json();
            if (typeof data.restoredImage === "string") {
                setRestoredImage(data.restoredImage);
            } else {
                setError("Invalid image URL received");
            }

            console.log("Data received from API:", data);
            console.log("Type of data.restoredImage:", typeof data.restoredImage);
            setRestoredImage(data.restoredImage);
        } catch (error) {
            console.error("Error generating photo:", error);
            setError("An error occurred while generating the photo");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 min-h-screen">
            <Head>
                <title>Use AI for Renovation Projects</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center text-center">
                <motion.h1
                    className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Simulate Your Renovation Projects
                </motion.h1>

                {/* Prompt Input Field */}
                <motion.div
                    className="w-full max-w-xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your renovation idea in a few sentences...                                 
                        
                        (e.g. Backyard with metal fence, Artificial Grass on ground, path made of polished concrete)"
                        className="w-full border rounded-md p-4 resize-none placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        maxLength={300}
                    />
                </motion.div>

                <ResizablePanel>
                    <AnimatePresence mode="wait">
                        <motion.div
                            className="flex flex-col items-center w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Toggle
                                className={`${restoredLoaded ? "visible" : "invisible"
                                    } mb-6`}
                                sideBySide={sideBySide}
                                setSideBySide={(newVal) => setSideBySide(newVal)}
                            />
                            {restoredLoaded && sideBySide && (
                                <CompareSlider
                                    original={originalPhoto!}
                                    restored={restoredImage!}
                                />
                            )}
                            {!originalPhoto && <UploadDropZone />}
                            {originalPhoto && !restoredImage && (
                                <>
                                    <Image
                                        alt="Original photo"
                                        src={originalPhoto}
                                        className="rounded-2xl"
                                        width={475}
                                        height={475}
                                    />
                                    {/* Generate Photo Button */}
                                    <button
                                        onClick={() => generatePhoto(originalPhoto, prompt)}
                                        disabled={!prompt.trim() || loading}
                                        className="mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 disabled:bg-gray-400"
                                    >
                                        Generate Photo
                                    </button>
                                </>
                            )}
                            {loading && (
                                <div className="flex justify-center items-center mt-8">
                                    <LoadingDots color="black" style="large" />
                                </div>
                            )}
                            {restoredImage && originalPhoto && !sideBySide && (
                                <div className="flex flex-col lg:flex-row items-center lg:space-x-8 mt-8">
                                    <div className="mb-8 lg:mb-0">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Original Photo
                                        </h2>
                                        <Image
                                            alt="Original photo"
                                            src={originalPhoto}
                                            className="rounded-2xl"
                                            width={475}
                                            height={475}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">
                                            Renovated Photo
                                        </h2>
                                        <a href={restoredImage} target="_blank" rel="noreferrer">
                                            <Image
                                                alt="Renovated photo"
                                                src={restoredImage}
                                                className="rounded-2xl cursor-zoom-in"
                                                width={475}
                                                height={475}
                                                onLoadingComplete={() => setRestoredLoaded(true)}
                                            />
                                        </a>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                                    role="alert"
                                >
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}
                            <div className="flex space-x-4 justify-center mt-8">
                                {originalPhoto && !loading && (
                                    <button
                                        onClick={() => {
                                            setOriginalPhoto(null);
                                            setRestoredImage(null);
                                            setRestoredLoaded(false);
                                            setError(null);
                                            setPrompt("");
                                        }}
                                        className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:bg-secondary/80 transition"
                                    >
                                        Upload New Photo
                                    </button>
                                )}
                                {restoredLoaded && (
                                    <button
                                        onClick={() => {
                                            downloadPhoto(
                                                restoredImage!,
                                                appendNewToName(photoName!)
                                            );
                                        }}
                                        className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/80 transition"
                                    >
                                        Download Renovated Photo
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </ResizablePanel>
            </main>
        </div>
    );
};

export default Home;
