import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      {/* some lower devices instead of spinner text will display */}
      <span className="visually-hidden"> Loading...</span>
    </Spinner>
  );
}
