import { Geist } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

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
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #2a2a2a',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#34d399', secondary: '#1a1a1a' }
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#1a1a1a' }
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}