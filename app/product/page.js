"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "@/redux/productSlice";
import StarRating from "@/components/starRating";
import { useState } from "react";
import Image from "next/image";

export default function Products() {
  const dispatch = useDispatch();
  const [showAllReview, setShowAllReview] = useState({});
  const products = useSelector((state) => state.product.data);

  const handleButtonClick = () => {
    dispatch(fetchProductData());
  };

  const toggleShowAllReviews = (productId) => {
    setShowAllReview((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <main className="w-full min-h-screen p-4">
      <div className="flex flex-col gap-6 justify-center items-center">
        <button
          onClick={handleButtonClick}
          className="border rounded-lg p-4 bg-black text-white font-semibold"
        >
          Make API Call
        </button>
        <div className="grid grid-cols-4 gap-6 px-4">
          {products.map((item) => (
            <div key={item.id} className="border rounded-md p-3 bg-gray-100 cursor-pointer hover:shadow-md hover:shadow-[#877474] hover:bg-black hover:text-white hover:scale-105 transition-all">
                <span>{item.id}</span>
                <h3 className="font-bold text-xl truncate py-2">{item.title}</h3>
                <p className="pb-2"><span className="font-bold">Description: </span>{item.description}</p>
                <div className="flex gap-2 pb-2 text-base">
                  <div><strong>Category: </strong>{item.category}</div>
                  <div><strong>Prices: </strong>&#8377;{item.price}</div>
                  <div><strong>Rating: </strong>{item.rating}</div>
                </div>
                <div className="flex gap-1 text-base pb-2">
                    <span className="font-semibold">Tags: </span>
                    {item.tags.map((tag, index)=> (
                        <div key={index}>
                            {tag}{index < item.tags.length - 1 && ","}
                        </div>
                    ))}
                </div>0
                <div className="flex gap-1 pb-2 text-base">
                    {Object.entries(item.dimensions).map(([key, value], index) => (
                        <div key={index}>
                            <strong>{key}:</strong> {value}{index < Object.keys(item.dimensions).length - 1 && ","}
                        </div>
                    ))}
                </div>
                <div className="mb-2">
                  <div className="text-base"><strong>Warranty: </strong>{item.warrantyInformation}</div>
                  <div className="text-base"><strong>Shipping: </strong>{item.shippingInformation}</div>
                  <div className="text-base"><strong>Availability: </strong>{item.availabilityStatus}</div>
                </div>
                <div>
                  {item.reviews.slice(0, showAllReview[item.id] ? item.reviews.length : 1).map((review, index) => (
                    <div key={index} className="mb-4 border-b pb-2">
                      <div className="flex items-center">
                        <StarRating rating={review.rating} />
                        <p className="ml-2 text-sm text-gray-600">
                          {review.rating} out of 5 stars
                        </p>
                      </div>
                      <p>
                        <strong>Comment: </strong>
                        {review.comment}
                      </p>
                      <p>
                        <strong>Date: </strong>
                        {review.date}
                      </p>
                      <p>
                        <strong>Name: </strong>
                        {review.reviewerName}
                      </p>
                      <p>
                        <strong>Email: </strong>
                        {review.reviewerEmail}
                      </p>
                    </div>
                  ))}
                  {item.reviews.length > 1 && (
                    <button
                      onClick={() => toggleShowAllReviews(item.id)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {showAllReview[item.id] ? 'Show less' : 'Read more'}
                    </button>
                  )}
              </div>
              <div>
                <div>{Object.entries(item.meta).map(([key, value], index) => (
                  <div key={index}>
                    <strong>{key}:</strong> {value}{index < Object.keys(item.meta).length - 1 && ","}
                  </div>
                ))}</div>
              </div>
              <div className="flex justify-center">
                <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={100}
                    height={100}
                    layout="responsive"
                    className="max-w-52 w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
