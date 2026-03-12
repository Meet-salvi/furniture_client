import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProducts } from '../../redux/slices/productSlice';
import { Edit, Trash2, Plus, Package, Users, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../api';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: products, loading } = useSelector(state => state.products);
    const { isAuthenticated, user } = useSelector(state => state.auth);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        price: '',
        category: '',
        material: '',
        color: '',
        images: '',
        stock: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(fetchProducts());
            fetchCategories();
        }
    }, [dispatch, isAuthenticated, navigate]);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/categories`);
            setCategories(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${BASE_URL}/api/products/${id}`);
                toast.success('Product deleted successfully');
                dispatch(fetchProducts());
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to delete product');
            }
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setFormData({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category?._id || product.category,
            material: product.material,
            color: Array.isArray(product.color) ? product.color.join(', ') : product.color,
            images: Array.isArray(product.images) ? product.images.join(', ') : product.images,
            stock: product.stock
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setIsEditing(false);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            material: '',
            color: '',
            images: '',
            stock: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            color: formData.color.split(',').map(c => c.trim()),
            images: formData.images.split(',').map(i => i.trim()),
        };

        try {
            if (isEditing) {
                await axios.put(`${BASE_URL}/api/products/${formData._id}`, payload);
                toast.success('Product updated successfully');
            } else {
                await axios.post(`${BASE_URL}/api/products`, payload);
                toast.success('Product added successfully');
            }
            setIsModalOpen(false);
            dispatch(fetchProducts());
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    // Mock stats
    const stats = [
        { title: "Total Products", value: products.length, icon: <Package size={24} className="text-blue-500" /> },
        { title: "Total Users", value: "1,245", icon: <Users size={24} className="text-primary" /> },
        { title: "Total Orders", value: "854", icon: <ShoppingBag size={24} className="text-green-500" /> }
    ];

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-primary">Loading Admin...</div>;

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-end mb-12">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Management</p>
                        <h1 className="text-4xl font-serif text-secondary">Admin Dashboard</h1>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="bg-secondary text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-primary transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{s.title}</p>
                                <h3 className="text-3xl font-bold text-secondary">{s.value}</h3>
                            </div>
                            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                                {s.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-serif text-secondary font-bold">Product Catalog</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Product</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Stock</th>
                                    <th className="p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, i) => (
                                    <motion.tr
                                        key={product._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="p-4 flex items-center gap-4">
                                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded object-cover" />
                                            <span className="font-medium text-secondary">{product.name}</span>
                                        </td>
                                        <td className="p-4 text-gray-600">{product.category?.name || product.category}</td>
                                        <td className="p-4 font-bold text-secondary">₹{product.price}</td>
                                        <td className="p-4 text-gray-600">{product.stock} units</td>
                                        <td className="p-4 flex gap-3">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-blue-500 hover:text-blue-700 transition-colors p-2 bg-blue-50 rounded-lg"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-2 bg-red-50 rounded-lg"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-serif text-secondary font-bold">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="e.g. Modern Sofa"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors bg-white"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="24999"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Stock Units</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="15"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        required
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors resize-none"
                                        placeholder="Describe the product..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Material</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.material}
                                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="e.g. Oak Wood"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Colors (comma separated)</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.color}
                                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="Black, White, Natural"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Image URLs (comma separated)</label>
                                    <textarea
                                        required
                                        rows="2"
                                        value={formData.images}
                                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors resize-none"
                                        placeholder="https://image1.jpg, https://image2.jpg"
                                    ></textarea>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-secondary text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-primary transition-colors shadow-lg shadow-secondary/20"
                                    >
                                        {isEditing ? 'Save Changes' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
