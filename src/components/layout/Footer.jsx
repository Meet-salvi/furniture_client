import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary dark:bg-dark-surface text-white pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand & Map */}
                    <div className="space-y-6">
                        <span className="text-3xl font-serif font-bold tracking-widest text-primary block">
                            LUMIÈRE
                        </span>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Crafting premium and ergonomic modern furniture to transform your living spaces into inspiring environments.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-serif tracking-wider">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
                            <li><Link to="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-serif tracking-wider">Customer Care</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Options</Link></li>
                            <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link to="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-serif tracking-wider">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-b border-gray-600 px-0 py-2 w-full focus:outline-none focus:border-primary text-sm text-white transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="border-b border-gray-600 group-hover:border-primary text-gray-400 group-hover:text-primary transition-all pb-2 px-2"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Lumière Furniture. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <span>Visa</span>
                        <span>MasterCard</span>
                        <span>PayPal</span>
                        <span>Apple Pay</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
