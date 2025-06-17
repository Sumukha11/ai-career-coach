import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:NextRequest) {
    const FormData=await req.formData();
    const resumeFile:any=FormData.get('resumeFile');
    const recordId=FormData.get('recordId');
    const user=await currentUser();
    const arrayBuffer=await resumeFile.arrayBuffer();
    const base64=Buffer.from(arrayBuffer).toString('base64');
    const loader=new WebPDFLoader(resumeFile);
    const docs=await loader.load();
    console.log(docs[0])//Raw Pdf text


try {
    const resultIds = await inngest.send({
            name: 'AiResumeAgent',
            data: {
                recordId: recordId,
                resumeFile:resumeFile,
                base64ResumeFile:base64,
                pdfText:docs[0]?.pageContent,
                aiAgentType:'/ai-tools/ai-resume-analyzer',
                userEmail:user?.primaryEmailAddress?.emailAddress,
            }
        });

        const runId = resultIds?.ids?.[0];
        if (!runId) {
            return NextResponse.json({ error: 'Run ID not received' }, { status: 500 });
        }

        let runStatus;
        let attempts = 0;
        const maxAttempts = 100; // 30 attempts - 15 seconds timeout

        while (attempts < maxAttempts) {
            runStatus = await getRuns(runId);

            if (runStatus?.data?.[0]?.status === 'Completed') {
                const output = runStatus.data?.[0].output?.output[0];
                return NextResponse.json({ status: 'Completed', output});
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            attempts++;
        }

        return NextResponse.json({ error: 'Timed out waiting for result' }, { status: 504 });

    } catch (error: any) {
        console.error('Agent error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

async function getRuns(runId: string) {
    const result = await axios.get(
        `${process.env.INNGEST_SERVER_HOST}v1/events/${runId}/runs`,
        {
            headers: {
                Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
            }
        }
    );

    return result.data;
}