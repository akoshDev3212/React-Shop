import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="text-center py-20">Yuklanmoqda...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img src={product.image} className="w-full h-80 object-contain" />
        <div>
          <h1 className="text-3xl font-black mb-4">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4 text-yellow-400 text-xl">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.round(product.rating.rate) ? '★' : '☆'}</span>
            ))}
            <span className="text-gray-500 text-sm ml-2">({product.rating.count} ratings)</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-4xl font-black text-blue-600 mb-6">${product.price}</p>
          <button onClick={() => { addToCart(product); toast.success("Savatchaga qo'shildi!"); }} 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;