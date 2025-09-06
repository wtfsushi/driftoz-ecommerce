import React from 'react';

const ProductGallery = ({ images }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-auto" />
                </div>
            ))}
        </div>
    );
};

export default ProductGallery;