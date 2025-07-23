import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  ThreadsIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
  BlueskyIcon,
} from "react-share";
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';

interface SharePopupProps {
  onClose: () => void;
  isOpen: boolean;
}

const ShareDialog = ({ onClose, isOpen }: SharePopupProps) => {
  const urlToShare = "https://fast-save.vercel.app/";
  const title = "Fast Save";
  const hashtags = ["fastsave"];

  const socialIcons = [
    { Icon: EmailIcon, name: "Email", onClick: () => window.open(`mailto:?body=${encodeURIComponent(urlToShare)}&subject=${encodeURIComponent(title)}`) },
    { Icon: FacebookIcon, name: "Facebook", onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`) },
    { Icon: FacebookMessengerIcon, name: "Messenger", onClick: () => window.open(`fb-messenger://share/?link=${encodeURIComponent(urlToShare)}`) },
    { Icon: GabIcon, name: "Gab", onClick: () => window.open(`https://gab.com/compose?text=${encodeURIComponent(urlToShare)}`) },
    { Icon: HatenaIcon, name: "Hatena", onClick: () => window.open(`http://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(urlToShare)}`) },
    { Icon: InstapaperIcon, name: "Instapaper", onClick: () => window.open(`http://www.instapaper.com/hello2?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: LineIcon, name: "Line", onClick: () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: LinkedinIcon, name: "LinkedIn", onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: LivejournalIcon, name: "LiveJournal", onClick: () => window.open(`https://www.livejournal.com/update.bml?event=${encodeURIComponent(urlToShare)}&subject=${encodeURIComponent(title)}`) },
    { Icon: MailruIcon, name: "Mail.ru", onClick: () => window.open(`https://connect.mail.ru/share?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: OKIcon, name: "Odnok", onClick: () => window.open(`https://connect.ok.ru/offer?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: PinterestIcon, name: "Pinterest", onClick: () => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: PocketIcon, name: "Pocket", onClick: () => window.open(`https://getpocket.com/edit?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: RedditIcon, name: "Reddit", onClick: () => window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(urlToShare)}&title=${encodeURIComponent(title)}`) },
    { Icon: TelegramIcon, name: "Telegram", onClick: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(title)}`) },
    { Icon: ThreadsIcon, name: "Threads", onClick: () => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(`${title} ${urlToShare}`)}`) },
    { Icon: TumblrIcon, name: "Tumblr", onClick: () => window.open(`https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(urlToShare)}`) },
    { Icon: TwitterIcon, name: "Twitter", onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(hashtags.join(','))}`) },
    { Icon: ViberIcon, name: "Viber", onClick: () => window.open(`viber://forward?text=${encodeURIComponent(`${title} ${urlToShare}`)}`) },
    { Icon: VKIcon, name: "VK", onClick: () => window.open(`https://vk.com/share.php?url=${encodeURIComponent(urlToShare)}`) },
    { Icon: WeiboIcon, name: "Weibo", onClick: () => window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(urlToShare)}&title=${encodeURIComponent(title)}`) },
    { Icon: WhatsappIcon, name: "WhatsApp", onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${urlToShare}`)}`) },
    { Icon: WorkplaceIcon, name: "Workplace", onClick: () => window.open(`https://work.facebook.com/sharer.php?u=${encodeURIComponent(urlToShare)}`) },
    { Icon: XIcon, name: "X", onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(title)}`) },
    { Icon: BlueskyIcon, name: "Bluesky", onClick: () => window.open(`https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${urlToShare}`)}`) },
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 dark:bg-black/70" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl p-2">
          <div className="p-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-[55vh] overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {socialIcons?.map(({ Icon, name, onClick }) => (
                  <button
                    key={name}
                    className="flex flex-col items-center rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label={`Share on ${name}`}
                    onClick={onClick}
                  >
                    <Icon size={40} round />
                    <span className="mt-2 text-xs text-gray-600 dark:text-gray-300">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ShareDialog;