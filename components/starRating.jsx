import { StarIcon } from '@heroicons/react/24/solid';


export default function StarRating({ rating }) {
  const totalStars = 5;
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => ( //! (... is spread operator) And (_ is a convention to indicate that we don't care about the array values, just the indices)
        index < rating ? (
            <StarIcon key={index} className="w-6 h-6 text-yellow-500" />
          ) : (
            <StarIcon key={index} className="w-6 h-6 text-gray-300" />
          )
      ))}
    </div>
  );
}
