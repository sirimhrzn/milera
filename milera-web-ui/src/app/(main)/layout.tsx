import { BottomNavigation } from "./_components/BottomNavigation";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col max-w-5xl mx-auto">
            <main className="flex-1 pb-16">{children}</main>
            <BottomNavigation />
        </div>
    );
}
