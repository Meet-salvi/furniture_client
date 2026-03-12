import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { registerUserThunk, clearError } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => { dispatch(clearError()); }
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUserThunk({ name, email, password }))
            .unwrap()
            .then(() => {
                toast.success('Registration successful! Please login.');
                navigate('/login');
            })
            .catch((err) => {
                toast.error(err || 'Registration failed');
                console.error("Registration failed:", err);
            });
    };

    return (
        <div className="bg-background dark:bg-dark-bg min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-secondary/5 dark:bg-dark-surface/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full"
            >
                <div className="bg-white dark:bg-dark-card rounded-3xl p-8 sm:p-12 shadow-2xl shadow-secondary/10 dark:shadow-black/20 border border-gray-100 dark:border-dark-border transition-colors duration-300">

                    <div className="text-center mb-10">
                        <span className="text-sm font-bold tracking-widest text-primary uppercase mb-2 block">Join Lumière</span>
                        <h2 className="text-3xl font-serif text-secondary dark:text-dark-text mb-2">Create your account</h2>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-dark-muted group-focus-within:text-primary transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-secondary dark:text-dark-text"
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-dark-muted group-focus-within:text-primary transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-secondary dark:text-dark-text"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-dark-muted group-focus-within:text-primary transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-secondary dark:text-dark-text"
                                placeholder="Create Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-dark-muted hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary dark:bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-primary dark:hover:bg-primary/80 transition-colors shadow-lg hover:shadow-xl shadow-secondary/20 dark:shadow-primary/10 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-[56px]"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Create Account"}
                        </button>

                        <p className="text-xs text-gray-400 dark:text-dark-muted text-center mt-4">
                            By creating an account, you agree to our Terms of Service and Privacy Policy.
                        </p>

                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500 dark:text-dark-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-secondary dark:text-dark-text hover:text-primary transition-colors">Sign in here</Link>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default Register;
