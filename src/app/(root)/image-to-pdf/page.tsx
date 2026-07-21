import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import ImageToPdfConverter from "@/components/sections/ImageToPdfConverter";
import ToolLayoutWithAds from "@/components/sections/ToolLayoutWithAds";


export default function Page() {
    return (
        <ToolLayoutWithAds>
            <NoSSRWrapper>
                <ImageToPdfConverter />
            </NoSSRWrapper>
        </ToolLayoutWithAds>
    );
}
