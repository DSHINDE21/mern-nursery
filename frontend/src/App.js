import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { Store } from './Store';

function App() {
  //AddToCart Handler, it is a function to add item to a cart
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="success" varient="success">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text-light fs-3  fw-bolder">
                  SHOP
                </Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      {/* 0 is default value  */}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
          {/* simple navbar is converted into bootstarp navbar or header above  */}
          {/* <Link to="/"> SHOP </Link> root link to app itself   */}
        </header>

        {/* <main>list products</main> */}
        <main>
          <Container className="mt-2">
            {/* bootstarp Container  */}
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>

        {/* Footer starts */}
        <footer className="text-center bg-success text-white">
          <div>All rights reserved @2023</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
