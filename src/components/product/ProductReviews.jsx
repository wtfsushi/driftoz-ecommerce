import React from 'react';

const ProductReviews = ({ reviews }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            <div className="mt-4">
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 py-4">
                            <h3 className="font-medium">{review.author}</h3>
                            <p className="text-gray-600">{review.comment}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductReviews;