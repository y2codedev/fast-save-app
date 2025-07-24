import { FiInstagram } from 'react-icons/fi';
import { FaSnapchat,FaPinterest ,FaVideo,FaFacebook } from "react-icons/fa";
import { MdAudiotrack,MdInsertPhoto } from "react-icons/md";

import {
    DevicePhoneMobileIcon,
    LockClosedIcon,
    ClipboardDocumentIcon,
    ArrowRightIcon,
    ArrowDownTrayIcon,
    FilmIcon,
    PhotoIcon,
    SpeakerWaveIcon,
    RectangleStackIcon,
    PlayCircleIcon,
    ScissorsIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    LifebuoyIcon,
    ArrowPathIcon,

} from '@heroicons/react/24/outline'

import type { Feature, LegalLink, SocialLink, Step, TopHeaderItem } from './types';
import { HiLightningBolt } from 'react-icons/hi';

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    {
        id: 1,
        href: '/',
        icon: FiInstagram,
        ariaLabel: 'Instagram profile'
    },
    {
        id: 2,
        href: '/pinterest',
        icon: FaPinterest,
        ariaLabel: 'Pinterest',
    },
    {
        id: 3,
        href: '/video',
        icon: FaVideo ,
        ariaLabel: 'Video',
    },
    {
        id: 4,
        href: '/audio',
        icon: MdAudiotrack,
        ariaLabel: 'Audio',
    },
    {
        id: 5,
        href: '/photo',
        icon: MdInsertPhoto,
        ariaLabel: 'Photo',
    },
    {
        id: 6,
        href: '/fb-video',
        icon: FaFacebook,
        ariaLabel: 'FB Video',
    },
    {
        id: 7,
        href: '/bg-remover',
        icon: ScissorsIcon,
        ariaLabel: 'Bg Remove',
    },
    {
        id: 8,
        href: '/image-compressor',
        icon: ArrowPathIcon,
        ariaLabel: 'Image Compressor'
    }
];


export const DEFAULT_LEGAL_LINKS: LegalLink[] = [
    {
        id: 1,
        href: '/privacy',
        label: 'Privacy Policy'
    },
    {
        id: 2,
        href: '/terms',
        label: 'Terms of Service'
    },
];

export const FEATURES: Feature[] = [
    {
        id: 1,
        name: 'Fast Downloads',
        description: 'Get your videos instantly with our high-speed servers',
        icon: HiLightningBolt
    },
    {
        id: 2,
        name: 'HD Quality',
        description: 'Download videos in the highest available quality',
        icon: FilmIcon
    },
    {
        id: 3,
        name: 'No Watermark',
        description: 'Get clean videos without any branding',
        icon: ShieldCheckIcon
    },
    {
        id: 4,
        name: 'Multiple Formats',
        description: 'Download as MP4, MP3, or other formats',
        icon: ArrowDownTrayIcon
    },
    {
        id: 5,
        name: 'All Platforms',
        description: 'Works with Instagram, Facebook, Pinterest and more',
        icon: GlobeAltIcon
    },
    {
        id: 6,
        name: 'Batch Processing',
        description: 'Download multiple videos simultaneously',
        icon: RectangleStackIcon
    },
    {
        id: 7,
        name: 'Privacy Protection',
        description: 'Your downloads remain completely private',
        icon: LockClosedIcon
    },
    {
        id: 8,
        name: '24/7 Support',
        description: 'Our team is always available to help',
        icon: LifebuoyIcon
    }
];



export const STEP: Step[] = [
    {
        id: 1,
        name: 'Find a Reel',
        description: 'Open Instagram and find the Reel you want to download',
        icon: DevicePhoneMobileIcon,
    },
    {
        id: 2,
        name: 'Copy Link',
        description: 'Tap the three dots menu and select "Copy link"',
        icon: ClipboardDocumentIcon,
    },
    {
        id: 3,
        name: 'Paste URL',
        description: 'Paste the Instagram link in our downloader',
        icon: ArrowRightIcon,
    },
    {
        id: 4,
        name: 'Download',
        description: 'Click download and save to your device',
        icon: ArrowDownTrayIcon,
    },
]

export const NAVITEMS: SocialLink[] = [
    {
        id: 1,
        href: '/pinterest',
        icon: FaPinterest,
        ariaLabel: 'Pinterest',
    },
    {
        id: 2,
        href: '/video',
        icon: FaVideo ,
        ariaLabel: 'Video',
    },
    {
        id: 3,
        href: '/audio',
        icon: MdAudiotrack,
        ariaLabel: 'Audio',
    },
    {
        id: 4,
        href: '/photo',
        icon: MdInsertPhoto,
        ariaLabel: 'Photo',
    },
    // {
    //     id: 5,
    //     href: '/stories',
    //     icon: CameraIcon,
    //     ariaLabel: 'Stories',
    // },
    {
        id: 5,
        href: '/fb-video',
        icon: FaFacebook,
        ariaLabel: 'FB Video',
    },
    {
        id: 6,
        href: '/bg-remover',
        icon: ScissorsIcon,
        ariaLabel: 'Bg Remove',
    },
    {
        id: 7,
        href: '/image-compressor',
        icon: ArrowPathIcon,
        ariaLabel: 'Image Compressor'
    },
    {
        id: 8,
        href: '/snapchat',
        icon: FaSnapchat,
        ariaLabel: 'Snapchat'
    }

];


export const TopHeader_Item: TopHeaderItem[] = [
    {
        path: '/pinterest',
        title: 'Download Pinterest Videos & Images',
        description: 'Save Pinterest content directly to your device',
        highlight: 'Pinterest'
    },
    {
        path: '/video',
        title: 'Download High Quality Videos',
        description: 'Save videos from various platforms in best quality',
        highlight: 'High Quality'
    },
    {
        path: '/audio',
        title: 'Extract Audio from Videos',
        description: 'Convert videos to MP3 audio files',
        highlight: 'Audio'
    },
    {
        path: '/photo',
        title: 'Download Photos & Videos',
        description: 'Save high resolution images to your device',
        highlight: 'Photos'
    },
    {
        path: '/stories',
        title: 'Download Instagram Stories',
        description: 'Save stories before they disappear',
        highlight: 'Stories'
    },
    {
        path: '/fb-video',
        title: 'Download Facebook Videos',
        description: 'Save videos from Facebook to your device',
        highlight: 'Facebook'
    },
    {
        path: '/bg-remover',
        title: 'Remove Backgrounds from Images',
        description: 'Instantly remove backgrounds with AI technology',
        highlight: 'Backgrounds'
    },
    {
        path: '',
        title: 'Download Instagram Reels',
        description: 'Paste your Instagram Reel URL below to download the video without watermark',
        highlight: 'Without Watermark'
    },
    {
        path: '/image-compressor',
        title: 'Image Compressor',
        description: 'Instantly Image Compressor without losing quality Reduce image file size without sacrificing quality',
        highlight: 'Image Compressor'
    },
    {
        path: '/snapchat',
        title: 'Snapchat Video Downloader',
        description: 'Download Snapchat videos easily',
        highlight: 'Snapchat'
    },
]
