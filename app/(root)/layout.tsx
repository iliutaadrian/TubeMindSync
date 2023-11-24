export default async function RootLayout({
   children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="h-full">
            {children}
        </div>
    )
}
