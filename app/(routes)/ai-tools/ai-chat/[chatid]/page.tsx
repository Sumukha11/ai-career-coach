"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyState from '../_components/EmptyState'
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useParams, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

type messages={
    content:string,
    role:string,
    type:string
};

function AiChat() {
  
const[userInput,setUserInput]= useState<string>("");
const[loading, setLoading]=useState(false);
const[messageList,setMessageList]=useState<messages[]>([]);
const{chatid}=useParams();
const router=useRouter();

console.log(chatid);

useEffect(()=>{
    chatid&&GetMessageList();
},[chatid])
const GetMessageList=async()=>{
    const result = await axios.get('/api/history?recordId='+chatid);
    console.log(result.data);
    const content =result?.data?.content
    setMessageList((content)? content:[]);
}


const onSend=async()=>{
    setLoading(true);

    setMessageList(prev => [
  ...prev,
  {
    content: userInput,
    role: 'user',
    type: 'text',
  },
]);
setUserInput(" ");
    const result=await axios.post('/api/ai-career-chat-agent',{
        userInput:userInput
    });
    console.log(result.data);
    setMessageList(prev => [
  ...prev,{
    content: result.data.output.content,  // extract the string
    role: result.data.output.role,        // or hardcode 'assistant' if needed
    type: result.data.output.type ?? 'text',
  }
]);
    setLoading(false);
}

console.log(messageList);

        
useEffect(()=>{
    //Save message into DB
    messageList.length> 0 && updatedMessageList();
},[messageList]);


const updatedMessageList=async()=>{
    const result=await axios.put('/api/history',{
        content:messageList,
        recordId:chatid
    });
    console.log(result);
}

const onNewChat =async()=>{ //Function for the new chat button
    const id=uuidv4();
    //Create a new record to the History table 
    const result=await axios.post('/api/history',{
      recordId:id,
      content:[]
    });
    console.log(result);
    router.replace("/ai-tools/ai-chat/"+id);
  }

return (
    <div className='px-10 md:px-24 lg:px-36 xl:px-48 h-[75vh] overflow-auto'>
        <div className='flex items-center justify-between gap-8'>
            <div>  
                <h2 className='font-bold text-lg'>AI Career QA Chat</h2>
                <p>Smart career decisions start here, Chat with our AI for your career development.</p>
            </div>
            <Button onClick={onNewChat}>+ Next Chat</Button>
        </div>
        <div className='flex flex-col h-[75vh]'>
            {messageList?.length<=0&& <div > {/* if user message len is less than 0 then show the questions*/}
                {/*Empty state options*/}
                <EmptyState selectedQuestion={(question:string)=>setUserInput(question)}/> {/*Displays the generic typed out questions in the chat when there is no user message.*/}
            </div>}
            <div className='flex-1'>
                {/*Message list*/}
                {messageList.map((message,index)=>(
                    <div key={index}>
                        <div  className={`flex mb-2 ${message.role=="user"?'justify-end':'justify-start'}`}>
                            <div className={`p-3 rounded-lg gap-2 ${message.role=="user"?
                                    'bg-gray-200 text-black rounded-lg':
                                    "bg-gray-50 text-black"  
                            }`}>
                                <ReactMarkdown>
                                    {message.content}
                                </ReactMarkdown>
                                   
                            </div>
                        </div>
                    {loading&&messageList?.length-1==index && <div className='flex justify-start bg-gray-50 text-black p-3 rounded-lg gap-2 mb-2'>
                            <LoaderCircle className='animate-spin'/> Thinking...
                    </div>}
                </div>))}
            </div>
            <div className='flex justify-between items-center gap-6 absolute bottom-5 w-[50%]'>
                {/*Inputs field*/}
                <Input placeholder='Type here' value={userInput}
                onChange={(event)=>setUserInput(event.target.value)}
                />
                <Button onClick={onSend} disabled={loading}><Send/></Button>
            </div>
        </div>
    </div>
  )
}

export default AiChat
