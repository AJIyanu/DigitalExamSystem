import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReactNode, header } from 'react';
import { Toaster } from '@/components/ui/toaster';
import UserInfo from '@/pages/api/auth/UserInfo';

type Props = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-20 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-18">
                    <div className="flex items-center gap-2 px-4">
                        {/* <SidebarTrigger className="-ml-1" /> */}
                        {/* <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        /> */}
                    </div>
                    <UserInfo />
                    <div className="ml-auto me-5">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="User avatar"
                            />
                            <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <Breadcrumb className="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}
