"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";

const useRoutes = () => {
    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            label: 'Knoledge Base',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations',
            color: 'text-primary'
        },
        // {
        //     label: 'Text',
        //     href: '/users',
        //     icon: HiUsers,
        //     active: pathname === '/users',
        //     color: 'text-green-300'
        // },
        // {
        //     label: 'Youtube',
        //     href: '/settings',
        //     icon: Cog,
        //     active: pathname === '/settings',
        //     color: 'text-gray-300'
        // },
        // {
        //     label: 'Nuclear',
        //     href: '/nuclear',
        //     icon: Radiation,
        //     active: pathname === '/nuclear',
        //     color: 'text-yellow-500'
        // }
    ], [pathname])

    return routes
}

export default useRoutes;
