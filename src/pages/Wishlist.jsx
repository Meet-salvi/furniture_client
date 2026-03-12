import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist, clearWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { HeartOff, ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Wishlist = () => {
    const { items } = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background dark:bg-dark-bg px-4">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-gray-300 mb-6 relative">
                    <Heart size={80} className="text-gray-200" />
                    <HeartOff size={40} className="absolute -bottom-2 -right-2 text-gray-400" />
                </motion.div>
                <h2 className="text-3xl font-serif text-secondary dark:text-dark-text mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-500 dark:text-dark-muted mb-8 max-w-md text-center">Found something you like? Tap the heart icon on any product to save it here for later.</p>
                <Link to="/shop" className="bg-secondary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary transition-colors">
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-end mb-12">
                    <h1 className="text-4xl font-serif text-secondary dark:text-dark-text">My Wishlist ({items.length})</h1>
                    <button
                        onClick={() => dispatch(clearWishlist())}
                        className="text-gray-500 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 pb-2"
                    >
                        <Trash2 size={16} /> Clear All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col h-full"
                        >
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-dark-surface mb-4">
                                <img src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/400x400/eee/333?text=No+Image'} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                                <button
                                    onClick={() => dispatch(toggleWishlist(item))}
                                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-white hover:text-red-600 transition-colors shadow-sm"
                                >
                                    <Heart size={18} fill="currentColor" />
                                </button>
                            </div>

                            <div className="flex-grow">
                                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{item.category?.name || item.category || 'Category'}</p>
                                <h3 className="text-lg font-serif text-secondary dark:text-dark-text mb-2 truncate">
                                    <Link to={`/product/${item._id}`} className="hover:text-primary transition-colors">{item.name}</Link>
                                </h3>
                                <div className="text-secondary dark:text-dark-text font-bold text-lg mb-6">₹{item.price}</div>
                            </div>

                            <button
                                onClick={() => dispatch(addToCart(item))}
                                className="w-full bg-secondary/10 text-secondary py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider group mt-auto"
                            >
                                <ShoppingCart size={16} /> Move to Cart
                            </button>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Wishlist;
