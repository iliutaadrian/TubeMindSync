// import {Sidebar} from "@/components/sidebar";
// import {Navbar} from "@/components/navbar";
// import {UserList} from "@/components/user/user-list";
// import getUsers from "@/actions/getUsers";
// import getConversations from "@/actions/getConversations";
//
export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {

    return (
        <div className={"flex flex-col min-h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 to-background"}>
            {children}
        </div>
    )
}
