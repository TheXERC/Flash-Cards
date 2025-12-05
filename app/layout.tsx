import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Flash Cards',
  description: 'Study flash cards from NotebookLM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${vazirmatn.className} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="flash-cards-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
