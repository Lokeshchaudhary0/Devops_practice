import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-medium mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-light">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary-light">Careers</Link></li>
              <li><Link to="/press" className="hover:text-primary-light">Press Releases</Link></li>
              <li><Link to="/sustainability" className="hover:text-primary-light">Sustainability</Link></li>
              <li><Link to="/corporate-information" className="hover:text-primary-light">Corporate Information</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-medium mb-4">HELP</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/payments" className="hover:text-primary-light">Payments</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-light">Shipping</Link></li>
              <li><Link to="/cancellation" className="hover:text-primary-light">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-primary-light">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary-light">Contact Us</Link></li>
            </ul>
          </div>

          {/* Consumer Policy */}
          <div>
            <h3 className="text-white font-medium mb-4">CONSUMER POLICY</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-primary-light">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-light">Privacy</Link></li>
              <li><Link to="/security" className="hover:text-primary-light">Security</Link></li>
              <li><Link to="/sitemap" className="hover:text-primary-light">Sitemap</Link></li>
              <li><Link to="/grievance" className="hover:text-primary-light">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-medium mb-4">CONTACT US</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail size={16} className="mr-2 mt-1 text-primary-light" />
                <span>support@flipkart-clone.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="mr-2 mt-1 text-primary-light" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-primary-light" />
                <span>123 Commerce St, Bangalore, India</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-3">
              <a href="#" className="text-neutral-400 hover:text-primary-light">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-light">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-light">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-light">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-xs">
              <p>&copy; 2025 Flipkart Clone. All Rights Reserved.</p>
              <p className="mt-1">This is a demo project for educational purposes only. Not affiliated with Flipkart.</p>
            </div>
            <div className="flex justify-start md:justify-end space-x-4">
              <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" 
                alt="Payment Methods" 
                className="h-6" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;