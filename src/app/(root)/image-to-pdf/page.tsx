import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import ImageToPdfConverter from "@/components/sections/ImageToPdfConverter";

export default function Page() {
    return (
        <main className="min-h-screen py-8">
            <NoSSRWrapper>
                <ImageToPdfConverter />
            </NoSSRWrapper>
        </main>
    );
}
