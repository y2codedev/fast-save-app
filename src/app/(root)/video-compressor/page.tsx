import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import VideoCompressor from "@/components/sections/VideoCompressor";

export default function Page() {
    return (
        <main className="min-h-screen py-8">
            <NoSSRWrapper>
                <VideoCompressor />
            </NoSSRWrapper>
        </main>
    );
}
