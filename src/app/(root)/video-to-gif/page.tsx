import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import VideoToGifConverter from "@/components/sections/VideoToGifConverter";

export default function Page() {
    return (
        <main className="min-h-screen py-8">
            <NoSSRWrapper>
                <VideoToGifConverter />
            </NoSSRWrapper>
        </main>
    );
}
