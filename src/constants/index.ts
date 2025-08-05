import HeroSection from '@/components/sections/HeroSection';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import DownloadForm from '@/components/sections/DownloadForm';
import DownloadSteps from '@/components/sections/DownloadSteps';
import LegalDisclaimer from '@/components/sections/LegalDisclaimer';
import Loader from '@/components/ui/Loader';
import ReelResult from '@/components/sections/ReelResult';
import ThemeProviderWrapper from '@/components/sections/ThemeProviderWrapper';
import TopText from '@/components/sections/TopText';
import FallbackLoader from '@/components/ui/FallbackLoader';
import ResetButton from '@/components/sections/ResetButton';
import Button from '@/components/sections/Button';
import ToastProvider from '@/components/sections/ToastProvider';
import Toast from '@/lib/tost';
import InputField from '@/components/sections/InputField';
import ShareDialog from '@/components/ui/ShareDialog';
import AudioLoader from "@/components/ui/AudioLoader";
import { FileUploader } from "@/components/sections/FileUploader";
import { AudioPlayer } from "@/components/sections/AudioPlayer";
import FileUploadArea from '@/components/sections/FileUploadArea';
import ImagePreview from '@/components/sections/ImagePreview';
import SVGOutput from '@/components/sections/SVGOutput';
import Group from '@/components/sections/Group';
import StatsDisplay from '@/components/sections/StatsDisplay';
import ErrorMessage from '@/components/sections/ErrorMessage';
import AdsenseAd from '@/components/AdsenseAd';

export type { SocialLink, LegalLink, FooterProps } from './types';
export { DEFAULT_SOCIAL_LINKS, DEFAULT_LEGAL_LINKS, FEATURES } from './data';

export {
    HeroSection,
    DownloadForm,
    DownloadSteps,
    LegalDisclaimer,
    Loader,
    ReelResult,
    Navbar,
    Footer,
    TopText,
    ThemeProviderWrapper,
    FallbackLoader,
    ResetButton,
    Button,
    ToastProvider,
    Toast,
    InputField,
    ShareDialog,
    AudioLoader,
    FileUploader,
    AudioPlayer,
    FileUploadArea,
    ImagePreview,
    SVGOutput,
    StatsDisplay,
    Group,
    ErrorMessage,
    AdsenseAd,
};