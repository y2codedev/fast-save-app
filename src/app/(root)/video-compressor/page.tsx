import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import VideoCompressor from "@/components/sections/VideoCompressor";
import ToolLayoutWithAds from "@/components/sections/ToolLayoutWithAds";

export default function Page() {
    return (
        <ToolLayoutWithAds>
            <NoSSRWrapper>
                <VideoCompressor />
            </NoSSRWrapper>
        </ToolLayoutWithAds>
    );
}
