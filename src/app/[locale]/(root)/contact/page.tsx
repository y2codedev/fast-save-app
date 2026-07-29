'use client';

import React from 'react';
import { Mail, Clock, MapPin, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question, feedback, or need help with a tool? We're here for you. Reach out directly to the FastSave team.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 justify-between">
            
            <div className="space-y-8 flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Email Support</h4>
                  <a 
                    href="mailto:support@fastsave.com" 
                    className="text-lg font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors inline-flex items-center gap-2"
                  >
                    support@fastsave.com
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Send us an email anytime. This is the fastest way to get support.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Response Time</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We aim to respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Company</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fast Save Apps<br/>
                    Digital Media Tools
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Element / CTA */}
            <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-gray-700/30 dark:to-gray-800/50 rounded-2xl border border-indigo-100 dark:border-gray-700">
               <Mail className="w-16 h-16 text-indigo-300 dark:text-indigo-900/50 mb-4" />
               <p className="text-center text-gray-600 dark:text-gray-300 font-medium mb-6">
                 Click below to open your default email client.
               </p>
               <a 
                 href="mailto:support@fastsave.com"
                 className="w-full text-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
               >
                 Email Us Now
               </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
