import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
    
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(['all', ...data]));
  }, []);

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Toaster position="bottom-right" />
      
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} 
            className={`px-5 py-2 rounded-full capitalize font-bold transition ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => <Skeleton key={i} height={350} borderRadius={20}/>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-3xl border shadow-sm hover:shadow-2xl transition-all">
              <Link to={`/product/${product.id}`}><img src={product.image} className="h-48 w-full object-contain mb-4"/></Link>
              <h3 className="font-bold text-gray-700 h-12 overflow-hidden">{product.title}</h3>
              <p className="text-2xl font-black text-blue-600 my-2">${product.price}</p>
              <div className="flex gap-2">
                <button onClick={() => addToCart(product)} className="w-1/2 bg-gray-900 text-white py-2 rounded-xl text-sm font-bold">Add</button>
                <button onClick={() => handleBuyNow(product)} className="w-1/2 bg-blue-600 text-white py-2 rounded-xl text-sm font-bold">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;