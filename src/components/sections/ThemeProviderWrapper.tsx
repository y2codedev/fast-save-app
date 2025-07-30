import { ThemeProvider } from 'next-themes'
import React from 'react';
import "../../app/globals.css";

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            enableSystem={false}
            disableTransitionOnChange={true}
            enableColorScheme={true}
        >
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviderWrapper
