import ApprovalCard from "@/components/dashboard/approval-card";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import userIsApproved from "@/lib/user-is-approved";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
    const session = await getServerSession();
    const email = session?.user?.email;
    const approved = await userIsApproved(email);
    return (
        <DashboardLayout>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-1 items-center gap-8'>
                    <Home size={48} />
                    <h1>Home</h1>
                </div>
                {!approved ? <ApprovalCard email={email} /> :
                    <div className='grid gap-8 mx-auto w-full max-w-xl'>
                        <div className='text-center'>
                            <Card>
                                <CardHeader>
                                    <CardTitle className='text-2xl'>
                                        Tutorials you might find useful
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                        <div className='flex gap-8 flex-col text-center'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        What To Do When You&#39;ve Received An Invite
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <iframe
                                        className='h-full w-full aspect-video'
                                        src="https://www.youtube.com/embed/erYEcA-F5zQ"
                                        title="What To Do When You&#39;ve Received An Invite on Tunnl.app"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen></iframe>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        How to Enroll Android &amp; iOS Identities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <iframe
                                        className='h-full w-full aspect-video'
                                        src="https://www.youtube.com/embed/HrnGIJx_auA"
                                        title="How to Enroll Android &amp; iOS Identities in Tunnl.app"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen></iframe>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        How to Enroll WIndows &amp; MacOS Identities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <iframe
                                        className='h-full w-full aspect-video'
                                        src="https://www.youtube.com/embed/8vt5JISH28Y"
                                        title="How to Enroll WIndows &amp; MacOS Identities in Tunnl.app"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen></iframe>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        How to Create a Service in The Tunnl.app Dashboard
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <iframe
                                        className='h-full w-full aspect-video'
                                        src="https://www.youtube.com/embed/PZj9LY_5DyI"
                                        title="How to Create a Service in The Tunnl.app Dashboard"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen></iframe>
                                </CardContent>
                            </Card>
                        </div>
                    </div>}
            </div>
        </DashboardLayout >
    );
}

export default Dashboard;
