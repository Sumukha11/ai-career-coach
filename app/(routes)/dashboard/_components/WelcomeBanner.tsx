import React from 'react'
import {Button} from "@/components/ui/button"
function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-tr from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-lg'>
        <h2 className='font-bold text-2xl text-white'>
            AI Career Coach
        </h2>
        <p className='text-white'>
            Smarter career decisions start here - Get tailored Advice from us.
        </p>
        <Button variant={'outline'} className='mt-3'>
            Let's get Started
        </Button>
    </div>
  )
}

export default WelcomeBanner
