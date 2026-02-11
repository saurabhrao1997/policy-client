const ProductCard = ({ product }:any) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col my-2">
      {/* Image Placeholder */}
      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        Image
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & Stock */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <span className="text-yellow-500 font-medium">
            ⭐ {product.rating}
          </span>
          <span
            className={`${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t pt-3 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">
            ₹{product.price}
          </p>
          <p className="text-xs text-green-600">
            {product.discountPercentage}% OFF
          </p>
        </div>

        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
