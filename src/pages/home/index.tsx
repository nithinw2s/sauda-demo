import Carousel from '@/components/carousel/carousel'
import React from 'react'
import CardsPage from '../cards/cardspage'
import Topbar from '@/components/topbar/topbar'

export default function home() {
  return (
    <div>
        <div><Topbar/></div>
        <div><Carousel/></div>
        <div><CardsPage/></div>
    </div>
  )
}
