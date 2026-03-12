import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Heart, Search, SlidersHorizontal, ChevronDown, Scale } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCompare } from '../redux/slices/compareSlice';

const Shop = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Sync URL search param with local state
    useEffect(() => {
        const urlSearch = searchParams.get('search');
        if (urlSearch) {
            setSearchQuery(urlSearch);
        }
    }, [searchParams]);

    // Derived state for filtering
    const filteredProducts = products.filter(p =>
        (categoryFilter === 'All' || p.category?.name === categoryFilter || p.category === categoryFilter) &&
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = ['All', 'Chairs', 'Sofas', 'Tables', 'Beds', 'Decor'];

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-primary font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">{error}</div>;
    }

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-secondary dark:text-dark-text mb-4">Our Collection</h1>
                    <p className="text-gray-600 dark:text-dark-muted max-w-xl">
                        Discover piece that perfectly fits your space. Browse our exclusive collection
                        of premium quality furniture, designed for modern living.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search furniture..."
                            className="w-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-full py-3 pl-12 pr-4 text-sm text-secondary dark:text-dark-text focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-dark-muted mr-2">
                            <SlidersHorizontal size={18} className="mr-2" /> Filters
                        </div>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-colors border ${categoryFilter === cat
                                    ? 'bg-secondary dark:bg-primary text-white border-secondary dark:border-primary'
                                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted border-gray-200 dark:border-dark-border hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}

                        <div className="relative ml-4 group">
                            <button className="flex items-center gap-2 px-5 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-full text-sm text-gray-600 dark:text-dark-muted hover:border-primary hover:text-primary transition-colors">
                                Sort By <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
                        <p className="text-gray-500 dark:text-dark-muted">No products found for your search.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}
                            className="mt-4 text-primary font-medium hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="group bg-white dark:bg-dark-card p-4 rounded-2xl border border-gray-100 dark:border-dark-border hover:shadow-xl hover:border-transparent transition-all duration-300"
                            >
                                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-dark-surface mb-4">
                                    <img
                                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400?text=No+Image'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out bg-white"
                                    />
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <button
                                            onClick={() => dispatch(addToCompare(product))}
                                            title="Compare"
                                            className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white transition-colors shadow-sm"
                                        >
                                            <Scale size={18} />
                                        </button>
                                        <button
                                            onClick={() => dispatch(toggleWishlist(product))}
                                            title="Wishlist"
                                            className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white transition-colors shadow-sm"
                                        >
                                            <Heart size={18} />
                                        </button>
                                    </div>
                                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <button
                                            onClick={() => dispatch(addToCart(product))}
                                            className="w-full bg-secondary/90 backdrop-blur text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary transition-colors shadow-lg text-sm font-medium"
                                        >
                                            <ShoppingCart size={16} /> Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-xs text-primary font-bold uppercase tracking-wider">{product.category?.name || product.category || 'Category'}</p>
                                        <div className="flex items-center text-xs text-yellow-500 font-medium">
                                            ★ {product.rating || 0}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-serif text-secondary dark:text-dark-text mb-1 truncate">
                                        <Link to={`/product/${product._id}`} className="hover:text-primary transition-colors">
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <div className="flex justify-between items-center mt-3">
                                        <p className="text-secondary dark:text-dark-text font-bold text-lg">₹{product.price}</p>
                                        <p className="text-xs text-gray-400 dark:text-dark-muted">{product.material}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Shop;
