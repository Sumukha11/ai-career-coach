"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Report from '../_components/Report';

function AiResumeAnalyzer() {
  const { recordId } = useParams();
  const [pdfUrl,setPdfUrl]=useState();
  const [aiReport,setAiReport]=useState();
  type ReportProps = {
    aiReport: any; // Replace `any` with actual type if you know it
  };

  useEffect(() => {
    recordId && GetResumeAnalyzerRecord();
  }, [recordId]);
  console.log('Params:', useParams());

  const GetResumeAnalyzerRecord = async () => {
    try {
      const result = await axios.get('/api/history?recordId=' + recordId);
      console.log(result.data);
      setPdfUrl(result.data?.metaData);
      setAiReport(result.data?.content);
    } catch (error) {
      console.error('Error fetching record:', error);
    }
  }

  return (
    <div className='grid lg:grid-cols-5 grid-cols-1'>
      <div className='col-span-2'>
        <Report aiReport={aiReport}/>
      </div>
      <div className="col-span-3 p-5">
  <h2 className="font-bold text-2xl mb-5 text-gray-800">Resume Preview</h2>
  <div className="relative w-full rounded-lg shadow-lg overflow-hidden border border-gray-200 bg-white">
    <iframe
      src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
      allow="fullscreen"
      width="100%"
      className="w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-[90vh]"
      style={{ border: 'none' }}
    />
  </div>
</div>

    </div>
  )
}

export default AiResumeAnalyzer
