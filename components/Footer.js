import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white mt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-gray-400">Your one-stop shop for everything you need.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Shipping Policy</li>
                <li>Returns & Exchanges</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Shop</li>
                <li>Categories</li>
                <li>Deals</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="bg-gray-700 border-gray-600" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
