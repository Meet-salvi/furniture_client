import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';

const Collections = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: products } = useSelector((state) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    // Use dynamic top 4 ranked/first fetched products
    const dynamicBestSellers = products && products.length > 0
        ? [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
        : [];

    const featuredCollections = [
        {
            id: 1,
            title: "Minimalist Living",
            description: "Clean lines and understated elegance for the modern home.",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop",
            link: "/shop?category=living",
            items: 24
        },
        {
            id: 2,
            title: "Nordic Bedroom",
            description: "Cozy textures and warm wood tones for perfect rest.",
            image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2000&auto=format&fit=crop",
            link: "/shop?category=bedroom",
            items: 18
        },
        {
            id: 3,
            title: "Luxe Dining",
            description: "Create memorable dining experiences with our premium sets.",
            image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=2000&auto=format&fit=crop",
            link: "/shop?category=dining",
            items: 12
        }
    ];



    const seasonalHighlight = {
        title: "The Spring 2026 Collection",
        subtitle: "Embrace the light",
        description: "Refresh your space with our newest arrivals. Featuring organic shapes, lighter wood finishes, and breathable fabrics designed to bring the freshness of spring indoors.",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2000&auto=format&fit=crop"
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">

            {/* Page Header */}
            <div className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary uppercase tracking-widest text-sm font-semibold mb-4 block">
                        Curated Spaces
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary dark:text-dark-text mb-6">
                        Explore Our Collections
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-dark-muted font-light leading-relaxed">
                        Discover thoughtfully curated aesthetics designed to transform your house into a haven.
                        From minimalist modern to cozy rustic, find the perfect pieces that speak to your style.
                    </p>
                </motion.div>
            </div>

            {/* Curated Collections Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Featured Large */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-8 relative rounded-sm overflow-hidden group h-[500px] lg:h-[600px]"
                    >
                        <img
                            src={featuredCollections[0].image}
                            alt={featuredCollections[0].title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                            <span className="bg-white dark:bg-dark-surface text-secondary dark:text-dark-text text-xs uppercase tracking-widest px-3 py-1 mb-4 inline-block font-semibold">
                                {featuredCollections[0].items} Items
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">{featuredCollections[0].title}</h2>
                            <p className="text-gray-200 mb-6 max-w-md">{featuredCollections[0].description}</p>
                            <Link to={featuredCollections[0].link} className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-primary hover:border-primary transition-colors uppercase text-sm tracking-widest">
                                Explore <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Side Small Columns */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {featuredCollections.slice(1).map((collection, index) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="relative rounded-sm overflow-hidden group flex-1 min-h-[250px] lg:min-h-0"
                            >
                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                    <h3 className="text-2xl font-serif text-white mb-2">{collection.title}</h3>
                                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">{collection.description}</p>
                                    <Link to={collection.link} className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors text-sm font-medium">
                                        Shop Now <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seasonal Highlight banner (New Arrivals) */}
            <section className="bg-[#F9F9F7] dark:bg-dark-surface py-20 md:py-32 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                                <TrendingUp size={16} /> New Arrivals
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-secondary dark:text-dark-text mb-4 leading-tight">
                                {seasonalHighlight.title}
                            </h2>
                            <p className="text-xl text-gray-400 dark:text-dark-muted italic font-serif mb-6">{seasonalHighlight.subtitle}</p>
                            <p className="text-gray-600 dark:text-dark-muted/80 font-light leading-relaxed mb-8 text-lg">
                                {seasonalHighlight.description}
                            </p>
                            <Link to="/shop?sort=newest" className="inline-block bg-secondary dark:bg-primary text-white hover:bg-black dark:hover:bg-primary/80 px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300">
                                Shop The Lookbook
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="aspect-[4/3] rounded-sm overflow-hidden">
                                <img
                                    src={seasonalHighlight.image}
                                    alt="Spring Collection"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Accent square */}
                            <div className="hidden md:block absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-primary/40 z-[-1]"></div>
                            <div className="hidden md:block absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-primary/40 z-[-1]"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-semibold tracking-widest uppercase text-sm mb-2">
                            <Award size={18} /> Most Loved
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-secondary dark:text-dark-text">Our Best Sellers</h2>
                    </div>
                    <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-secondary dark:text-dark-text hover:text-primary transition-colors border-b border-secondary dark:border-dark-text hover:border-primary pb-1 font-medium mt-4 md:mt-0">
                        View All Products <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dynamicBestSellers.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-gray-100 dark:bg-dark-surface">
                                <img
                                    src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400?text=No+Image'}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 bg-white"
                                />
                                <div className="absolute top-4 left-4 bg-[#B5A48B] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                                    Best Buy
                                </div>
                                {/* Hover Add to Cart Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="w-full bg-secondary dark:bg-primary text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-black dark:hover:bg-primary/80 transition-colors shadow-lg">
                                        Quick View
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-gray-500 dark:text-dark-muted uppercase tracking-wider mb-1">{product.category?.name || product.category || 'Furniture'}</div>
                                <h3 className="text-lg font-serif text-secondary dark:text-dark-text mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-900 dark:text-dark-text">₹{product.price}</span>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-dark-muted">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span>{product.rating || 0}</span>
                                        <span>({product.numReviews || 0})</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-10 text-center md:hidden">
                    <Link to="/shop" className="inline-flex items-center gap-2 text-secondary dark:text-dark-text border-b border-secondary dark:border-dark-text pb-1 font-medium uppercase text-sm tracking-widest">
                        View All Products <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Collections;
