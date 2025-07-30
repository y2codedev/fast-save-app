import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: number) {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const setThemeMode = (themeMode: 'dark' | 'light') => {
  if (typeof window !== 'undefined' && document?.documentElement) {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
    localStorage.setItem('themeMode', themeMode);
  }
};
