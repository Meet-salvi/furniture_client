import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';

const Cart = () => {
    const { items, totalPrice, totalQuantity } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleQuantityChange = (id, currentQty, amount) => {
        const newQty = currentQty + amount;
        if (newQty > 0) {
            dispatch(updateQuantity({ id, quantity: newQty }));
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background dark:bg-dark-bg px-4 transition-colors duration-300">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-gray-300 mb-6">
                    <ShoppingBag size={80} />
                </motion.div>
                <h2 className="text-3xl font-serif text-secondary dark:text-dark-text mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 dark:text-dark-muted mb-8 max-w-md text-center">Looks like you haven't added any products yet. Browse our collection to find your perfect piece.</p>
                <Link to="/shop" className="bg-secondary text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-primary transition-colors flex items-center gap-2">
                    Start Shopping <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-4xl font-serif text-secondary dark:text-dark-text mb-12">Shopping Cart ({totalQuantity} items)</h1>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Cart Items List */}
                    <div className="flex-[2] space-y-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={`${item._id}-${index}`}
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-dark-card p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-dark-border flex flex-col sm:flex-row items-center gap-6 shadow-sm relative group"
                            >
                                <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-dark-surface flex-shrink-0">
                                    <img src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/400x400/eee/333?text=No+Image'} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Details */}
                                <div className="flex-grow text-center sm:text-left">
                                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{item.category?.name || item.category || 'Category'}</p>
                                    <h3 className="text-lg font-serif text-secondary dark:text-dark-text font-bold mb-2">
                                        <Link to={`/product/${item._id}`} className="hover:text-primary transition-colors">{item.name}</Link>
                                    </h3>
                                    {item.selectedColor && <p className="text-gray-500 dark:text-dark-muted text-sm mb-4">Color: {item.selectedColor}</p>}
                                </div>

                                {/* Price & Quantity Controls */}
                                <div className="flex flex-row sm:flex-col items-center gap-6 sm:gap-4 w-full sm:w-auto justify-between sm:justify-center">
                                    <p className="text-secondary dark:text-dark-text font-bold text-lg sm:text-right w-full">₹{(item.price * item.quantity).toFixed(2)}</p>

                                    <div className="flex items-center bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden shrink-0">
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <input type="number" readOnly value={item.quantity} className="w-10 h-10 bg-transparent text-center text-secondary dark:text-dark-text font-bold text-sm focus:outline-none" />
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => dispatch(removeFromCart(item._id))}
                                    className="sm:absolute sm:top-6 sm:right-6 text-gray-300 hover:text-red-500 transition-colors bg-gray-50 sm:bg-transparent rounded-full p-2 w-full sm:w-auto mt-4 sm:mt-0 flex items-center justify-center gap-2 sm:gap-0 font-medium sm:opacity-0 sm:group-hover:opacity-100"
                                >
                                    <Trash2 size={20} /> <span className="sm:hidden text-sm">Remove Item</span>
                                </button>
                            </motion.div>
                        ))}

                        <button
                            onClick={() => dispatch(clearCart())}
                            className="text-gray-500 text-sm font-medium hover:text-primary transition-colors flex items-center mt-6"
                        >
                            Clear entire cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        className="flex-1 bg-white dark:bg-dark-card p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-xl shadow-secondary/5 self-start sticky top-28"
                    >
                        <h2 className="text-2xl font-serif text-secondary dark:text-dark-text mb-8 pb-4 border-b border-gray-100 dark:border-dark-border">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-gray-600 dark:text-dark-muted">
                                <span>Subtotal ({totalQuantity} items)</span>
                                <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-dark-muted">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-dark-muted pb-6 border-b border-gray-100 dark:border-dark-border">
                                <span>Tax</span>
                                <span>Calculated at checkout</span>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg font-bold text-secondary dark:text-dark-text">Total</span>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-primary">₹{totalPrice.toFixed(2)}</span>
                                    <p className="text-xs text-gray-400 dark:text-dark-muted mt-1">including VAT</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full bg-secondary text-white py-5 rounded-2xl font-bold uppercase tracking-wider hover:bg-primary transition-colors shadow-lg hover:shadow-xl shadow-secondary/20 flex justify-center items-center gap-2 group"
                        >
                            Proceed to Checkout <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 dark:text-dark-muted text-sm">
                            <span>Secure Checkout</span>
                            <span>•</span>
                            <span>Free Returns</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
