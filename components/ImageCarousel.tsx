'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CallButton from './CallButton';

const carouselImages = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg"
]

const ImageCarousel = () => {

    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <section className="relative h-[600px]">
                {carouselImages.map((image, index) => (
                    <Image
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Carousel Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className={`transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"}`}
                    />
                ))}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Welcome to RK Technical Institute</h1>
                        <p className="text-4xl mb-8">सफलता की 100% गारंटी</p>
                        <CallButton />
                    </div>
                </div>
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 rounded-r-lg text-white p-2"
                    onClick={() =>
                        setCurrentImage((prevImage) => (prevImage - 1 + carouselImages.length) % carouselImages.length)
                    }
                >
                    &#60;
                </button>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 rounded-l-lg text-white p-2"
                    onClick={() => setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length)}
                >
                    &#62;
                </button>
            </section>
        </>
    );
};

export default ImageCarousel;
