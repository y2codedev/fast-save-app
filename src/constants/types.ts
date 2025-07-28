import { IconType } from 'react-icons';

export interface SocialLink {
    id: number,
    href: string;
    icon: IconType;
    ariaLabel: string;
}

export interface LegalLink {
    id: number,
    href: string;
    label: string;
}

export interface FooterProps {
    companyTagline?: string;
    year?: number;
    socialLinks?: SocialLink[];
    legalLinks?: LegalLink[];
    accentColor?: string;
}

export interface Feature {
    id: number,
    name: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface Step {
    id: number;
    path?: string;
    name: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ReelData {
    url: string;
    sourceUrl?: string;
    title: string;
    thumbnail: string;
    username: string;
    profile_pic: string;
    videoUrl: string;
}

export interface ReelResultProps {
    data: ReelData;
    sourceUrl?: string;
    isSaving: boolean;
    setIsSaving: (value: boolean) => void;
}

export interface TopHeaderItem {
    path: string
    title: string
    description: string
    highlight?: string
}

export interface ButtonProps {
    onClick?: () => void;
    isProcessing?: boolean;
    labal: string;
    icon?: boolean
}

interface MediaItem {
    url: string;
    type: 'video' | 'image';
    quality?: string;
    label?: string;
    width?: number;
    height?: number;
    ext?: string;
    bitrate?: number;
    fps?: number;
}

export interface SocialMediaResponse {
    success: boolean;
    platform: string;
    title?: string;
    thumbnail?: string;
    author?: string;
    duration?: number;
    medias: MediaItem[];
    error?: string;
}

export type Action = {
    file: any;
    file_name: string;
    file_size: number;
    from: string;
    to: String | null;
    file_type: string;
    is_converting?: boolean;
    is_converted?: boolean;
    is_error?: boolean;
    url?: any;
    output?: any;
};


export interface ImageKitUploadResponse {
    fileId: string;
    name: string;
    size: number;
    versionInfo: {
        id: string;
        name: string;
    };
    filePath: string;
    url: string;
    fileType: string;
    height: number;
    width: number;
    thumbnailUrl: string;
    AITags: null | any[];
}

export interface BackgroundRemoverProps {
    apiKey?: string;
    endpoint?: string;
}

export interface AudioPlayerProps {
    audioURL: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    togglePlayback: () => void;
    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
    albumArt: string | null;
    videoFile: File | null;
}