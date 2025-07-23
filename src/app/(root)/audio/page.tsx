import NoSSRWrapper from "@/components/sections/NoSSRWrapper";
import AudioSections from "@/components/sections/AudioSections";
import { Group } from "@/constants";

export default function Page() {
    return <div className="bg-white dark:bg-gray-900">
        <NoSSRWrapper>
            <AudioSections />
            <Group />
        </NoSSRWrapper>
    </div>
}
