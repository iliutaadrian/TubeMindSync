"use client"

import React from "react";
import {Coffee, Key, MessageCircle, Radiation, User} from "lucide-react";

export const Rules = () => {
    const rules = [
        {
            icon: <Coffee size={24} />, // Lucide icon for a coffee cup
            title: 'Deep Knowledge Dive',
            description: 'Unlock profound insights like never before. Lux GPT delves deep into content, ensuring you grasp every detail and nuance.',
        },
        {
            icon: <User size={24} />, // Lucide icon for a user
            title: 'Research Revolutionized',
            description: 'Say goodbye to data overload. Lux GPT simplifies complex research materials into easily digestible insights, guiding you through academia and beyond.',
        },
        {
            icon: <Key size={24} />, // Lucide icon for a key
            title: 'Boosted Productivity',
            description: 'Let Lux GPT handle data extraction, summarization, and analysis, liberating your focus for academics, research, or staying up-to-date with the latest trends.',
        },
        {
            icon: <MessageCircle size={24} />, // Lucide icon for a message circle
            title: 'Personalized AI Personas',
            description: 'We empower users to create highly personalized AI personas based on their unique preferences and online materials, including PDFs, websites, and podcasts. Your AI persona is a reflection of you.',
        },
    ];

    return (
        <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-5">
            {rules.map((rule, index) => (
                <li key={index} className="p-5 rounded-lg shadow-neon bg-background/50 hover:bg-background group">
                    <div className="flex items-center mb-2">
                        <div className="mr-2 text-primary group-item">{rule.icon}</div>
                        <h3 className="text-lg font-semibold group-hover:text-primary">{rule.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-left">{rule.description}</p>
                </li>
            ))}
        </ul>
    )
}
