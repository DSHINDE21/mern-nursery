import axios from 'axios';
import { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../components/Rating';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  <div>ProductScreen</div>;

  //Using hook to get unique key
  const params = useParams();
  const { slug } = params;

  //use reducer
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [], //default value for product
    loading: true,
    error: '',
  });
  // state to fetch
  // const [products, setProducts] = useState([]); this is replace by reducer above
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // const result = await axios.get('/api/products');
      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  return (
    // <div>
    //   <h1>{slug}</h1>
    // </div>
    loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      // <div>{product.category}</div>
      //here under below div content is visible
      <div className="text-center">
        <Row>
          <Col md={6}>
            <img
              className="img-large"
              src={product.image}
              alt={product.name}
            ></img>
          </Col>

          <Col md={3} className="mt-5">
            <ListGroup varient="flush">
              <ListGroup.Item>
                {/* Helmet is package used to show title in url */}
                <Helmet>
                  <title>{product.category}</title>
                </Helmet>
                <h1>{product.category}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating>
                  rating={product.rating}
                  numReviews={product.numReviews}
                </Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} className="mt-5">
            <Card>
              <Card.Body>
                <ListGroup varient="flush">
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup>
                <ListGroup.Item varient="flush">
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid mt-3">
                      {/* full width button  */}
                      <Button variant="warning">Add to cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  );
}
export default ProductScreen;
