import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="success" varient="success">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text-white font-weight-xl ">
                  SHOP
                </Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
          {/* simple navbar is converted into bootstarp navbar or header above  */}
          {/* <Link to="/"> SHOP </Link> root link to app itself   */}
        </header>

        {/* <main>list products</main> */}
        <main>
          <Container>
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
