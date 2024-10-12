"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const slides = [
    {
        id: 1,
        title: "Handmade",
        description: "Starlight Collections",
        img: "https://images.unsplash.com/photo-1689173337256-693c073c856d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZG1hZGUlMjBwcm9kdWN0c3xlbnwwfHwwfHx8Mg%3D%3D",
        url: '/list?cat=category1',
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50"
    },
    {
        id: 2,
        title: "Fabric Cloths",
        description: "New Addition",
        img: "https://images.unsplash.com/photo-1527529422472-65e6c7fd9f6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFuZG1hZGUlMjBmYWJyaWMlMjBjbG90aHN8ZW58MHx8MHx8fDA%3D",
        url: '/list?cat=fabric-cloths',
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50"
    },
    {
        id: 3,
        title: "Palm Products",
        description: "Top Sales Edition",
        img: "https://images.unsplash.com/photo-1498511133332-ad66b117f533?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBhbG18ZW58MHx8MHx8fDI%3D",
        url: '/list?cat=palm-products',
        bg: "bg-gradient-to-r from-red-50 to-pink-50"
    },
    {
        id: 4,
        title: "Dry Foods",
        description: "Long Term Foods",
        img: "https://images.unsplash.com/photo-1601751911508-fd69ffc08fa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFuZG1hZGUlMjBkcnklMjBmb29kfGVufDB8fDB8fHww",
        url: '/list?cat=food',
        bg: "bg-gradient-to-r from-green-50 to-blue-50"
    },
    {
        id: 5,
        title: "Featured Edition",
        description: "Top Sales Edition",
        img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
        url: '/list?cat=featured',
        bg: "bg-gradient-to-r from-orange-50 to-green-50"
    }
];

const Slider = () => {
    const [current, setCurrent] = useState(1); // Start from the first slide index
    const [isTransitioning, setIsTransitioning] = useState(true); // Handle smooth transitions

    const totalSlides = slides.length;

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrent(prev => prev + 1);
        setIsTransitioning(true);
    };

    const handleTransitionEnd = () => {
        if (current === totalSlides + 1) {
            setIsTransitioning(false);
            setCurrent(1); // Jump back to the first slide without transition
        } else if (current === 0) {
            setIsTransitioning(false);
            setCurrent(totalSlides); // Jump to the last slide without transition
        }
    };

    return (
        <div className='h-[calc(100vh-80px)] overflow-hidden relative'>
            <div className={`w-max h-full flex ${isTransitioning ? 'transition-all ease-in-out duration-1000' : ''}`}
                style={{ transform: `translateX(-${current * 100}vw)` }}
                onTransitionEnd={handleTransitionEnd}>

                {/* Clone last slide before the first one */}
                <div className={`${slides[totalSlides - 1].bg} w-screen h-full flex flex-col xl:flex-row 2xl:flex-row gap-16`}>
                    <div className='h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center'>
                        <h2 className='text-lg lg:text-2xl 2xl:text-3xl'>{slides[totalSlides - 1].description}</h2>
                        <h1 className='text-xl lg:text-3xl 2xl:text-4xl font-semibold'>{slides[totalSlides - 1].title}</h1>
                        <Link href={slides[totalSlides - 1].url}>
                            <button className='rounded-md bg-black text-white py-3 px-4'>Shop Now</button>
                        </Link>
                    </div>
                    <div className='relative xl:h-full h-1/2 xl:w-1/2'>
                        <Image src={slides[totalSlides - 1].img} alt={slides[totalSlides - 1].title} fill sizes='100%' className='object-cover' />
                    </div>
                </div>

                {/* Main slides */}
                {slides.map((slide) => (
                    <div key={slide.id} className={`${slide.bg} w-screen h-full flex flex-col xl:flex-row 2xl:flex-row gap-16`}>
                        <div className='h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center'>
                            <h2 className='text-xl lg:text-3xl 2xl:text-5xl'>{slide.description}</h2>
                            <h1 className='text-5xl lg:text-6xl 2xl:text-8xl font-semibold'>{slide.title}</h1>
                            <Link href={slide.url}>
                                <button className='rounded-md bg-black text-white py-3 px-4'>Shop Now</button>
                            </Link>
                        </div>
                        <div className='relative xl:h-full h-1/2 xl:w-1/2'>
                            <Image src={slide.img} alt={slide.title} fill sizes='100%' className='object-cover' />
                        </div>
                    </div>
                ))}

                {/* Clone first slide after the last one */}
                <div className={`${slides[0].bg} w-screen h-full flex flex-col xl:flex-row 2xl:flex-row gap-16`}>
                    <div className='h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center'>
                        <h2 className='text-xl lg:text-3xl 2xl:text-5xl'>{slides[0].description}</h2>
                        <h1 className='text-5xl lg:text-6xl 2xl:text-8xl font-semibold'>{slides[0].title}</h1>
                        <Link href={slides[0].url}>
                            <button className='rounded-md bg-black text-white py-3 px-4'>Shop Now</button>
                        </Link>
                    </div>
                    <div className='relative xl:h-full h-1/2 xl:w-1/2'>
                        <Image src={slides[0].img} alt={slides[0].title} fill sizes='100%' className='object-cover' />
                    </div>
                </div>


            </div>
            <div className='absolute m-auto left-1/2 bottom-8 flex gap-4'>
                {slides.map((_, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center
                        ${current === index + 1 ? "scale-150" : ""}`} onClick={() => setCurrent(index + 1)}>
                        {current === index + 1 && (
                            <div className='w-[6px] h-[6px] bg-gray-600 rounded-full'></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider;
