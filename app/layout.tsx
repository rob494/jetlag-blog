import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelWell - Beat Jet Lag & Travel Smarter",
  description: "Expert advice on beating jet lag, staying healthy on the road, and making the most of your travel adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                TravelWell
              </Link>
              <div className="flex items-center gap-8">
                <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Blog
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">TravelWell</h3>
                <p className="text-gray-400 text-sm">
                  Your guide to smarter travel, better sleep, and beating jet lag.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Popular Posts</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/blog/best-jet-lag-products" className="hover:text-white transition">Best Jet Lag Products</Link></li>
                  <li><Link href="/blog/tokyo-48-hours" className="hover:text-white transition">Tokyo in 48 Hours</Link></li>
                  <li><Link href="/blog/sleep-hacks-frequent-flyers" className="hover:text-white transition">Sleep Hacks for Flyers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Topics</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/blog?tag=jet-lag" className="hover:text-white transition">Jet Lag</Link></li>
                  <li><Link href="/blog?tag=wellness" className="hover:text-white transition">Wellness</Link></li>
                  <li><Link href="/blog?tag=city-guides" className="hover:text-white transition">City Guides</Link></li>
                  <li><Link href="/blog?tag=gear" className="hover:text-white transition">Travel Gear</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 TravelWell. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
