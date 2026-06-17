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
                background: '#FFFDF7',
                color: '#2C1810',
                border: '1px solid #E8DFD0',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#2D6A4F', secondary: '#FFFDF7' } },
              error: { iconTheme: { primary: '#C0392B', secondary: '#FFFDF7' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}