import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MediaUploadProps {
    images: string[];
    onRemove: (index: number) => void;
}

export function MediaUpload({ images, onRemove }: MediaUploadProps) {
    const getGridClass = () => {
        switch (images.length) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-2";
            case 4:
                return "grid-cols-2";
            default:
                return "grid-cols-1";
        }
    };

    return (
        <div
            className={`grid gap-2 mt-3 rounded-2xl overflow-hidden ${getGridClass()}`}
        >
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`relative group ${
                        images.length === 3 && index === 0 ? "row-span-2" : ""
                    }`}
                >
                    <img
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover min-h-[200px] max-h-[400px]"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
