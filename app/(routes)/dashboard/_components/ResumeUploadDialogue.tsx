import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { File, Loader2, Loader2Icon, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function ResumeUploadDialogue({openResumeUpload, setOpenResumeDialog}:any) {
  
    const [file,setFile]=useState<any>();
    const [loading, setLoading]=useState(false);
    const router=useRouter();
    
    const onFileChange=(event:any)=>{
        const file=event.target.files?.[0];
        if(file){
            console.log(file.name);
            setFile(file);
        }
    }
    const onUploadAndAnalyze=async()=>{
        setLoading(true);
        const recordId=uuidv4();
        const formData=new FormData();
        formData.append('recordId',recordId);
        formData.append('resumeFile', file);
        //formData.append('aiAgentType', '/ai-tools/ai-resume-analyzer');
        //Send FormData to backend Server
        const result=await axios.post('/api/ai-resume-agent',formData)
        console.log(result.data)
        setLoading(false);
        router.push('/ai-tools/ai-resume-analyzer/'+recordId);
        setOpenResumeDialog(false);
    }
    return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Upload your resume(.pdf only)</DialogTitle>
            <DialogDescription>
                <div>
                    <label htmlFor='resumeUpload' className='flex items-center flex-col 
                    justify-center cursor-pointer p-7 border-dashed rounded-xl hover:bg-slate-100'>
                        <File className='h-10 w-10'/>
                        {file?
                        <h2 className='mt-3 text-blue-600'>{file?.name}</h2>:
                        <h2 className='mt-3'>Click here to upload the pdf file</h2>}
                    </label>
                    <input type='file' id='resumeUpload'accept="application/pdf" 
                    className='hidden' onChange={onFileChange}/>
                </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'outline'} onClick={() => setOpenResumeDialog(false)}>Cancel</Button>
                <Button disabled={!file} onClick={onUploadAndAnalyze}>
                    {loading? <Loader2Icon className='animate-spin'/> :<Sparkles/>}Upload & Analyze</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ResumeUploadDialogue
