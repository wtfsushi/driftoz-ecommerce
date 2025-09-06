import React from 'react';

const ProductDetail = ({ product }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-4">${product.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
    );
};

export default ProductDetail;