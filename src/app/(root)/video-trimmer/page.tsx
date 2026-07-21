import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import VideoTrimmer from "@/components/sections/VideoTrimmer";
import ToolLayoutWithAds from "@/components/sections/ToolLayoutWithAds";

export default function Page() {
    return (
        <ToolLayoutWithAds>
            <NoSSRWrapper>
                <VideoTrimmer />
            </NoSSRWrapper>
        </ToolLayoutWithAds>
    );
}
