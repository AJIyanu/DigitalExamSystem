import * as React from 'react';
import {
    GraduationCap,
    Users,
    SquarePen,
    Settings2,
    SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
    user: {
        name: 'AJ Iyanu',
        email: 'aj@iyanu.com',
        avatar: 'https://github.com/shadcn.png',
    },

    navMain: [
        {
            title: 'Overview',
            url: '/dashboard',
            icon: SquareTerminal,
        },
        {
            title: 'Manage Students',
            url: '#',
            icon: GraduationCap,
            isActive: true,
            items: [
                {
                    title: 'Add Student',
                    url: '/dashboard/addstudent',
                },
                {
                    title: 'View Students',
                    url: '/dashboard/viewstudents',
                },
            ],
        },
        {
            title: 'Manage Exams',
            url: '#',
            icon: SquarePen,
            items: [
                {
                    title: 'Schedule Exam',
                    url: '#',
                },
                {
                    title: 'Score Sheet',
                    url: '#',
                },
                {
                    title: 'Exam Results',
                    url: '#',
                },
                {
                    title: 'Add Exam Questions',
                    url: '#',
                },
                {
                    title: 'Time Table',
                    url: '#',
                },
            ],
        },
        {
            title: 'Manage Staffs',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Add Teacher',
                    url: '#',
                },
                {
                    title: 'View Teachers',
                    url: '#',
                },
                {
                    title: 'Add Class',
                    url: '#',
                },
                {
                    title: 'View Classes',
                    url: '#',
                },
                {
                    title: 'Add Subject',
                    url: '#',
                },
                {
                    title: 'View Subjects',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#',
                },
                {
                    title: 'Security',
                    url: '#',
                },
                {
                    title: 'Profile',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // make this function async
    // fecth usertype from nextjs api
    // update menu data based on usertype

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                <h3 className="scroll-m-20 text-2xl font-bold text-red-700 tracking-tight">
                    Digital Exam System
                </h3>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
