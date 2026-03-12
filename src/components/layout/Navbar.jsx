import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Heart, User as UserIcon, LogOut, Menu, X, Scale, Search, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { logoutUserThunk } from '../../redux/slices/authSlice';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const cartItems = useSelector(state => state.cart.items);
    const wishlistItems = useSelector(state => state.wishlist.items);
    const compareItems = useSelector(state => state.compare.items);
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const allProducts = useSelector(state => state.products.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleLogout = () => {
        dispatch(logoutUserThunk());
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchOpen(false);
            setIsOpen(false);
        }
    };

    const searchResults = searchQuery.trim().length >= 2
        ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
        : [];

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-border transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-secondary dark:text-dark-text">
                                LUMIÈRE
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-sm font-medium text-gray-600 dark:text-dark-muted hover:text-primary transition-colors uppercase tracking-wider"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Icons */}
                        <div className="hidden lg:flex items-center space-x-5">
                            {/* Search */}
                            <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors" title="Search">
                                <Search size={20} />
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-dark-muted hover:text-primary dark:hover:text-primary transition-all hover:bg-gray-100 dark:hover:bg-dark-card"
                                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                <Sun size={20} className={cn("absolute transition-all duration-300", isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0")} />
                                <Moon size={20} className={cn("absolute transition-all duration-300", isDark ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100")} />
                            </button>

                            {isAuthenticated ? (
                                <div className="flex items-center gap-4 relative group cursor-pointer">
                                    <Link to="/profile" className="text-sm font-medium text-gray-600 dark:text-dark-muted hover:text-primary transition-colors">Hi, {user?.name?.split(' ')[0]}</Link>
                                    <button onClick={handleLogout} title="Logout" className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors">
                                    <UserIcon size={20} />
                                </Link>
                            )}

                            <Link to="/compare" title="Compare Products" className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors relative">
                                <Scale size={20} />
                                {compareItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {compareItems.length}
                                    </span>
                                )}
                            </Link>

                            <Link to="/wishlist" className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors relative">
                                <Heart size={20} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            <Link to="/cart" className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors relative">
                                <ShoppingCart size={20} />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary dark:bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {totalQuantity}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile Icons Row */}
                        <div className="flex lg:hidden items-center gap-3">
                            <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors p-1">
                                <Search size={20} />
                            </button>
                            {/* Mobile Theme Toggle */}
                            <button onClick={toggleTheme} className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors p-1" title="Toggle theme">
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <Link to="/cart" className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors relative p-1">
                                <ShoppingCart size={20} />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-secondary dark:bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {totalQuantity}
                                    </span>
                                )}
                            </Link>
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors focus:outline-none p-1">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={cn(
                "lg:hidden fixed inset-0 z-[60] bg-white dark:bg-dark-bg transition-all duration-300 ease-in-out flex flex-col",
                isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}>
                <div className="flex justify-between items-center h-16 px-4 border-b border-gray-100 dark:border-dark-border flex-shrink-0">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-serif font-bold tracking-wider text-secondary dark:text-dark-text">
                        LUMIÈRE
                    </Link>
                    <button onClick={() => setIsOpen(false)} className="text-gray-600 dark:text-dark-muted hover:text-primary transition-colors p-1">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-secondary dark:text-dark-text hover:text-primary transition-colors uppercase tracking-widest py-4 border-b border-gray-100 dark:border-dark-border"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 space-y-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 text-secondary dark:text-dark-text hover:text-primary transition-colors">
                                    <UserIcon size={22} />
                                    <span className="font-medium">Hi, {user?.name?.split(' ')[0]}</span>
                                </Link>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-3 py-3 text-gray-600 dark:text-dark-muted hover:text-primary transition-colors w-full">
                                    <LogOut size={22} />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 text-secondary dark:text-dark-text hover:text-primary transition-colors">
                                <UserIcon size={22} />
                                <span className="font-medium">Login / Register</span>
                            </Link>
                        )}
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-dark-card hover:bg-primary/10 transition-colors relative">
                            <Heart size={24} className="text-gray-600 dark:text-dark-muted" />
                            <span className="text-xs font-medium text-gray-600 dark:text-dark-muted">Wishlist</span>
                            {wishlistItems.length > 0 && (
                                <span className="absolute top-2 right-2 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/compare" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-dark-card hover:bg-primary/10 transition-colors relative">
                            <Scale size={24} className="text-gray-600 dark:text-dark-muted" />
                            <span className="text-xs font-medium text-gray-600 dark:text-dark-muted">Compare</span>
                            {compareItems.length > 0 && (
                                <span className="absolute top-2 right-2 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {compareItems.length}
                                </span>
                            )}
                        </Link>
                        <Link to="/cart" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-dark-card hover:bg-primary/10 transition-colors relative">
                            <ShoppingCart size={24} className="text-gray-600 dark:text-dark-muted" />
                            <span className="text-xs font-medium text-gray-600 dark:text-dark-muted">Cart</span>
                            {totalQuantity > 0 && (
                                <span className="absolute top-2 right-2 bg-secondary dark:bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-32 px-4" onClick={() => setIsSearchOpen(false)}>
                    <div
                        className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-transparent dark:border-dark-border"
                        onClick={e => e.stopPropagation()}
                    >
                        <form onSubmit={handleSearch} className="flex items-center border-b border-gray-100 dark:border-dark-border">
                            <Search size={20} className="ml-5 text-gray-400 dark:text-dark-muted flex-shrink-0" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search for furniture, chairs, tables..."
                                className="flex-1 px-4 py-5 text-lg text-secondary dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-dark-muted focus:outline-none bg-transparent"
                            />
                            <button type="button" onClick={() => setIsSearchOpen(false)} className="px-5 text-gray-400 dark:text-dark-muted hover:text-secondary dark:hover:text-dark-text transition-colors">
                                <X size={20} />
                            </button>
                        </form>

                        {searchResults.length > 0 && (
                            <div className="max-h-80 overflow-y-auto">
                                {searchResults.map(product => (
                                    <Link
                                        key={product._id}
                                        to={`/product/${product._id}`}
                                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors border-b border-gray-50 dark:border-dark-border last:border-0"
                                    >
                                        <img src={product.images?.[0] || 'https://placehold.co/60x60/eee/333?text=...'} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-dark-card" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-secondary dark:text-dark-text truncate">{product.name}</h4>
                                            <p className="text-sm text-gray-400 dark:text-dark-muted">{product.category?.name || 'Furniture'}</p>
                                        </div>
                                        <span className="font-bold text-secondary dark:text-dark-text flex-shrink-0">₹{product.price}</span>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                            <div className="px-5 py-8 text-center text-gray-400 dark:text-dark-muted">
                                <p className="text-lg mb-1">No products found</p>
                                <p className="text-sm">Try a different search term</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
