import { Geist } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
  title: 'Content Studio — AI Content Generator',
  description: 'Generate blog posts, LinkedIn, Twitter, YouTube scripts and emails with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}