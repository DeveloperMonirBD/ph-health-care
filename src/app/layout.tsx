import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import LogoutSuccessToast from '@/components/modules/Shared/LogoutSuccessToast';
import LoginSuccessToast from '@/components/modules/Shared/LoginSuccessToast';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'PH Health Care',
    description: 'A healthcare management system for better patient care with Next.js and Tailwind CSS.'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
                <Toaster position='top-right' richColors />
                <LoginSuccessToast />
                <LogoutSuccessToast />
            </body>
        </html>
    );
}
