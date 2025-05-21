import Carousel from '@/components/carousel/carousel'
import React from 'react'
import Image from 'next/image'
import Banner from '@/assets/images/dubaibanner.jpg'
import CardsPage from '../cards/cardspage'
import Topbar from '@/components/topbar/topbar'
import Catergorie from '@/components/catergories/catergorie'

export default function home() {
  return (
    <div>
        <div><Topbar/></div>
        <div className='relative'>
          <Image src={Banner} alt='banner' className='w-full h-screen object-cover' />
          <h1 className='absolute top-1/2 left-[10%] text-white text-[35px] font-bold'>Saudha Project</h1>
        </div>
        <Catergorie/>
        <div><Carousel/></div>
        <div><CardsPage/></div>
    </div>
  )
}
