import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 py-16 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand & Slogan */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-white text-xl font-serif font-bold tracking-widest uppercase mb-6">CN Fragrances</h3>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            Find your signature scent. We offer a curated collection of premium fragrances for men and women, designed to leave a lasting impression.
                        </p>
                    </div>

                    {/* About Section */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">About</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">Our Story</Link>
                            </li>
                            <li>
                                <Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/account" className="hover:text-white transition-colors">My Account</Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="hover:text-white transition-colors">Track Your Order</Link>
                            </li>
                            <li>
                                <Link href="/return-form" className="hover:text-white transition-colors">Return Form</Link>
                            </li>
                            <li>
                                <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Get In Touch Section */}
                    <div>
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Get In Touch</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center space-x-2">
                                <span className="text-gray-400">Phone:</span>
                                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 234 567 890</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-gray-400">Email:</span>
                                <a href="mailto:support@cnfragrances.com" className="hover:text-white transition-colors">support@cnfragrances.com</a>
                            </li>
                        </ul>

                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mt-8 mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                Facebook
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                Instagram
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                TikTok
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} CN Fragrances. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-4">
                        <span className="text-xs text-gray-500">Secure Checkout with Cash on Delivery</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
