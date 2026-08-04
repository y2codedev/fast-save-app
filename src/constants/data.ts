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

import { Sparkles, Image as ImageIcon, Zap, FileText, FileCode, Film, Scissors, ImagePlus, Layers, Unlock, Lock, Code, Archive, FileArchive, Package, FolderArchive, Disc } from 'lucide-react';

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
      { name: "PDF to Word", path: "/pdf-to-docx", icon: FileText, desc: "Convert PDF to DOCX" },
      { name: "Word to PDF", path: "/word-to-pdf", icon: FileText, desc: "Convert DOCX to PDF" },
      { name: "Word to HTML", path: "/word-to-html", icon: FileCode, desc: "Convert DOCX to HTML" },
      { name: "PDF to HTML", path: "/pdf-to-html", icon: FileCode, desc: "Convert PDF to HTML" },
      { name: "Unlock PDF", path: "/unlock-pdf", icon: Unlock, desc: "Remove passwords" },
      { name: "Protect PDF", path: "/protect-pdf", icon: Lock, desc: "Add passwords" },
    ]
  },
  {
    category: "Social",
    items: [
      { name: "IG Downloader", path: "/ig-downloader", icon: FiInstagram, desc: "Download Instagram content" },
    ]
  },
  {
    category: "Dev Tools",
    items: [
      { name: "Data Formatter", path: "/data-formatter", icon: Code, desc: "Format JSON, XML, YAML, CSV" },
    ]
  }
];

export const ZIP_MENU_ITEMS = [
  {
    header: "ORGANIZE ZIP",
    items: [
      { name: "Create ZIP", path: "/create-zip", icon: Layers, desc: "Create new ZIP archive" },
      { name: "Unzip ZIP", path: "/unzip-zip", icon: Unlock, desc: "Extract ZIP files" },
      { name: "Edit ZIP", path: "/edit-zip", icon: FileText, desc: "Modify ZIP contents" },
      { name: "Merge ZIP", path: "/merge-zip", icon: Layers, desc: "Combine ZIP files" },
      { name: "Split ZIP", path: "/split-zip", icon: Scissors, desc: "Divide ZIP archives" },
      { name: "View ZIP", path: "/view-zip", icon: Sparkles, desc: "Inspect ZIP contents" },
    ]
  },
  {
    header: "ZIP SECURITY",
    items: [
      { name: "Protect ZIP", path: "/protect-zip", icon: Lock, desc: "Add password to ZIP" },
      { name: "Unlock ZIP", path: "/unlock-zip-file", icon: Unlock, desc: "Remove ZIP password" },
    ]
  },
  {
    header: "CONVERT TO ZIP",
    items: [
      { name: "RAR to ZIP", path: "/rar-to-zip", icon: Archive, desc: "Convert RAR format" },
      { name: "7Z to ZIP", path: "/7z-to-zip", icon: FileArchive, desc: "Convert 7Z format" },
      { name: "TAR to ZIP", path: "/tar-to-zip", icon: Package, desc: "Convert TAR format" },
      { name: "TAR-GZ to ZIP", path: "/tar-gz-to-zip", icon: FolderArchive, desc: "Convert TAR-GZ format" },
      { name: "TAR-BZ2 to ZIP", path: "/tar-bz2-to-zip", icon: Archive, desc: "Convert TAR-BZ2 format" },
      { name: "TAR-XZ to ZIP", path: "/tar-xz-to-zip", icon: FileArchive, desc: "Convert TAR-XZ format" },
      { name: "GZ to ZIP", path: "/gz-to-zip", icon: Package, desc: "Convert GZ format" },
      { name: "BZ2 to ZIP", path: "/bz2-to-zip", icon: FolderArchive, desc: "Convert BZ2 format" },
      { name: "XZ to ZIP", path: "/xz-to-zip", icon: Archive, desc: "Convert XZ format" },
      { name: "ISO to ZIP", path: "/iso-to-zip", icon: Disc, desc: "Convert ISO format" },
    ]
  },
  {
    header: "CONVERT FROM ZIP",
    items: [
      { name: "ZIP to RAR", path: "/zip-to-rar", icon: Archive, desc: "Convert to RAR" },
      { name: "ZIP to 7Z", path: "/zip-to-7z", icon: FileArchive, desc: "Convert to 7Z" },
      { name: "ZIP to TAR", path: "/zip-to-tar", icon: Package, desc: "Convert to TAR" },
      { name: "ZIP to TAR-GZ", path: "/zip-to-tar-gz", icon: FolderArchive, desc: "Convert to TAR-GZ" },
      { name: "ZIP to TAR-BZ2", path: "/zip-to-tar-bz2", icon: Archive, desc: "Convert to TAR-BZ2" },
      { name: "ZIP to TAR-XZ", path: "/zip-to-tar-xz", icon: FileArchive, desc: "Convert to TAR-XZ" },
      { name: "ZIP to GZ", path: "/zip-to-gz", icon: Package, desc: "Convert to GZ" },
      { name: "ZIP to BZ2", path: "/zip-to-bz2", icon: FolderArchive, desc: "Convert to BZ2" },
      { name: "ZIP to XZ", path: "/zip-to-xz", icon: Archive, desc: "Convert to XZ" },
      { name: "ZIP to ISO", path: "/zip-to-iso", icon: Disc, desc: "Convert to ISO" },
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
