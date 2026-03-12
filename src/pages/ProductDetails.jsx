import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { fetchProductDetails, clearProductDetails } from '../redux/slices/productSlice';
import { Star, Truck, ShieldCheck, Heart, ShoppingCart, Minus, Plus, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productDetails: product, items: allProducts, loading, error } = useSelector((state) => state.products);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [isZoomed, setIsZoomed] = useState(false);

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);

    useEffect(() => {
        dispatch(fetchProductDetails(id));
        return () => {
            dispatch(clearProductDetails());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setMainImage(product.images[0]);
        }
        if (product && product.color && product.color.length > 0) {
            setSelectedColor(product.color[0]);
        }
    }, [product]);

    if (loading) return <div className="py-32 text-center text-primary font-bold">Loading...</div>;
    if (error) return <div className="py-32 text-center text-red-500 font-bold">{error}</div>;
    if (!product) return <div className="py-32 text-center text-secondary font-serif text-2xl">Product not found</div>;

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity, selectedColor }));
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return toast.error("Please log in to leave a review.");
        if (reviewText.trim() === '') return toast.error("Review comment cannot be empty.");

        try {
            await axios.post('http://localhost:5000/api/reviews', {
                productId: product._id,
                rating: reviewRating,
                comment: reviewText
            }, { withCredentials: true });

            toast.success("Review submitted successfully!");
            setReviewText('');
            setReviewRating(5);
            dispatch(fetchProductDetails(id)); // Refresh product to show the new review
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit review");
        }
    };

    const relatedProducts = allProducts.filter(p =>
        p._id !== product._id &&
        (p.category?._id === product.category?._id || p.category === product.category)
    ).slice(0, 4);

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <nav className="text-sm font-medium text-gray-500 dark:text-dark-muted mb-8 border-b border-gray-100 dark:border-dark-border pb-4">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <span className="mx-2">/</span>
                    <span className="text-secondary dark:text-dark-text">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Images Column */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                            className={`aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border relative group cursor-zoom-in ${isZoomed ? 'fixed inset-0 z-50 bg-black/90 p-10 flex items-center justify-center cursor-zoom-out' : ''}`}
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <img src={mainImage} alt={product.name} className={`w-full h-full object-contain ${isZoomed ? 'max-w-4xl max-h-full' : 'object-cover'}`} />
                            {!isZoomed && (
                                <div className="absolute top-4 right-4 z-10">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(product)); }}
                                        className="w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors shadow-sm"
                                    >
                                        <Heart size={24} />
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images?.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <p className="text-primary font-bold tracking-widest text-sm uppercase mb-2">{product.category?.name || product.category || 'Category'}</p>
                        <h1 className="text-4xl lg:text-5xl font-serif text-secondary dark:text-dark-text mb-4 leading-tight">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-3xl font-bold text-secondary dark:text-dark-text">₹{product.price}</div>
                            <div className="flex items-center text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1 rounded-md text-sm font-medium">
                                <Star size={16} fill="currentColor" className="mr-1" />
                                {product.rating} ({product.numReviews} reviews)
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-dark-muted leading-relaxed mb-8">{product.description}</p>

                        {/* Options */}
                        <div className="space-y-6 mb-10 pb-10 border-b border-gray-100 dark:border-dark-border">
                            <div>
                                <h3 className="text-sm font-bold text-secondary dark:text-dark-text uppercase tracking-wider mb-4">Color: <span className="text-gray-500 dark:text-dark-muted font-normal">{selectedColor}</span></h3>
                                <div className="flex gap-3">
                                    {product.color?.map((c, index) => (
                                        <button
                                            key={c}
                                            onClick={() => {
                                                setSelectedColor(c);
                                                // Sync image with color index
                                                if (product.images && product.images[index]) {
                                                    setMainImage(product.images[index]);
                                                }
                                            }}
                                            className={`px-6 py-3 rounded-xl border text-sm font-medium transition-colors ${selectedColor === c ? 'bg-secondary dark:bg-primary text-white border-secondary dark:border-primary' : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted border-gray-200 dark:border-dark-border hover:border-primary'
                                                }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-secondary dark:text-dark-text uppercase tracking-wider mb-4">Quantity</h3>
                                <div className="flex items-center w-36 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                                        <Minus size={18} />
                                    </button>
                                    <input type="number" readOnly value={quantity} className="w-12 h-12 bg-transparent text-center text-secondary dark:text-dark-text font-bold focus:outline-none" />
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex gap-4 mb-10">
                            <button
                                onClick={handleAddToCart}
                                className="flex-[2] bg-secondary text-white py-5 rounded-2xl font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-primary transition-colors shadow-xl shadow-secondary/20"
                            >
                                <ShoppingCart size={20} /> Add to Cart — ₹{(product.price * quantity).toFixed(2)}
                            </button>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-6 bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-muted">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <Truck size={18} />
                                </div>
                                <span className="font-medium">Free Global Shipping</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-muted">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <ShieldCheck size={18} />
                                </div>
                                <span className="font-medium">10 Year Warranty</span>
                            </div>
                        </div>

                    </motion.div>
                </div>

                {/* Product Reviews */}
                <div className="mt-24 max-w-4xl">
                    <h2 className="text-2xl font-serif text-secondary dark:text-dark-text mb-8 pb-4 border-b border-gray-200 dark:border-dark-border">Customer Reviews</h2>

                    {/* Add Review Form */}
                    <div className="mb-10 bg-white dark:bg-dark-card p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                        <h3 className="text-lg font-bold text-secondary dark:text-dark-text mb-4">Write a Review</h3>
                        <form onSubmit={submitReview} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-2">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={28}
                                                className={`transition-colors ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-2">Your Review</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your thoughts about this product..."
                                    className="w-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-secondary dark:text-dark-text rounded-xl p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-secondary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-black transition-colors"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>

                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-6">
                            {(product.reviews || []).map(review => (
                                <div key={review.id || review._id} className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-50 dark:border-dark-border shadow-sm flex flex-col md:flex-row items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-bold text-lg">
                                        {review.user?.name ? review.user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-bold text-secondary dark:text-dark-text">{review.user?.name || 'Customer'}</h4>
                                            <div className="flex text-yellow-500">
                                                {[...Array(review.rating || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-dark-muted leading-relaxed text-sm">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-dark-muted italic bg-gray-50 dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-dark-border">No reviews yet for this product. Be the first to review!</p>
                    )}
                </div>

                {/* AI Smart Recommendations / Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 border-t border-gray-200 dark:border-dark-border pt-16">
                        <p className="text-primary font-bold tracking-widest text-sm uppercase mb-2">Smart Picks</p>
                        <h2 className="text-3xl font-serif text-secondary dark:text-dark-text mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(related => (
                                <div key={related._id} className="group cursor-pointer">
                                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-dark-card mb-4 border border-gray-100 dark:border-dark-border relative">
                                        <img
                                            src={related.images && related.images.length > 0 ? related.images[0] : 'https://placehold.co/400?text=No+Image'}
                                            alt={related.name}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 bg-white"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to={`/product/${related._id}`} className="bg-white text-secondary px-6 py-3 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-serif text-secondary dark:text-dark-text mb-1 truncate group-hover:text-primary transition-colors">{related.name}</h3>
                                    <p className="text-gray-900 dark:text-dark-text font-bold">₹{related.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;
