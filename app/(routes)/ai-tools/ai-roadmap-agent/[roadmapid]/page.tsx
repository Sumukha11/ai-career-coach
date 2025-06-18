"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import RoadmapCanvas from '../_component/RoadmapCanvas';
import RoadmapGeneratorDialog from '@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog';

function RoadmapGeneratorAgent() {
  const {roadmapid}=useParams();
  const [roadmapDetail,setRoadmapDetail]=useState<any>();
  const [openRoadmapDialog,setOpenRoadmapDialog]=useState(false);
  useEffect(()=>{
    roadmapid&&GetRoadmapDetails();
  },[roadmapid]);
  
  const GetRoadmapDetails=async()=>{
    const result = await axios.get('/api/history?recordId=' + roadmapid);
    console.log(result.data);
    setRoadmapDetail(result.data);
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
      <div className='border rounded-xl p-5'>
        <h2 className='font-bold text-2xl'>{roadmapDetail?.content?.roadmapTitle}</h2>
        <p className='mt-3 text-gray-500'><strong>Description:</strong><br></br> {roadmapDetail?.content?.description}</p>
        <h2 className='mt-5 text-blue-600'>Duration: {roadmapDetail?.content?.duration}</h2>
        <Button onClick={()=> setOpenRoadmapDialog(true)} className='flex justify-between items-center gap-6 mt-6 bottom-5 w-full'>Create Another Roadmap</Button>
      </div>
      <div className='md:col-span-2 w-full h-[80vh]'>
        <RoadmapCanvas initialNodes={roadmapDetail?.content?.initialNodes} initialEdges={roadmapDetail?.content?.initialEdges}/>
      </div>
      <RoadmapGeneratorDialog
        openRoadmapDialog={openRoadmapDialog} //1st openRoadmapDialog refers to the params created in RoadmapGeneratorDialog.tsx
        setOpenRoadmapDialog={() => setOpenRoadmapDialog(false)}/>
    </div>
  )
}

export default RoadmapGeneratorAgent
