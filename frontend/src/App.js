import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

function App() {
  //AddToCart Handler, it is a function to add item to a cart
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  //Signout handler hook
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* Beautify alerts using toastify  */}
        <ToastContainer position="bottom-center" limit={1} />
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

                {/* UserInfo displying  */}

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
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

              <Route path="/cart" element={<CartScreen />} />

              <Route path="/signin" element={<SigninScreen />} />

              <Route path="/signup" element={<SignupScreen />} />

              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
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
