'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Send, 
  HelpCircle, 
  ShieldCheck, 
  Bug, 
  Lightbulb, 
  MessageSquare, 
  ChevronDown, 
  Sparkles,
  ArrowRight,
  Shield,
  FileCheck,
  Zap
} from 'lucide-react';
import { Link } from '@/i18n/routing';

interface ContactSectionProps {
  translations: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    emailSupport: string;
    emailDesc: string;
    responseTime: string;
    responseDesc: string;
    company: string;
    companyName: string;
    companyDesc: string;
    ctaBtn: string;
    ctaTitle: string;
  };
}

const INQUIRY_TOPICS = [
  { id: 'general', label: 'General Inquiry', icon: MessageSquare, subject: '[Inquiry] Question about ConvertAllNow' },
  { id: 'bug', label: 'Bug / File Issue', icon: Bug, subject: '[Bug Report] Issue with file conversion' },
  { id: 'feature', label: 'New Tool Request', icon: Lightbulb, subject: '[Feature Request] Suggestion for new tool' },
  { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck, subject: '[Privacy] Question regarding data processing' },
];

const FAQS = [
  {
    question: 'Are my uploaded files ever stored or viewed on your servers?',
    answer: 'No, absolutely not. ConvertAllNow tools process your files directly inside your web browser using WebAssembly and client-side JavaScript. Your files never leave your device, ensuring total confidentiality and privacy.'
  },
  {
    question: 'Why did my file conversion fail or freeze?',
    answer: 'Because processing happens entirely on your device, conversions rely on your available system RAM and browser performance. If a file is unusually large or the browser is low on memory, try closing other heavy browser tabs and re-running the conversion.'
  },
  {
    question: 'Is ConvertAllNow completely free to use?',
    answer: 'Yes! All 50+ file conversion, compression, and editing tools on ConvertAllNow are 100% free for both personal and commercial use. No account creation, payment, or watermark is ever required.'
  },
  {
    question: 'How do I request support for a new file format?',
    answer: 'Select "New Tool Request" above and send us an email specifying the input and desired output formats. We constantly evaluate user requests when expanding our tool suite.'
  }
];

export default function ContactSection({ translations }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(INQUIRY_TOPICS[0]);
  const [userMessage, setUserMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const supportEmail = 'support@y2code.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(selectedTopic.subject);
    const body = encodeURIComponent(
      userMessage.trim() 
        ? userMessage 
        : `Hi ConvertAllNow Team,\n\nI am contacting you regarding: ${selectedTopic.label}.\n\nDetails:\n\n[Please describe your question or issue here]`
    );
    return `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = () => {
    const draftText = `To: ${supportEmail}\nSubject: ${selectedTopic.subject}\n\n${userMessage || 'Hi ConvertAllNow Team,\n\nI am contacting you regarding: ' + selectedTopic.label}`;
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16">
      
      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-4xl mx-auto pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>ConvertAllNow Help & Support Center</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          {translations.title}{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {translations.titleHighlight}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {translations.subtitle}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-200/60 dark:border-emerald-800/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% In-Browser Privacy</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-200/60 dark:border-indigo-800/40">
            <Clock className="w-3.5 h-3.5" />
            <span>24–48h Response SLA</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-200/60 dark:border-purple-800/40">
            <Zap className="w-3.5 h-3.5" />
            <span>Direct Developer Support</span>
          </div>
        </div>
      </div>

      {/* 3 Key Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Email */}
        <div className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-xs hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {translations.emailSupport}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1 break-all">
                {supportEmail}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {translations.emailDesc}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700/60 flex items-center gap-2">
            <a
              href={`mailto:${supportEmail}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <span>Email Us</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
              className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Response Time */}
        <div className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-xs hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {translations.responseTime}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                24–48 Business Hours
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {translations.responseDesc}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700/60 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
              Support Desk Active
            </span>
          </div>
        </div>

        {/* Card 3: Platform & Company */}
        <div className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-xs hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                {translations.company}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                {translations.companyName}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {translations.companyDesc} • Web-based media, document, and archive conversion utilities.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700/60 flex items-center">
            <Link
              href="/file-privacy-security"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors"
            >
              <span>View Privacy Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Main Split Section: Interactive Composer & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Contact Composer (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-gray-200/80 dark:border-gray-700/80 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Direct Communication</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Send Us a Message
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Select your inquiry category below to automatically configure your email draft.
            </p>
          </div>

          {/* Topic Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Inquiry Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {INQUIRY_TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isSelected = selectedTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-bold shadow-xs'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className="text-xs leading-tight">{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Line Display */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Email Subject
            </label>
            <div className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200">
              {selectedTopic.subject}
            </div>
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Your Message or Issue Details (Optional)
            </label>
            <textarea
              rows={4}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Provide any relevant details, such as the tool URL, file size, or browser version..."
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-hidden transition-all resize-y"
            />
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={getMailtoUrl()}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{translations.ctaBtn}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-sm transition-all"
            >
              {copiedDraft ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedDraft ? 'Draft Copied!' : 'Copy Draft'}</span>
            </button>
          </div>

          <p className="text-xs text-center sm:text-left text-gray-500 dark:text-gray-400">
            {translations.ctaTitle} Your privacy is guaranteed; files and communications remain secure.
          </p>
        </div>

        {/* Right Column: Quick FAQs & Security Assurance (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* FAQ Card */}
          <div className="bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-700/60">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Answers</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Common questions before contacting</p>
              </div>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-gray-100 dark:border-gray-700/60 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700/40 bg-gray-50/50 dark:bg-gray-900/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy Transparency Callout */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-3xl p-6 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Our File Privacy Promise</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
              We never inspect, store, or sell any file contents. Document and media operations are executed strictly within your browser.
            </p>
            <div className="pt-2">
              <Link 
                href="/file-privacy-security"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                <span>Read File Privacy & Security Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Cross-Navigation Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Convert or Edit Your Files?
          </h3>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl">
            Over 50+ free browser tools for PDFs, Images, Videos, Audio, and Archives with zero setup.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-extrabold text-sm sm:text-base hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <span>Explore All Tools</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
