"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {cn} from "@/lib/utils";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('light');
        }
    };

    return (
        <Button className={cn('rounded-full',theme === 'dark' ? "hover:bg-gray-600/25" : 'hover:bg-white/10')} variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
                <Moon className="w-5 h-5 transition-all" />
            ) : (
                <Sun className="w-5 h-5 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}