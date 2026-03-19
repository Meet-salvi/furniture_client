import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-dark-bg">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
            >
                <div className="w-24 h-24 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-secondary dark:text-dark-text font-serif text-xl font-bold">L</span>
                </div>
            </motion.div>
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-2xl font-serif text-secondary dark:text-dark-text tracking-widest font-medium"
            >
                LUMIÈRE
            </motion.h2>
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                className="w-48 h-0.5 bg-primary/20 mt-4 overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-primary animate-progress-line origin-left"></div>
            </motion.div>
        </div>
    );
};

export default Preloader;
