// import { inngest } from "@/inngest/client";
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function POST(req:any) {
//     const {userInput}=await req.json();
    
//     const resultIds = await inngest.send({
//         name: 'AiCareerAgent',
//         data: {
//             userInput: userInput
//         }
//     })
//     const runId=resultIds?.ids[0];

//     let runStatus;
//     while(true){
//         runStatus=await getRuns(runId)
//         if(runStatus?.data[0]?.status==='Completed')
//             break;
//         await new Promise(resolve=>setTimeout(resolve,500))
//     }
//     return NextResponse.json(runStatus)
// }   

// async function getRuns(runId:string) {
//     const result=await axios.get('${process.env.INNGEST_SERVER_HOST}'+'v1/events/'+runId+'/runs',{
//         headers: {
//             Authorization:'Bearer ${process.env.INNGEST_SIGNING_KEY}'
//         }
//     })

//     return result.data
// }




//New Code

import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userInput } = await req.json();

        const resultIds = await inngest.send({
            name: 'AiCareerAgent',
            data: {
                userInput: userInput
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
