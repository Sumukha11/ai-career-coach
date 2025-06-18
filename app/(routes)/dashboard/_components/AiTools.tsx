import React from 'react'
import AiToolCard from './AiToolCard';

export const aiToolsList = [
    {
        name:'AI Career Q&A Chat',
        description:'Chat with the AI Agent',
        icon:'/chatbot.png',
        button:'Lets Chat',
        path:'/ai-tools/ai-chat'
    },
    {
        name:'AI Resume Analyzer',
        description:'Get your resume Analyzed by AI',
        icon:'/resume.png',
        button:'Analyze Now',
        path:'/ai-tools/ai-resume-analyzer'
    },
    {
        name:'Career Roadmap Generator',
        description:'Build your roadmap',
        icon:'/roadmap.png',
        button:'Generate Now',
        path:'/ai-tools/ai-roadmap-agent'
    },
    {
        name:'Cover Letter Generator',
        description:'Write a Cover Letter',
        icon:'/cover.png',
        button:'Create Now',
        path:'/cover-letter-generator'
    }
];
function AiTools() {
  return (
    <div className='mt-7 p-5 bg-white border rounded-lg'>
      <h2 className='font-bold text-lg'>Available AI Tools</h2>
       <p>Start building and shape your Career by the help of Ai</p> 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
            {aiToolsList.map((tool:any,index)=>(
                <AiToolCard tool={tool} key={tool.path}/>
            ))}
        </div>
    </div>
  )
}
 
export default AiTools
