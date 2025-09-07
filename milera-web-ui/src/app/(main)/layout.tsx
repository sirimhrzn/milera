import { BottomNavigation } from "./_components/BottomNavigation";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="container mx-auto">
            <div>{children}</div>
            <BottomNavigation />
        </main>
    );
}
