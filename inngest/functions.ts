import { createAgent, gemini, openai } from '@inngest/agent-kit';
import { inngest } from "./client";
import ImageKit from "imagekit";
import { historyTable } from '@/configs/schema';
import { db } from '@/configs/db';

export const AiCareerChatAgent = createAgent({
    name:'AiCareerChatAgent',
    description: 'An AI agent that helps with Career related questions',
    system:`You are an expert career coach with deep knowledge of job markets across all industries and professions worldwide.
Your role is to provide practical, customized, and supportive guidance on topics like career planning, resume and cover letter writing, interview preparation, networking, job searching, skill development, and career transitions.
Your advice should be clear, encouraging, and actionable, tailored to the user's unique situation and background.
Avoid generic responses and do not provide legal, medical, or financial advice.
Stay positive and constructive in tone, helping users build confidence in their career journey.`,
    model:gemini({
        model:"gemini-2.0-flash-lite",
        apiKey: process.env.GEMINI_API_KEY
    })
})

export const AiCareerAgent=inngest.createFunction(
    {id:'AiCareerAgent'},
    {event: 'AiCareerAgent'},
    async({ event,step})=>{
        const{userInput}=await event?.data;
        const result=await AiCareerChatAgent.run(userInput);
        return result;
    }
)

export const AiResumeAnalyzerAgent = createAgent({
    name:'AiResumeAnalyzerAgent',
    description:'An Ai Agent that helps with Resume A',
    system:`You are an advanced AI Resume Analyzer Agent.

            Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.

            The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.



            📤 INPUT: I will provide a plain text resume.

            🎯 GOAL: Output a JSON report as per the schema below. The report should reflect:



            overall_score (0–100)



            overall_feedback (short message e.g., "Excellent", "Needs improvement")



            summary_comment (1–2 sentence evaluation summary)



            Section scores for:



            Contact Info



            Experience



            Education



            Skills



            Each section should include:



            score (as percentage)



            Optional comment about that section



            Tips for improvement (3–5 tips)



            What’s Good (1–3 strengths)



            Needs Improvement (1–3 weaknesses)



            🧠 Output JSON Schema:

            json

            Copy

            Edit

            {

            "overall_score": 85,

            "overall_feedback": "Excellent!",

            "summary_comment": "Your resume is strong, but there are areas to refine.",

            "sections": {

                "contact_info": {

                "score": 95,

                "comment": "Perfectly structured and complete."

                },

                "experience": {

                "score": 88,

                "comment": "Strong bullet points and impact."

                },

                "education": {

                "score": 70,

                "comment": "Consider adding relevant coursework."

                },

                "skills": {

                "score": 60,

                "comment": "Expand on specific skill proficiencies."

                }

            },

            "tips_for_improvement": [

                "Add more numbers and metrics to your experience section to show impact.",

                "Integrate more industry-specific keywords relevant to your target roles.",

                "Start bullet points with strong action verbs to make your achievements stand out."

            ],

            "whats_good": [

                "Clean and professional formatting.",

                "Clear and concise contact information.",

                "Relevant work experience."

            ],

            "needs_improvement": [

                "Skills section lacks detail.",

                "Some experience bullet points could be stronger.",

                "Missing a professional summary/objective."

            ]

            } Resume Plain Text Input:`,
    model:gemini({
        model:"gemini-2.0-flash-lite",
        apiKey: process.env.GEMINI_API_KEY
    })
})

var imagekit = new ImageKit({
    //@ts-ignore
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    //@ts-ignore
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    //@ts-ignore
    urlEndpoint : process.env.IMAGEKIT_ENDPOINT_URL
});
if (!process.env.IMAGEKIT_PUBLIC_KEY) {
  throw new Error("IMAGEKIT_PUBLIC_KEY is missing in environment variables");
}

export const AiResumeAgent=inngest.createFunction(
    {id:'AiResumeAgent'},
    {event:'AiResumeAgent'},
    async({event,step})=>{
        const{recordId,base64ResumeFile,pdfText, aiAgentType, userEmail}=await event.data;

        //Upload to the Cloud
        const uploadFileUrl=await step.run("uploadFile",async()=>{
            const imageKitFile=await imagekit.upload({
                file: base64ResumeFile,
                fileName:`${Date.now()}.pdf`,
                isPublished:true
            })
            return imageKitFile.url
        })

        const aiResumeReport=await AiResumeAnalyzerAgent.run(pdfText);
        //@ts-ignore
        const rawContent = aiResumeReport.output[0].content;
        const rawContentJson=rawContent.replace('```json','').replace('```','');
        const parseJson=JSON.parse(rawContentJson);

        const saveToDb=await step.run('saveToDb', async()=>{
            const result=await db.insert(historyTable).values({
                recordId:recordId,
                content:parseJson,
                aiAgentType:aiAgentType,
                createdAt:(new Date()).toString(),
                userEmail:userEmail,
                metaData: uploadFileUrl,
            });
            console.log(result);
            return parseJson;
        
        })
        
    }   
)

