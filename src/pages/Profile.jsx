import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders, cancelOrder } from '../redux/slices/orderSlice';
import { LogOut, Package, User, MapPin, ShieldCheck, Plus, XCircle } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import Swal from 'sweetalert2';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { items: cartItems, totalPrice: cartTotal } = useSelector(state => state.cart);
    const { orders, loading, error } = useSelector(state => state.orders);

    const [activeTab, setActiveTab] = React.useState('orders'); // orders, account, addresses

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(getUserOrders(user._id));
        }
    }, [dispatch, isAuthenticated, navigate, user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleCancelOrder = (orderId) => {
        Swal.fire({
            title: 'Cancel Order?',
            text: "This action cannot be undone. Are you sure you want to cancel this order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1A1A1A', // Secondary color
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it',
            background: document.documentElement.classList.contains('dark') ? '#1e1e1e' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1A1A1A',
            borderRadius: '24px',
            customClass: {
                popup: 'rounded-3xl border border-gray-100 dark:border-dark-border shadow-2xl',
                title: 'text-2xl font-serif font-bold pt-4',
                htmlContainer: 'text-gray-500 dark:text-dark-muted',
                confirmButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-wider text-sm transition-all hover:scale-105',
                cancelButton: 'rounded-xl px-8 py-3 font-bold uppercase tracking-wider text-sm transition-all hover:scale-105'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cancelOrder(orderId)).then((res) => {
                    if (res.error) {
                        Swal.fire({
                            title: 'Error',
                            text: res.payload || 'Failed to cancel order',
                            icon: 'error',
                            confirmButtonColor: '#1A1A1A',
                        });
                    } else {
                        Swal.fire({
                            title: 'Cancelled!',
                            text: 'Your order has been cancelled.',
                            icon: 'success',
                            confirmButtonColor: '#1A1A1A',
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="bg-background dark:bg-dark-bg min-h-[90vh] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm sticky top-24">
                            <div className="w-20 h-20 bg-primary/10 rounded-full text-primary flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <h2 className="text-xl font-bold text-secondary dark:text-dark-text text-center mb-1">{user?.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-dark-muted text-center mb-6">{user?.email}</p>

                            <div className="space-y-2 border-t border-gray-100 dark:border-dark-border pt-6">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${activeTab === 'orders' ? 'bg-gray-50 dark:bg-dark-surface text-secondary dark:text-dark-text' : 'hover:bg-gray-50 dark:hover:bg-dark-surface text-gray-600 dark:text-dark-muted'}`}
                                >
                                    <Package size={18} /> Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('account')}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${activeTab === 'account' ? 'bg-gray-50 dark:bg-dark-surface text-secondary dark:text-dark-text' : 'hover:bg-gray-50 dark:hover:bg-dark-surface text-gray-600 dark:text-dark-muted'}`}
                                >
                                    <User size={18} /> Account Details
                                </button>
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-colors ${activeTab === 'addresses' ? 'bg-gray-50 dark:bg-dark-surface text-secondary dark:text-dark-text' : 'hover:bg-gray-50 dark:hover:bg-dark-surface text-gray-600 dark:text-dark-muted'}`}
                                >
                                    <MapPin size={18} /> Addresses
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 font-medium transition-colors flex items-center gap-3 mt-4"
                                >
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content (Orders) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-dark-card p-6 sm:p-10 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm min-h-[500px]">
                            <h1 className="text-3xl font-serif text-secondary dark:text-dark-text mb-8 pb-4 border-b border-gray-100 dark:border-dark-border">
                                {activeTab === 'orders' ? 'Order History' : activeTab === 'account' ? 'Account Details' : 'Addresses'}
                            </h1>

                            {error && <div className="p-4 bg-red-50 text-red-500 rounded-xl mb-6">{error}</div>}

                            {activeTab === 'orders' ? (
                                loading ? (
                                    <div className="py-20 text-center text-primary font-bold">Loading Orders...</div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-20">
                                        <Package size={48} className="mx-auto text-gray-300 dark:text-dark-muted mb-4" />
                                        <h3 className="text-lg font-bold text-gray-500 dark:text-dark-muted mb-2">No orders found</h3>
                                        <p className="text-gray-400 dark:text-dark-muted/80">Looks like you haven't made any purchases yet.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map(order => (
                                            <div key={order._id} className="border border-gray-200 dark:border-dark-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                                                <div className="bg-gray-50 dark:bg-dark-surface p-4 sm:p-6 flex flex-wrap justify-between items-center gap-4 text-sm border-b border-gray-200 dark:border-dark-border">
                                                    <div>
                                                        <p className="font-bold text-gray-500 dark:text-dark-muted uppercase tracking-widest text-xs mb-1">Order Placed</p>
                                                        <p className="font-medium text-secondary dark:text-dark-text">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-500 dark:text-dark-muted uppercase tracking-widest text-xs mb-1">Total</p>
                                                        <p className="font-medium text-secondary dark:text-dark-text">₹{order.totalPrice.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-500 dark:text-dark-muted uppercase tracking-widest text-xs mb-1">Order #</p>
                                                        <p className="font-medium text-secondary dark:text-dark-text">{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                                    </div>
                                                    <div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                                    'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    {(order.status === 'Pending' || order.status === 'Processing') && (
                                                        <button
                                                            onClick={() => handleCancelOrder(order._id)}
                                                            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors font-bold text-xs uppercase tracking-wider"
                                                        >
                                                            <XCircle size={14} /> Cancel Order
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="p-4 sm:p-6 divide-y divide-gray-100 dark:divide-dark-border">
                                                    {order.products?.map((item, index) => (
                                                        <div key={index} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                                                            <img src={(item.product?.images && item.product.images[0]) || 'https://placehold.co/200x200/eee/333?text=No+Image'} alt={item.name || item.product?.name} className="w-20 h-20 object-cover rounded-xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-surface" />
                                                            <div className="flex-1 flex flex-col justify-center">
                                                                <h4 className="font-bold text-secondary dark:text-dark-text mb-1">{item.name || item.product?.name}</h4>
                                                                <p className="text-gray-500 dark:text-dark-muted text-sm">Qty: {item.qty}</p>
                                                                {item.color && <p className="text-xs text-gray-400 dark:text-dark-muted/60">Color: {item.color}</p>}
                                                            </div>
                                                            <div className="flex flex-col justify-center font-bold text-secondary dark:text-dark-text text-right">
                                                                ₹{((item.price || item.product?.price || 0) * (item.qty || 1)).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : activeTab === 'account' ? (
                                <div className="space-y-8 animate-opacity">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 bg-gray-50 dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</p>
                                            <p className="text-lg font-medium text-secondary dark:text-dark-text">{user?.name}</p>
                                        </div>
                                        <div className="p-6 bg-gray-50 dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</p>
                                            <p className="text-lg font-medium text-secondary dark:text-dark-text">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary dark:text-dark-text">Verified Account</h4>
                                            <p className="text-sm text-gray-600 dark:text-dark-muted">Your account is secured with email verification.</p>
                                        </div>
                                    </div>
                                    <button className="bg-secondary dark:bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-primary dark:hover:bg-primary/80 transition-colors">
                                        Update Profile
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-opacity">
                                    {orders.length > 0 ? (
                                        <div className="p-6 bg-gray-50 dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border relative group">
                                            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-primary hover:text-secondary dark:hover:text-dark-text transition-colors font-bold text-sm">Edit</button>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-full flex items-center justify-center border border-gray-200 dark:border-dark-border text-gray-400">
                                                    <MapPin size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-secondary dark:text-dark-text mb-1">Primary Address</h4>
                                                    <p className="text-gray-600 dark:text-dark-muted text-sm leading-relaxed">
                                                        {orders[0].deliveryAddress.address}<br />
                                                        {orders[0].deliveryAddress.city}, {orders[0].deliveryAddress.postalCode}<br />
                                                        {orders[0].deliveryAddress.country}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-20">
                                            <MapPin size={48} className="mx-auto text-gray-300 dark:text-dark-muted mb-4" />
                                            <h3 className="text-lg font-bold text-gray-500 dark:text-dark-muted mb-2">No addresses found</h3>
                                            <p className="text-gray-400 dark:text-dark-muted/80">Save your delivery addresses for faster checkout.</p>
                                        </div>
                                    )}
                                    <button className="border-2 border-dashed border-gray-200 dark:border-dark-border w-full py-8 rounded-2xl text-gray-400 dark:text-dark-muted font-medium hover:border-primary hover:text-primary transition-all flex flex-col items-center gap-2">
                                        <Plus size={24} />
                                        <span>Add New Address</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Profile;
