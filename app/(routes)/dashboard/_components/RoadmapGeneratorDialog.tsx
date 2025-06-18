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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Loader2Icon, Sparkle } from 'lucide-react'
import { constants } from 'buffer'
import axios from 'axios'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

function RoadmapGeneratorDialog({openRoadmapDialog,setOpenRoadmapDialog}:any) {
  const [userInput,setUserInput]=useState<string>();
  const roadmapId=v4();
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const {has}=useAuth();

  const GenerateRoadmap=async()=>{
    
    setLoading(true);
    try{
      //@ts-ignore
      const hasSubscriptionEnabled = await has({plan:'pro'});

      if(!hasSubscriptionEnabled){
          const resultHistory=await axios.get('/api/history');
          const historyList=resultHistory.data;
          const isPresent=await historyList.find((item:any)=>item?.aiAgentType=='/api/ai-roadmap-agent');
          router.push('/billing');
          if(isPresent){
              return null;
          }
      }

      const result = await axios.post('/api/ai-roadmap-agent',{
        roadmapId:roadmapId,
        userInput:userInput,
      });
      console.log(result.data);
      router.push('/ai-tools/ai-roadmap-agent/'+roadmapId)
      setLoading(false);
    }catch(e){
      setLoading(false);
      console.log(e)
    }
  }
  
  return (
    <Dialog open={openRoadmapDialog} onOpenChange={setOpenRoadmapDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Enter Position/Skill to generate a Roadmap</DialogTitle>
            <DialogDescription asChild>
                <div className='mt-2'>
                    <Input placeholder='eg. Full Stack Developer'
                    onChange={(event)=>setUserInput(event?.target.value)}
                    />
                </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={()=> setOpenRoadmapDialog(false)} variant={'outline'}>Cancel</Button>
                <Button onClick={GenerateRoadmap}
                disabled={loading||!userInput}
                >{loading?<Loader2Icon className='animate-spin'/>:<Sparkle/>}Generate</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default RoadmapGeneratorDialog
