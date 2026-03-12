import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative h-screen bg-[#F0EEEB] dark:bg-dark-bg overflow-hidden transition-colors duration-300">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#E5E0D8] dark:bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-[#dfd6c8] dark:bg-primary/5 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-10 right-1/4 w-[600px] h-[600px] bg-[#EBE7DF] dark:bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="inline-block">
                            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase backdrop-blur-sm border border-primary/20 dark:border-primary/30">
                                New Collection 2026
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif text-secondary dark:text-dark-text leading-[1.1] font-medium tracking-tight">
                            Elegance <br />
                            <span className="italic text-primary font-light">Everywhere.</span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-dark-muted max-w-md font-light leading-relaxed">
                            Discover unparalleled craftsmanship and timeless design. Elevate your living spaces with pieces that inspire comfort and creativity every single day.
                        </p>

                        <div className="flex items-center space-x-6 pt-4">
                            <Link to="/shop">
                                <button className="bg-secondary dark:bg-primary text-white px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase hover:bg-primary dark:hover:bg-primary/80 transition-colors duration-300 shadow-xl shadow-secondary/20 dark:shadow-primary/20 flex items-center gap-2 group">
                                    Explore Now
                                    <span className="block transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                                        →
                                    </span>
                                </button>
                            </Link>
                            <Link to="/about">
                                <button className="text-secondary dark:text-dark-text px-6 py-4 rounded-full text-sm font-medium tracking-wider uppercase border border-secondary/20 dark:border-dark-border hover:border-secondary dark:hover:border-primary transition-colors duration-300">
                                    Our Story
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative w-full aspect-[4/5] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000"
                                alt="Premium Sofa"
                                className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            {/* Decorative border */}
                            <div className="absolute inset-0 border border-white/20 rounded-2xl z-20 pointer-events-none"></div>
                        </div>

                        {/* Floating glass card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="absolute -bottom-10 -left-10 bg-white/60 dark:bg-dark-surface/80 backdrop-blur-xl border border-white/40 dark:border-dark-border p-6 rounded-2xl shadow-xl z-30 w-64"
                        >
                            <p className="text-sm text-gray-500 dark:text-dark-muted uppercase tracking-widest mb-1 font-semibold">Featured</p>
                            <p className="text-lg font-serif text-secondary dark:text-dark-text font-bold mb-2">Nordic Lounge Chair</p>
                            <div className="flex justify-between items-center">
                                <span className="text-primary font-bold">₹99,999</span>
                                <Link to="/shop" className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium hover:bg-primary hover:text-white transition-colors">
                                    View Item
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;
