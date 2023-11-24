"use client"

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Calendar, MoreHorizontal, User2} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {UserClerk} from "@/types";

interface ProfileDrawerProps {
    user: UserClerk,
    conversationId: number
}

export const ProfileDrawer = ({
                                  user,
                                  conversationId
}: ProfileDrawerProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteData = async (type:string) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/users/delete', {
                type,
                conversationId
            });

            toast({
                variant: 'destructive',
                description: response.data,
            });

            window.location.href = '/conversations/'
        } catch (error) {
            console.error('Error starting new conversation:', error);

            toast({
                variant: 'destructive',
                // @ts-ignore
                description: error.response.data,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger>
                <MoreHorizontal
                    className={'text-primary hover:text-primary-foreground text-right cursor-pointer'}/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetDescription className={'flex flex-col items-center align-middle gap-3 pt-10'}>
                        <div className={'w-20 h-20 relative pl-1'}>
                            <Avatar className={'w-20 h-20'}>
                                <AvatarFallback className={'border border-primary text-4xl'}>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span
                                className={'absolute top-0 right-0 bg-green-500 border-2 border-primary w-4 h-4 rounded-full shadow-xl shadow-black'}>
                                    </span>
                        </div>
                        <div className={'flex flex-col ml-2 text-center'}>
                            <p className={'text-2xl font-medium text-foreground'}>
                                {user?.username}
                            </p>
                            <span className={'text-md text-muted-foreground'}>Active</span>
                        </div>
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-5 mt-10">
                    <div className="flex items-start space-x-4 p-2 transition-all hover:bg-accent hover:text-accent-foreground border-b-2 border-muted-foreground">
                        <User2 className="mt-px h-5 w-5" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Username</p>
                            <p className="text-sm text-muted-foreground">
                                {user?.username}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4 p-2 transition-all hover:bg-accent hover:text-accent-foreground border-b-2 border-muted-foreground">
                        <Calendar className="mt-px h-5 w-5" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Joined</p>
                            <p className="text-sm text-muted-foreground">
                                {user?.createdAt && format(user?.createdAt, 'yyyy/MM/dd kk:mm')}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        * All the messages will be delete every day at 4:00AM
                    </p>
                    <Button disabled={isLoading} variant={'destructiveLight'} onClick={() => deleteData('delete-data')}>
                        Delete data
                    </Button>

                    <Button disabled={isLoading} variant={'destructive'} onClick={() => deleteData('delete-user-data')}>
                        Delete user & data
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}