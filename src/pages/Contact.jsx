import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import BASE_URL from '../api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            await axios.post(`${BASE_URL}/api/contact`, formData, config);

            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
        }
    };

    const whatsappNumber = "917043743687"; // User's WhatsApp number with country code
    const whatsappMessage = "Hello LUMIÈRE! I'm interested in your furniture collections.";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary dark:text-dark-text mb-6">
                        Get In Touch
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
                        Whether you're looking for custom furniture, need support with an existing order, or just want to say hello, we'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information & WhatsApp */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border">
                            <h2 className="text-2xl font-bold text-secondary dark:text-dark-text mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-dark-text text-lg">Our Showroom</h3>
                                        <p className="text-gray-600 dark:text-dark-muted mt-1">Sarkhej-Gandhinagar Highway<br />Ahmedabad, Gujarat 380015, India</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-dark-text text-lg">Call Us</h3>
                                        <p className="text-gray-600 dark:text-dark-muted mt-1">+91 7043743687<br />Mon-Sat 10am to 7pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-dark-text text-lg">Email Us</h3>
                                        <p className="text-gray-600 dark:text-dark-muted mt-1">info@lumiere-furniture.com<br />support@lumiere-furniture.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct WhatsApp Chat Widget */}
                        <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border bg-gradient-to-br from-[#25D366]/5 to-[#128C7E]/10 dark:from-[#25D366]/10 dark:to-[#128C7E]/20">
                            <h2 className="text-2xl font-bold text-secondary dark:text-dark-text mb-4 flex items-center gap-2">
                                <MessageCircle className="text-[#25D366]" size={28} />
                                Direct Support
                            </h2>
                            <p className="text-gray-600 dark:text-dark-muted mb-6">
                                Need an immediate response? Chat with our support team directly on WhatsApp for real-time assistance.
                            </p>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-md w-full sm:w-auto"
                            >
                                <MessageCircle size={20} />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white dark:bg-dark-card p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border"
                    >
                        <h2 className="text-2xl font-bold text-secondary dark:text-dark-text mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-md"
                            >
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Google Map */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 w-full h-[400px] bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-dark-border"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117506.26250212886!2d72.484224!3d23.0204978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2s!4v1715694829375!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Store Location"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
