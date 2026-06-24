import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import CookieBanner from './components/CookieBanner';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['500','600','700'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'ContentStudio — AI Content Generator',
  description: 'One topic, five formats, written by AI in seconds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fraunces.variable + ' ' + inter.variable} style={{ fontFamily: 'var(--font-body)' }}>
        <AuthProvider>
          {children}
          <CookieBanner />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#FFFDF7', color: '#2C1810', border: '1px solid #E8DFD0', fontSize: '14px' },
              success: { iconTheme: { primary: '#2D6A4F', secondary: '#FFFDF7' } },
              error: { iconTheme: { primary: '#C0392B', secondary: '#FFFDF7' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}