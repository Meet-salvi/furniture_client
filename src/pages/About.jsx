import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Clock, Award, Leaf, Users } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <ShieldCheck size={28} className="text-secondary" />,
            title: "Premium Quality",
            description: "We source only the finest materials to create furniture that lasts generations."
        },
        {
            icon: <Truck size={28} className="text-secondary" />,
            title: "Fast Delivery",
            description: "Our dedicated logistics team ensures your pieces arrive in perfect condition."
        },
        {
            icon: <Clock size={28} className="text-secondary" />,
            title: "24/7 Support",
            description: "Our customer service team is always ready to assist you with any inquiries."
        },
        {
            icon: <Award size={28} className="text-secondary" />,
            title: "Award Winning Design",
            description: "Recognized globally for our innovative and timeless furniture designs."
        },
        {
            icon: <Leaf size={28} className="text-secondary" />,
            title: "Eco-Friendly",
            description: "Sustainable practices and environmentally friendly materials in every piece."
        },
        {
            icon: <Users size={28} className="text-secondary" />,
            title: "Expert Craftsmanship",
            description: "Our artisans possess decades of experience in fine furniture making."
        }
    ];

    const stats = [
        { number: "25+", label: "Years Experience" },
        { number: "10k+", label: "Happy Clients" },
        { number: "50+", label: "Design Awards" },
        { number: "100%", label: "Satisfaction" }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
            {/* Hero Section with Background Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
                        alt="Elegantly designed living room"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16"
                >
                    <span className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base mb-4 block font-medium">
                        Welcome to Lumière
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        Crafting Timeless <br /><span className="italic font-light">Elegance</span>
                    </h1>
                </motion.div>
            </div>

            {/* Our Story Section - Split Layout */}
            <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                            <img
                                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop"
                                alt="Minimalist luxury chair"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="hidden md:block absolute -bottom-8 -right-8 w-2/3 h-2/3 border-r-2 border-b-2 border-primary/30 z-[-1]"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <span className="text-primary uppercase tracking-widest text-sm font-semibold mb-4 block">
                            Our Heritage
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-secondary dark:text-dark-text mb-8 leading-tight">
                            A passion for <span className="italic text-gray-500 dark:text-dark-muted">design</span> & uncompromising quality
                        </h2>

                        <div className="space-y-6 text-gray-600 dark:text-dark-muted font-light leading-relaxed text-lg">
                            <p>
                                What started as a small workshop with a passion for woodworking has evolved into a premier destination for luxury home furnishings. We collaborate with visionary designers and master craftsmen globally to bring you collections that define modern elegance.
                            </p>
                            <p>
                                At LUMIÈRE, we believe that your living space should be a reflection of your unique style. Since our inception, we have been dedicated to curating exquisite furniture pieces that seamlessly blend captivating aesthetic appeal with everyday comfort.
                            </p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-dark-border flex items-center gap-6 text-secondary dark:text-dark-text font-serif italic text-xl">
                            "Furniture should always be comfortable. And always beautiful."
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="bg-secondary dark:bg-dark-surface text-white py-16 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="px-4"
                            >
                                <div className="text-4xl md:text-5xl font-serif font-light mb-2">{stat.number}</div>
                                <div className="text-sm uppercase tracking-widest text-white/60">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features/Values Section */}
            <section className="py-20 md:py-32 bg-[#F9F9F7] dark:bg-dark-bg transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-primary uppercase tracking-widest text-sm font-semibold mb-4 block">
                            Our Values
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-secondary dark:text-dark-text">
                            The Lumière Difference
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white dark:bg-dark-card p-10 rounded-sm hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-[#F9F9F7] dark:bg-dark-surface rounded-full justify-center items-center flex mb-8 group-hover:bg-primary/5 transition-colors">
                                    {React.isValidElement(feature.icon)
                                        ? React.cloneElement(feature.icon, { className: 'text-secondary dark:text-dark-text' })
                                        : feature.icon}
                                </div>
                                <h3 className="text-xl font-serif text-secondary dark:text-dark-text mb-4">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-dark-muted font-light leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Banner */}
            <section className="py-24 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000&auto=format&fit=crop"
                        alt="Minimalist Architecture"
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-serif text-secondary dark:text-dark-text mb-8 leading-tight">
                        Transform your house into a <span className="italic">home</span>.
                    </h2>
                    <a href="/shop" className="inline-block border-2 border-secondary dark:border-dark-text text-secondary dark:text-dark-text hover:bg-secondary dark:hover:bg-primary hover:text-white dark:hover:text-white px-10 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300">
                        Explore Collections
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
