import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data'; commentinf because we fetching data from backend
import axios from 'axios';

function HomeScreen() {
  // state to fetch
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Home Screen */}
      {/* <h1>Featured Products</h1>  */}
      <h1>Shop By Category</h1>
      <div className="products">
        {/* Using map function  */}
        {/* data.prosucts.map is removed because we using backenf to fetch data */}
        {products.map((product) => (
          <div key={product.slug} className="product">
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>

            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.category}</p>
              </Link>
              <p>{/* <strong>{product.price}</strong> */}</p>
              {/* <button id="addTocart">Add to cart</button> */}
              <button id="addTocart">SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
