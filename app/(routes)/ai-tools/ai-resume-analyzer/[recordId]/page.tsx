"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Report from '../_components/Report';
import { Skeleton } from '@/components/ui/skeleton';

function AiResumeAnalyzer() {
  const { recordId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const [aiReport, setAiReport] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    recordId && GetResumeAnalyzerRecord();
  }, [recordId]);

  const GetResumeAnalyzerRecord = async () => {
    try {
      setLoading(true);
      const result = await axios.get('/api/history?recordId=' + recordId);
      console.log(result.data);
      setPdfUrl(result.data?.metaData);
      setAiReport(result.data?.content);
    } catch (error) {
      console.error('Error fetching record:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='grid lg:grid-cols-5 grid-cols-1'>
      <div className='col-span-2'>
        {loading ? (
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-[300px] w-full rounded" />
          </div>
        ) : (
          <Report aiReport={aiReport} />
        )}
      </div>

      <div className="col-span-3 p-5">
        <h2 className="font-bold text-2xl mb-5 text-gray-800">Resume Preview</h2>
        <div className="relative w-full rounded-lg shadow-lg overflow-hidden border border-gray-200 bg-white">
          {loading ? (
            <Skeleton className="w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-[90vh]" />
          ) : (
            pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                allow="fullscreen"
                width="100%"
                className="w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-[90vh]"
                style={{ border: 'none' }}
              />
            ) : (
              <p className="text-center text-gray-500 py-10">No PDF available</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AiResumeAnalyzer;
