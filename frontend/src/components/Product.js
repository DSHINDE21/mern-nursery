import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import { useContext } from 'react';
function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.category}</Card.Title>

          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text> ${product.price}</Card.Text>
          {/* {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(product)}>
              Add to cart
            </Button>
          )} */}

          <Button onClick={() => addToCartHandler(product)}>SHOP NOW</Button>
        </Link>
      </Card.Body>

      {/* <div className="product-info">
        <p>
          <strong>{product.price}</strong>
        </p>
        <button id="addTocart">Add to cart</button>
        <button id="addTocart">SHOP NOW</button>
      </div> */}
    </Card>
  );
}
export default Product;
