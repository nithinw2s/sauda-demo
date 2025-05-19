import React from 'react'
import BannerSearch from '../search/search'
import { SearchContent } from '@/utils/const'

export default function Topbar() {
  return (
    <div className='topbar'>
        <div className='searchbar'><BannerSearch SearchContent={SearchContent}/></div>
    </div>
  )
}
