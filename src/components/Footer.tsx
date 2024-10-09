import Link from 'next/link'
import React from 'react'
import fbImg from '@/../../public/facebook.png';
import instaImg from '@/../../public/instagram.png'
import ytbeImg from '@/../../public/youtube.png'
import Image from 'next/image';

const Footer = () => {

  const date = new Date();

  return (
    <div className='py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24'>
      {/* Top Part */}
      <div className='flex flex-col md:flex-row justify-between gap-24'>
        {/* Left */}
        <div className='w-full md:w-1/4 lg:w-1/4 flex flex-col gap-8'>
        <Link href='/'>
          <div className='text-2xl tracking-wide'>StarLight</div>
        </Link>
        <p>Village, City, Sri Lanka.</p>
        <span className='font-semibold'>starlight.onlineshoping@gmail.com</span>
        <span className='font-semibold'>Phone Number here</span>
        <div className='flex gap-6'>
            <Image src={fbImg} alt='fb' width={16} height={16} />
            <Image src={instaImg} alt='insta' width={16} height={16} />
            <Image src={ytbeImg} alt='youtube' width={16} height={16} />
        </div>
        </div>
        {/* Middle */}
        <div className='hidden lg:flex justify-between w-1/2'>
           <div className='flex flex-col justify-between'>
            <h1 className='font-medium text-lg'>
              COMPANY
            </h1>
            <div className='flex flex-col gap-6'>
              <Link href='/'>About Us</Link>
              <Link href='/'>Careers</Link>
              <Link href='/'>Blog</Link>
              <Link href='/'>Contact Us</Link>
            </div>
           </div>
           <div className='flex flex-col justify-between'>
            <h1 className='font-medium text-lg'>
              SHOP
            </h1>
            <div className='flex flex-col gap-6'>
              <Link href='/'>About Us</Link>
              <Link href='/'>Careers</Link>
              <Link href='/'>Blog</Link>
              <Link href='/'>Contact Us</Link>
            </div>
           </div>
           <div className='flex flex-col justify-between'>
            <h1 className='font-medium text-lg'>
              HELP
            </h1>
            <div className='flex flex-col gap-6'>
              <Link href='/'>About Us</Link>
              <Link href='/'>Careers</Link>
              <Link href='/'>Blog</Link>
              <Link href='/'>Contact Us</Link>
            </div>
           </div>
        </div>
        {/* Right */}
        <div className='w-full md:w-1/4 lg:w-1/4 flex flex-col gap-8'>
          <h1 className='font-medium text-lg'>Subscribe</h1>
          <p>Join With Us to help people</p>
          <div className='flex'>
            <input type="email"
            placeholder='Email Address'
            className='p-4 w-3/4' />
            <button className='w-1/4 bg-redColor text-white'>Join</button>
          </div>
        </div>
      </div>
      {/* Bottom Part */}
      <div className='flex flex-col md:flex-row items-center justify-between gap-8 mt-16'>
        <div className=''>&copy; {date.getFullYear()} StarLight Online Shopping Services</div>
        <div className='flex flex-col md:flex-row gap-8'>
          <div>
            <span className='text-gray-500 mr-4'>Region</span>
            <span className='font-medium'>Sri Lanka</span>
          </div>
          <div>
            <span className='text-gray-500 mr-4'>Currency</span>
            <span className='font-medium'>LKR</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
