import { NextResponse } from "next/server";
import{db} from "../../../configs/db"
import{historyTable} from "../../../configs/schema"
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { url } from "inspector";
import { varchar } from "drizzle-orm/mysql-core";


export async function POST(req: any) {
    const{content, recordId, aiAgentType}=await req.json();
    const user=await currentUser();

    try{
        //Insert record
        const result = await db.insert(historyTable).values({
            recordId:recordId,
            content:content,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date().toISOString(),
            aiAgentType: aiAgentType??""
        });
        return NextResponse.json(result);
    }catch(e){
        return NextResponse.json(e)
    }
}

export async function PUT(req:any) {
    const   {content,recordId}=await req.json();
    try{
        //Insert record
        const result = await db.update(historyTable).set({
            content:content,
        }).where(eq(historyTable.recordId,recordId))
        
        return NextResponse.json(result);
    }catch(e){
        return NextResponse.json(e)
    }
}

export async function GET(req:any) {
    const {searchParams}=new URL(req.url);
    const recordId=searchParams.get('recordId');
    const user=await currentUser();

    try{
        if(recordId){
            const result=await db.select().from(historyTable)
                .where(eq(historyTable.recordId,recordId));
            return NextResponse.json(result[0]);   
            }
        else{
            const email = user?.primaryEmailAddress?.emailAddress;
            if (!email) {
            throw new Error("User does not have a primary email address.");
            }
            const result = await db
            .select()
            .from(historyTable)
            .where(eq(historyTable.userEmail, email))
            .orderBy(desc(historyTable.id));
                return NextResponse.json(result);
            }
        return NextResponse.json({});
        }catch(e){
            return NextResponse.json(e)
    }
}