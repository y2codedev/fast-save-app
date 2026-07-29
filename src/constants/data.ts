import { FiInstagram } from 'react-icons/fi';
import { FaSnapchat, FaFacebook } from "react-icons/fa";
import { MdAudiotrack, MdInsertPhoto } from "react-icons/md";

import {
    DevicePhoneMobileIcon,
    LockClosedIcon,
    ClipboardDocumentIcon,
    ArrowRightIcon,
    ArrowDownTrayIcon,
    FilmIcon,
    RectangleStackIcon,
    ScissorsIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    LifebuoyIcon,
    ArrowPathIcon,
    DocumentTextIcon,
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
        href: '/audio',
        icon: MdAudiotrack,
        ariaLabel: 'Audio',
    },
    {
        id: 3,
        href: '/photo',
        icon: MdInsertPhoto,
        ariaLabel: 'Photo',
    },
    // {
    //     id: 4,
    //     href: '/fb-video',
    //     icon: FaFacebook,
    //     ariaLabel: 'FB Video',
    // },
    {
        id: 5,
        href: '/bg-remover',
        icon: ScissorsIcon,
        ariaLabel: 'Bg Remove',
    },
    {
        id: 6,
        href: '/image-compressor',
        icon: ArrowPathIcon,
        ariaLabel: 'Image Compressor'
    },
    // {
    //     id: 7,
    //     href: '/snapchat',
    //     icon: FaSnapchat,
    //     ariaLabel: 'Snapchat'
    // },

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
    {
        id: 3,
        href: '/about',
        label: 'About Us'
    },
    {
        id: 4,
        href: '/contact',
        label: 'Contact Us'
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
        name: 'Find',
        description: 'Open the app and find the content you want to download',
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
        description: 'Paste the link in our downloader',
        icon: ArrowRightIcon,
    },
    {
        id: 4,
        name: 'Download',
        description: 'Click download and save to your device',
        icon: ArrowDownTrayIcon,
    },
]

import { Sparkles, Image as ImageIcon, Zap, FileText, Film, Scissors, ImagePlus, Layers, Unlock, Lock } from 'lucide-react';

export const MEGA_MENU_ITEMS = [
  {
    category: "Video & Audio",
    items: [
      { name: "Video Trimmer", path: "/video-trimmer", icon: Scissors, desc: "Cut and trim videos" },
      { name: "Video Compressor", path: "/video-compressor", icon: Zap, desc: "Reduce video size" },
      { name: "Video to GIF", path: "/video-to-gif", icon: FilmIcon, desc: "Convert to GIF" },
      { name: "Video to Audio", path: "/audio", icon: MdAudiotrack, desc: "Extract audio" },
      { name: "Audio Trimmer", path: "/audio-trimmer", icon: Scissors, desc: "Cut audio files" },
    ]
  },
  {
    category: "Image Tools",
    items: [
      { name: "Pro Image Editor", path: "/image-editor", icon: Sparkles, desc: "Resize, crop, and edit" },
      { name: "Remove Background", path: "/bg-remover", icon: Sparkles, desc: "AI background removal" },
      { name: "Compress Image", path: "/image-compressor", icon: ArrowPathIcon, desc: "Reduce image size" },
      { name: "Image Converter", path: "/photo", icon: MdInsertPhoto, desc: "Convert image formats" },
    ]
  },
  {
    category: "PDF Tools",
    items: [
      { name: "Merge PDF", path: "/merge-pdf", icon: Layers, desc: "Combine PDFs" },
      { name: "Image to PDF", path: "/image-to-pdf", icon: DocumentTextIcon, desc: "Convert images to PDF" },
      { name: "PDF to JPG", path: "/pdf-to-jpg", icon: ImagePlus, desc: "Extract images" },
      { name: "MD to PDF", path: "/md-converter", icon: FileText, desc: "Markdown to PDF" },
      { name: "Unlock PDF", path: "/unlock-pdf", icon: Unlock, desc: "Remove passwords" },
      { name: "Protect PDF", path: "/protect-pdf", icon: Lock, desc: "Add passwords" },
    ]
  },
  {
    category: "Social",
    items: [
      { name: "IG Downloader", path: "/ig-downloader", icon: FiInstagram, desc: "Download Instagram content" },
    ]
  }
];

export const NAVITEMS: SocialLink[] = [
    // {
    //     id: 1,
    //     href: '/fb-video',
    //     icon: FaFacebook,
    //     ariaLabel: 'Facebook',
    // },
    // {
    //     id: 2,
    //     href: '/snapchat',
    //     icon: FaSnapchat,
    //     ariaLabel: 'Snapchat'
    // },
    {
        id: 3,
        href: '/photo',
        icon: MdInsertPhoto,
        ariaLabel: 'Photo',
    },
    {
        id: 4,
        href: '/bg-remover',
        icon: ScissorsIcon,
        ariaLabel: 'Bg Remove',
    },
    {
        id: 5,
        href: '/image-compressor',
        icon: ArrowPathIcon,
        ariaLabel: 'Image Compressor'
    },
      {
        id: 8,
        href: '/image-to-pdf',
        icon: DocumentTextIcon,
        ariaLabel: 'Image to PDF'
    },
    {
        id: 6,
        href: '/audio',
        icon: MdAudiotrack,
        ariaLabel: 'Audio',
    },
    {
        id: 7,
        href: '/video-to-gif',
        icon: FilmIcon,
        ariaLabel: 'Video to GIF'
    }
];


export const TopHeader_Item: TopHeaderItem[] = [
    { path: '/pinterest', titleKey: 'pinterest.title', descriptionKey: 'pinterest.description' },
    { path: '/youtube-video', titleKey: 'youtube.title', descriptionKey: 'youtube.description' },
    { path: '/audio', titleKey: 'audio.title', descriptionKey: 'audio.description' },
    { path: '/photo', titleKey: 'photo.title', descriptionKey: 'photo.description' },
    { path: '/stories', titleKey: 'stories.title', descriptionKey: 'stories.description' },
    { path: '/fb-video', titleKey: 'fb_video.title', descriptionKey: 'fb_video.description' },
    { path: '/bg-remover', titleKey: 'bg_remover.title', descriptionKey: 'bg_remover.description' },
    { path: '', titleKey: 'default.title', descriptionKey: 'default.description' },
    { path: '/ig-downloader', titleKey: 'ig_downloader.title', descriptionKey: 'ig_downloader.description' },
    { path: '/image-compressor', titleKey: 'image_compressor.title', descriptionKey: 'image_compressor.description' },
    { path: '/snapchat', titleKey: 'snapchat.title', descriptionKey: 'snapchat.description' },
    { path: '/video-to-gif', titleKey: 'video_to_gif.title', descriptionKey: 'video_to_gif.description' },
    { path: '/video-compressor', titleKey: 'video_compressor.title', descriptionKey: 'video_compressor.description' },
    { path: '/video-trimmer', titleKey: 'video_trimmer.title', descriptionKey: 'video_trimmer.description' },
    { path: '/audio-trimmer', titleKey: 'audio_trimmer.title', descriptionKey: 'audio_trimmer.description' },
    { path: '/md-converter', titleKey: 'md_converter.title', descriptionKey: 'md_converter.description' },
    { path: '/protect-pdf', titleKey: 'protect_pdf.title', descriptionKey: 'protect_pdf.description' },
    { path: '/unlock-pdf', titleKey: 'unlock_pdf.title', descriptionKey: 'unlock_pdf.description' }
]
