import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter = () => {
    return (
        <section className="bg-primary/5 dark:bg-dark-surface py-32 relative overflow-hidden transition-colors duration-300">

            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Join our community</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-secondary dark:text-dark-text mb-6 leading-tight">
                        Design Inspiration, <span className="italic font-light">Delivered.</span>
                    </h2>
                    <p className="text-gray-600 dark:text-dark-muted mb-12 max-w-xl mx-auto text-lg leading-relaxed">
                        Subscribe to our newsletter for exclusive offers, styling tips, and early access to new collections. Experience the art of modern living.
                    </p>

                    <form className="max-w-md mx-auto relative group" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full py-5 px-8 text-gray-700 dark:text-dark-text shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow pl-6 pr-16"
                            required
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 bg-secondary dark:bg-primary text-white w-12 rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary/80 transition-colors hover:shadow-lg shadow-secondary/20"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-6 tracking-wide">
                        By subscribing, you agree to our Privacy Policy and Terms of Service.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default Newsletter;
