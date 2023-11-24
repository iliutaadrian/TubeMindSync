import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <SignUp
            appearance={{
                elements: {
                    formButtonPrimary:
                        "bg-primary hover:bg-primary/50 w-full shadow-neonLight",
                    card:
                        "bg-background/70 p-5 rounded-xl shadow-neon text-white",
                    headerTitle:
                        'text-foreground',
                    headerSubtitle:
                        'text-muted-foreground',
                    formFieldLabel:
                        'text-foreground',
                    formFieldInput:
                        'bg-transparent text-foreground shadow-neonLight',
                    footerActionText:
                        'text-foreground',
                    footerActionLink:
                        'text-muted-foreground',

                },
            }}
        />)
}