import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
function Product(props) {
  const { product } = props;
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
          <Button>SHOP NOW</Button>
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
