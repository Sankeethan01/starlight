import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
import logo from '@/../../public/logo.png';
import dynamic from 'next/dynamic'

const NavIcons = dynamic(()=> import("@/components/NavIcons"),{ssr:false})

const Navbar = () => {
    return (
        <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative shadow-2xl'>

            {/*Mobile screen*/}
            <div className='h-full flex items-center justify-between w-full md:hidden'>
                <Link href='/'>
                    <div className='text-2xl tracking-wide'>StarLight</div>
                </Link>
                <SearchBar />
                <Menu />
            </div>

            {/* Big Screens */}
            <div className='hidden md:flex items-center justify-between gap-8 h-full'>
                {/* leftside */}
                <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
                    <Link href='/' className='flex items-center'>
                        <div className='text-3xl tracking-wide'>StarLight</div>
                    </Link>
                    <div className='hidden xl:flex items-center justify-around gap-4'>
                        <Link href='/'>Home</Link>
                        <Link href='/list?cat=all-products'>Categories</Link>
                        <Link href='/'>About</Link>
                        <Link href='/'>Contact</Link>
                    </div>
                </div>
                {/* rightside */}
                <div className='w-2/3 xl:w-1/2 flex items-center justify-between gap-8'>
                    <SearchBar />
                    <NavIcons />
                </div>
            </div>

        </div>
    )
}

export default Navbar
