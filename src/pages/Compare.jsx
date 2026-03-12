import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Cross, X } from 'lucide-react';
import { removeFromCompare, clearCompare } from '../redux/slices/compareSlice';
import { addToCart } from '../redux/slices/cartSlice';

const Compare = () => {
    const { items } = useSelector(state => state.compare);
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background dark:bg-dark-bg px-4">
                <h2 className="text-3xl font-serif text-secondary mb-4">Nothing to Compare</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">You haven't added any products to compare yet. Add up to 4 products to see them side-by-side.</p>
                <Link to="/shop" className="bg-secondary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary transition-colors">
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto pb-4">

                <div className="flex justify-between items-end mb-12 min-w-max">
                    <h1 className="text-4xl font-serif text-secondary">Compare Products</h1>
                    <button
                        onClick={() => dispatch(clearCompare())}
                        className="text-gray-500 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 pb-2"
                    >
                        <Trash2 size={16} /> Clear All
                    </button>
                </div>

                <div className="flex gap-8 min-w-max">
                    {/* Feature Sidebar */}
                    <div className="w-48 flex-shrink-0 border-r border-gray-200">
                        <div className="h-64 border-b border-gray-100 mb-6"></div> {/* Empty space for images */}
                        <div className="space-y-6 text-sm font-bold text-gray-500 uppercase tracking-wider pr-4">
                            <div className="h-12 flex items-center border-b border-gray-100">Price</div>
                            <div className="h-12 flex items-center border-b border-gray-100">Rating</div>
                            <div className="h-12 flex items-center border-b border-gray-100">Material</div>
                            <div className="h-12 flex items-center border-b border-gray-100">Colors Available</div>
                            <div className="h-12 flex items-center border-b border-gray-100">Action</div>
                        </div>
                    </div>

                    {/* Compare Cards */}
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="w-72 flex-shrink-0 relative group"
                        >
                            <button
                                onClick={() => dispatch(removeFromCompare(item._id))}
                                className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-sm z-10 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                            >
                                <X size={14} />
                            </button>

                            <div className="h-64 flex flex-col mb-6 border-b border-gray-100 pb-4">
                                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg font-serif text-secondary font-bold text-center truncate">{item.name}</h3>
                            </div>

                            <div className="space-y-6 text-sm text-secondary text-center">
                                <div className="h-12 flex items-center justify-center font-bold text-lg border-b border-gray-100">₹{item.price}</div>
                                <div className="h-12 flex items-center justify-center text-yellow-500 border-b border-gray-100 font-bold">★ {item.rating}</div>
                                <div className="h-12 flex items-center justify-center border-b border-gray-100">{item.material}</div>
                                <div className="h-12 flex items-center justify-center border-b border-gray-100">
                                    <div className="flex justify-center flex-wrap gap-1">
                                        {item.color?.map(c => (
                                            <span key={c} className="bg-gray-100 px-2 py-1 rounded text-xs">{c}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-12 flex items-center justify-center border-b border-gray-100">
                                    <button
                                        onClick={() => dispatch(addToCart(item))}
                                        className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart size={14} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty slots */}
                    {[...Array(Math.max(0, 4 - items.length))].map((_, i) => (
                        <div key={i} className="w-72 flex-shrink-0 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-400 bg-gray-50/50">
                            <Link to="/shop" className="text-sm font-bold uppercase hover:text-primary transition-colors">+ Add Product</Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Compare;
