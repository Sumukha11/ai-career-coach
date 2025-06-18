import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BrainCircuitIcon, BriefcaseBusinessIcon, Calendar, HistoryIcon, Home, Inbox, ReceiptIcon, Search, Settings, User2Icon } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const items = [
    {
        title: "Workspace",
        url: "/dashboard",
        icon: BriefcaseBusinessIcon,
    },
    {
        title: "Ai-Tools",
        url: "/ai-tools",
        icon: BrainCircuitIcon,
    },
    {
        title: "My History",
        url: "/my-history",
        icon: HistoryIcon,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: ReceiptIcon,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User2Icon,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Link href="/dashboard">
                        <Image src={'/logo.png'} alt='logo' width={100} height={70}
                            className='w-full' />
                    </Link>
                    <h2 className='text-sm text-gray-400 text-center mt-3'>Build Awesome Skills</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-2'>
                            {items.map((item, index) => (
                                // <SidebarMenuItem key={item.title} className='p-2'>
                                //     <SidebarMenuButton asChild className=''>
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path.includes(item.url) && 'bg-gray-200ß'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                                //     </SidebarMenuButton>
                                // </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
        </Sidebar>
    )
}