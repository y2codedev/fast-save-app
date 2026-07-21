import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import VideoToGifConverter from "@/components/sections/VideoToGifConverter";
import ToolLayoutWithAds from "@/components/sections/ToolLayoutWithAds";

export default function Page() {
    return (
        <ToolLayoutWithAds>
            <NoSSRWrapper>
                <VideoToGifConverter />
            </NoSSRWrapper>
        </ToolLayoutWithAds>
    );
}
