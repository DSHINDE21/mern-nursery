import { useEffect, useReducer, useState } from 'react';
// import { Link } from 'react-router-dom';
// import data from '../data'; commentinf because we fetching data from backend
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';

// Reducer function to reduce complexities
// It Replaces useState
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  //use reducer
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [], //default value for product
    loading: true,
    error: '',
  });
  // state to fetch
  // const [products, setProducts] = useState([]); this is replace by reducer above
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // const result = await axios.get('/api/products');
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Home Screen */}
      {/* <h1>Featured Products</h1>  */}
      <h3 className="heading">Shop By Category</h3>
      <div className="products">
        {/* Using map function  */}
        {/* data.prosucts.map is removed because we using backenf to fetch data */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {
              products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg="3" className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))
              // {' '}
            }
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
