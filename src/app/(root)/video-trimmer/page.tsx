import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import VideoTrimmer from "@/components/sections/VideoTrimmer";

export default function Page() {
    return (
        <main className="min-h-screen py-8">
            <NoSSRWrapper>
                <VideoTrimmer />
            </NoSSRWrapper>
        </main>
    );
}
