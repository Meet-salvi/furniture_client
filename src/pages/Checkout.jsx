import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder, resetOrderState } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { items: cartItems, totalPrice } = useSelector(state => state.cart);
    const { loading, error, success } = useSelector(state => state.orders);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');

    // New Payment Details State
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        if (cartItems.length === 0) {
            navigate('/shop');
        }
    }, [isAuthenticated, cartItems.length, navigate]);

    useEffect(() => {
        if (success) {
            dispatch(clearCart());
            navigate('/profile'); // To see orders
            dispatch(resetOrderState());
        }
    }, [success, dispatch, navigate]);

    const deliveryCharge = paymentMethod === 'Cash On Delivery' ? 150.00 : 0.00;
    const finalTotal = totalPrice + deliveryCharge;

    const submitHandler = (e) => {
        e.preventDefault();

        if (paymentMethod === 'Credit/Debit Card') {
            if (cardNumber.replace(/\s/g, '').length !== 16) {
                return toast.error("Please enter a valid 16-digit card number.");
            }
            if (!expiry || !cvv) {
                return toast.error("Please complete your card details.");
            }
        }

        if (paymentMethod === 'UPI' && (!upiId.includes('@') || upiId.length < 5)) {
            return toast.error("Please enter a valid UPI ID (e.g. yourname@okbank).");
        }

        dispatch(placeOrder({
            products: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                qty: item.quantity,
                price: item.price,
                color: item.selectedColor || (Array.isArray(item.color) ? item.color[0] : item.color),
                material: item.material
            })),
            deliveryAddress: {
                address,
                city,
                postalCode,
                country
            },
            paymentMethod,
            totalPrice: finalTotal,
        }))
            .unwrap()
            .then(() => {
                toast.success('Order placed successfully!');
            })
            .catch(err => {
                toast.error(err || 'Failed to place order');
            });
    };

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-4xl font-serif text-secondary dark:text-dark-text mb-12">Checkout</h1>

                {error && <div className="p-4 bg-red-50 text-red-500 rounded-xl mb-8">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                            <h2 className="text-xl font-bold text-secondary dark:text-dark-text mb-6">Delivery Address</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-dark-muted mb-1">Address</label>
                                    <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-xl p-3 focus:outline-none focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-dark-muted mb-1">City</label>
                                    <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-xl p-3 focus:outline-none focus:border-primary" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-dark-muted mb-1">Postal Code</label>
                                        <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-xl p-3 focus:outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-dark-muted mb-1">Country</label>
                                        <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text rounded-xl p-3 focus:outline-none focus:border-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm transition-colors duration-300">
                            <h2 className="text-xl font-bold text-secondary dark:text-dark-text mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="flex items-center gap-3 border border-gray-200 dark:border-dark-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors">
                                        <input type="radio" required name="paymentMethod" value="Credit/Debit Card" checked={paymentMethod === 'Credit/Debit Card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-primary" />
                                        <span className="font-medium text-gray-600 dark:text-dark-muted flex-grow">Credit / Debit Card</span>
                                    </label>
                                    {paymentMethod === 'Credit/Debit Card' && (
                                        <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border space-y-4 animate-opacity">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-widest mb-1">Card Number</label>
                                                <input type="text" maxLength={19} placeholder="xxxx xxxx xxxx xxxx" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-lg p-2 focus:outline-none focus:border-primary tracking-widest" />
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <label className="block text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-widest mb-1">Expiry Date</label>
                                                    <input type="text" placeholder="MM/YY" maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-lg p-2 focus:outline-none focus:border-primary tracking-widest" />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-widest mb-1">CVV</label>
                                                    <input type="password" placeholder="***" maxLength={4} value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-full border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-lg p-2 focus:outline-none focus:border-primary tracking-widest" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-3 border border-gray-200 dark:border-dark-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors">
                                        <input type="radio" required name="paymentMethod" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-primary" />
                                        <span className="font-medium text-gray-600 dark:text-dark-muted flex-grow">UPI</span>
                                    </label>
                                    {paymentMethod === 'UPI' && (
                                        <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border animate-opacity flex flex-col items-center">
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=mock@upi&pn=LumiereFurniture" alt="UPI QR Code" className="w-32 h-32 mb-4 border p-2 bg-white rounded-lg shadow-sm" />
                                            <p className="text-sm text-gray-500 dark:text-dark-muted mb-4 text-center">Scan QR using any UPI app or enter your ID below.</p>
                                            <div className="w-full">
                                                <label className="block text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-widest mb-1">UPI ID</label>
                                                <input type="text" placeholder="username@bank" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text rounded-lg p-2 focus:outline-none focus:border-primary" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-3 border border-gray-200 dark:border-dark-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors">
                                        <input type="radio" required name="paymentMethod" value="Cash On Delivery" checked={paymentMethod === 'Cash On Delivery'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-primary" />
                                        <span className="font-medium text-gray-600 dark:text-dark-muted flex-grow">Cash on Delivery <span className="text-xs text-gray-400 dark:text-dark-muted/60 font-normal block">(₹150.00 Handling Fee applies)</span></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary dark:bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-primary dark:hover:bg-primary/80 transition-colors shadow-lg shadow-secondary/20 dark:shadow-primary/10 flex justify-center items-center"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Place Order'}
                        </button>
                    </form>

                    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm h-fit sticky top-24 transition-colors duration-300">
                        <h2 className="text-xl font-bold text-secondary dark:text-dark-text mb-6 border-b border-gray-100 dark:border-dark-border pb-4">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <img src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100x100/eee/333?text=No+Image'} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 dark:border-dark-border" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm text-secondary dark:text-dark-text truncate">{item.name}</h3>
                                        <p className="text-xs text-gray-500 dark:text-dark-muted">{item.quantity} x ₹{item.price}</p>
                                    </div>
                                    <div className="font-bold text-secondary dark:text-dark-text">
                                        ₹{(item.quantity * item.price).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-100 dark:border-dark-border pt-4 space-y-3">
                            <div className="flex justify-between text-gray-600 dark:text-dark-muted">
                                <span>Subtotal</span>
                                <span>₹{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-dark-muted">
                                <span>Shipping / Handeling</span>
                                <span>₹{deliveryCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-secondary dark:text-dark-text pt-3 border-t border-gray-100 dark:border-dark-border">
                                <span>Total</span>
                                <span>₹{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
