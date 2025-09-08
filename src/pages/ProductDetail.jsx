import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ProductReviews from '../components/product/ProductReviews';
import ProductCard from '../components/common/ProductCardModern';
import { featuredProducts, newArrivals } from '../data/dummyData';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const { addItem } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [activeTab, setActiveTab] = useState('materials');

    useEffect(() => {
        const fetchProduct = () => {
            try {
                // Combine all products from dummy data
                const allProducts = [...featuredProducts, ...newArrivals];
                const foundProduct = allProducts.find(product => product.id === parseInt(id));
                
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Related products (exclude the current one)
    const related = useMemo(() => {
        const pool = [...featuredProducts, ...newArrivals];
        return pool.filter(p => p.id !== parseInt(id)).slice(0, 4);
    }, [id]);

    const inc = () => setQuantity(q => Math.min(99, q + 1));
    const dec = () => setQuantity(q => Math.max(1, q - 1));

    const handleAddToCart = () => {
        if (!product) return;
        const count = Math.max(1, quantity);
        for (let i = 0; i < count; i++) {
            addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        history.push('/checkout');
    };

    // Theme-friendly placeholder options
    const colorOptions = ['Black', 'Red', 'Blue', 'Gold'];
    const sizeOptions = ['32', '36', '38', '40', '42'];

    const galleryImages = useMemo(() => {
        if (!product) return [];
        // If product images array existed, use it; otherwise repeat main image
        const base = product.images && product.images.length > 0 ? product.images : [product.image];
        return base.length >= 4 ? base : [...Array(4)].map(() => product.image);
    }, [product]);

    if (loading) return <div className="container mx-auto p-6"><div className="skeleton h-10 w-40 mb-6"></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="skeleton h-96 w-full rounded-2xl"></div><div className="space-y-4"><div className="skeleton h-8 w-3/4"></div><div className="skeleton h-6 w-1/2"></div><div className="skeleton h-24 w-full"></div><div className="skeleton h-10 w-48"></div></div></div></div>;
    if (error) return <div className="container mx-auto p-6"><div className="card bg-background-card border border-white/5 p-6 rounded-2xl text-error">Error: {error}</div></div>;

    return (
        <div className="container mx-auto p-6 pt-32">
            {/* Breadcrumbs */}
            <nav className="text-sm text-neutral-400 mb-6">
                <Link to="/" className="nav-link px-0 py-0">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="nav-link px-0 py-0">Products</Link>
                <span className="mx-2">/</span>
                <span className="text-neutral-200">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Gallery with vertical thumbnails */}
                <div className="card card-hover p-4 md:p-6">
                    <div className="grid grid-cols-6 gap-4">
                        {/* Thumbs */}
                        <div className="col-span-1 flex lg:flex-col gap-3 overflow-auto pr-2 lg:pr-0">
                            {galleryImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`relative rounded-xl overflow-hidden border ${activeImg === i ? 'border-accent-500' : 'border-white/10'} flex-shrink-0`}
                                    title={`Thumbnail ${i + 1}`}
                                >
                                    <img src={img} alt={`thumb-${i}`} className="w-20 h-20 object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main image */}
                        <div className="col-span-5">
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src={galleryImages[activeImg]}
                                    alt={product.name}
                                    className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                                />
                                {product.inStock === false && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="bg-error text-white px-4 py-2 rounded-xl font-medium">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                                {/* Corner accents */}
                                <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-accent-500"></div>
                                <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-accent-500"></div>
                                <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-accent-500"></div>
                                <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-accent-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Details panel matching reference, themed */}
                <div className="space-y-6">
                    {/* Heading & meta */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <div className="text-sm text-success">{product.inStock !== false ? 'In stock' : 'Out of stock'}</div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">{product.name}</h1>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'text-accent-500' : 'text-neutral-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                    ))}
                                </div>
                                <span className="text-neutral-400">{(product.reviews?.length || 0)} reviews</span>
                            </div>
                        </div>
                        <button className="btn btn-ghost px-3 py-2">♡ Add to Wishlist</button>
                    </div>

                    {/* Price */}
                    <div className="card card-glow p-4">
                        <div className="flex items-end gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-display font-bold text-gradient">${product.price}</span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <span className="text-neutral-500 line-through">${product.originalPrice}</span>
                                )}
                            </div>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="badge badge-primary">Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
                            )}
                        </div>
                    </div>

                    {/* Short description */}
                    <p className="text-neutral-300">{product.description}</p>

                    {/* Small details list like reference */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-400">
                        <div><span className="text-neutral-500">Material:</span> {product.specifications?.material || 'Premium PLA'}</div>
                        <div><span className="text-neutral-500">Made in:</span> {product.specifications?.origin || 'Belgium'}</div>
                        <div><span className="text-neutral-500">Finish:</span> {product.specifications?.finish || 'Matte / Gloss mix'}</div>
                        <div><span className="text-neutral-500">Scale:</span> {product.specifications?.scale || '1:24'}</div>
                    </div>

                    {/* Color selector
                    <div>
                        <div className="mb-2 text-sm text-neutral-400">Colour</div>
                        <div className="flex gap-2">
                            {colorOptions.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedColor(c)}
                                    className={`px-3 py-2 rounded-lg border ${selectedColor === c ? 'border-accent-500 text-accent-400' : 'border-white/10 text-neutral-300'} hover:border-accent-500`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div> */}

                    {/* Size selector
                    <div>
                        <div className="mb-2 text-sm text-neutral-400">Size</div>
                        <div className="flex flex-wrap gap-2">
                            {sizeOptions.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    className={`w-12 h-10 rounded-lg border ${selectedSize === s ? 'border-accent-500 text-accent-400' : 'border-white/10 text-neutral-300'} hover:border-accent-500`}
                                >{s}</button>
                            ))}
                        </div>
                    </div> */}

                    {/* Quantity & Actions */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-background-card rounded-xl border border-white/10 overflow-hidden">
                                <button onClick={dec} className="btn btn-secondary px-4 py-3 rounded-none">-</button>
                                <div className="px-5 py-3 min-w-[3rem] text-center font-semibold">{quantity}</div>
                                <button onClick={inc} className="btn btn-secondary px-4 py-3 rounded-none">+</button>
                            </div>
                            <button
                                onClick={handleBuyNow}
                                className="btn btn-primary px-8 py-4"
                                disabled={product.inStock === false}
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-secondary px-6 py-4"
                                disabled={product.inStock === false}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v12z"/></svg>
                            Free shipping worldwide
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-4">
                        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
                            {[
                                { id: 'materials', label: 'Materials' },
                                { id: 'size', label: 'Size & Fit' },
                                { id: 'care', label: 'Care' },
                                { id: 'reviews', label: `Reviews (${product.reviews?.length || 0})` },
                                { id: 'shipping', label: 'Shipping & Returns' },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTab(t.id)}
                                    className={`px-3 py-2 rounded-lg text-sm ${activeTab === t.id ? 'bg-accent-500/10 text-accent-400' : 'text-neutral-300 hover:text-white'}`}
                                >{t.label}</button>
                            ))}
                        </div>

                        <div className="pt-4 text-neutral-300 text-sm">
                            {activeTab === 'materials' && (
                                <p>Crafted with high-quality {product.specifications?.material || 'PLA'} and finished for durability and display. Each piece is printed with precision and hand-checked.</p>
                            )}
                            {activeTab === 'size' && (
                                <p>True to the specified scale {product.specifications?.scale || '1:24'}. Refer to the size options above for model variants.</p>
                            )}
                            {activeTab === 'care' && (
                                <p>Keep away from direct sunlight and heat. Clean gently with a soft brush or dry cloth.</p>
                            )}
                            {activeTab === 'shipping' && (
                                <p>Ships within 2-4 business days. Free worldwide shipping. 30-day return policy applies.</p>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="card p-4">
                                    <ProductReviews reviews={product.reviews || []} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews (shown again if not on tab) */}
            {activeTab !== 'reviews' && (
                <div className="mt-10 card p-6">
                    <h2 className="text-2xl font-display font-bold text-white mb-4">Customer Reviews</h2>
                    <ProductReviews reviews={product.reviews || []} />
                </div>
            )}

            {/* Related products */}
            {related.length > 0 && (
                <section className="mt-12">
                    <h3 className="text-2xl font-display font-bold text-gradient mb-6">You may also like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} onAddToCart={(item) => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetail;