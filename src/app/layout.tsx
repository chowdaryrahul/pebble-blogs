// app/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <html lang="en">
    <body className="bg-gray-50 text-gray-900 font-serif">
      <header className="py-6 px-4 bg-white shadow-lg">
        <Link href="/">
          <span>Rahul&apos;s Blog</span>
        </Link>
      </header>
      <main className="max-w-3xl mx-auto p-6">{children}</main>
      <footer className="py-4 text-center bg-gray-200">
        <p>© 2025 Rahul. All rights reserved.</p>
      </footer>
    </body>
  </html>
);

export default Layout;
