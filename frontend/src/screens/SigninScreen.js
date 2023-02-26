import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';

export default function SigninScreen() {
  //To redirect user , it is hook
  const navigate = useNavigate();
  // useLocation is hook from react-router-dom
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //email and password are states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //To access already store data
  const { state, dispatch: ctxDispatch } = useContext(Store);

  //UserInfo from the state
  const { userInfo } = state;

  //async submitHandler function that accepts event as an argument
  const submitHandler = async (e) => {
    e.preventDefault(); //prevent to reload
    try {
      const { data } = await Axios.post('/api/users/signin', {
        //email and password are state
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      // console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      //navigate user after successfull login to
      navigate(redirect || '/');
    } catch (err) {
      // toast.error('Invalid email or password'); static error aleart
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]); //dependency array

  return (
    <Container className="small-container">
      <Helmet>Sign In</Helmet>
      <h1 className="my-3">Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        {/* new user then redirect */}
        <div className="mb-3">
          New User?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
