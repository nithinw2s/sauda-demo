import React from 'react'
import BannerSearch from '../search/search'
import { SearchContent } from '@/utils/const'
import Image from 'next/image'
import logo from '@/assets/images/w2ssolutions.svg'

export default function Topbar() {
  return (
    <div className='topbar'>
      <Image src={logo} alt='logo' />
        <div className='searchbar'><BannerSearch SearchContent={SearchContent}/></div>
    </div>
  )
}
