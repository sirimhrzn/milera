import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium text-xl md:text-2xl"
                >
                    <div className="bg-primary text-primary-foreground flex size-6 md:size-8 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4 md:size-5" />
                    </div>
                    Milera
                </Link>
                <main>{children}</main>
            </div>
        </div>
    );
}
