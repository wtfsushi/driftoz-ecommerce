import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductReviews from '../components/product/ProductReviews';
import { featuredProducts, newArrivals } from '../data/dummyData';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <ProductGallery images={product.images} />
            <p className="mt-4">{product.description}</p>
            <h2 className="mt-6 text-xl">Reviews</h2>
            <ProductReviews productId={product._id} />
        </div>
    );
};

export default ProductDetail;