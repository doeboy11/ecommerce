'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">LUXE</h3>
            <p className="text-sm opacity-90">
              Curated luxury fashion for the modern lifestyle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/women" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop/men" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop/kids" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm opacity-90">
                <Mail className="w-4 h-4" />
                hello@luxe.com
              </li>
              <li className="flex items-center gap-2 text-sm opacity-90">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-sm opacity-90">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Fashion Ave, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-90">
            &copy; 2024 LUXE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
