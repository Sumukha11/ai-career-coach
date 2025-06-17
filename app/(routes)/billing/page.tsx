import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
  return (
    <div>
        <h2 className='font-bold text-3xl text-center'>Choose Your Plan</h2>
        <p className='text-lg text-center mb-10'>Select a subscription bundle to get all AI tools Access.</p>
        <PricingTable/>
    </div>
  ) 
}

export default Billing
