import { useParams } from 'react-router-dom';

function ProductScreen() {
  <div>ProductScreen</div>;

  //Using hook to get unique key
  const params = useParams();
  const { slug } = params;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
export default ProductScreen;
