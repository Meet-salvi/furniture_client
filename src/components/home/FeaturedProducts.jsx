import { useEffect } from 'react';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';

const FeaturedProducts = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector(state => state.products);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const displayProducts = products.slice(0, 4);

    return (
        <section className="py-24 bg-white dark:bg-dark-bg relative transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="max-w-xl">
                        <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Curated Collection</p>
                        <h2 className="text-4xl font-serif text-secondary dark:text-dark-text font-medium tracking-tight">
                            Featured Best Sellers
                        </h2>
                    </div>
                    <Link to="/shop" className="group flex items-center text-secondary dark:text-dark-text font-medium mt-6 md:mt-0 hover:text-primary transition-colors">
                        View All Products
                        <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {loading && displayProducts.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-gray-500">Loading featured products...</div>
                    ) : (
                        displayProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-card mb-6">
                                    <img
                                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/400x500/eee/333?text=No+Image'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

                                    {/* Overlay actions */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex justify-center gap-3">
                                        <button
                                            onClick={() => dispatch(toggleWishlist(product))}
                                            className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-colors shadow-lg"
                                        >
                                            <Heart size={20} />
                                        </button>
                                        <button
                                            onClick={() => dispatch(addToCart(product))}
                                            className="w-12 h-12 bg-secondary/90 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors shadow-lg"
                                        >
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-gray-500 dark:text-dark-muted text-sm uppercase tracking-wider mb-2">{product.category?.name || product.category || 'Category'}</p>
                                    <h3 className="text-lg font-serif text-secondary dark:text-dark-text group-hover:text-primary transition-colors mb-2">
                                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                                    </h3>
                                    <p className="text-secondary dark:text-dark-text font-semibold text-lg">₹{product.price}</p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

            </div>
        </section >
    );
};

export default FeaturedProducts;
