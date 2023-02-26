import bcrypt from 'bcryptjs'; //to encrypt
// creating object data
const data = {
  users: [
    {
      name: 'Dinesh',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Shiv',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1', as id will come from mongoDb
      name: 'plant1',
      slug: 'p1', //slug act as a unique key
      // category: 'indoor',
      category: 'Bonsai',
      image: '/images/cat1.jpg', //679 px * 829px
      price: 120,
      countInStock: 10,
      brand: 'x',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality plant',
    },
    {
      // _id: '2',
      name: 'plant2',
      slug: 'p2', //slug act as a unique key
      category: 'Plants For House',
      image: '/images/cat2.jpg', //679 px * 829px
      price: 120,
      countInStock: 0,
      brand: 'x',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality plant',
    },
    {
      // _id: '3',
      name: 'plant3',
      slug: 'p3', //slug act as a unique key
      category: 'Plants For Office',
      image: '/images/cat3.jpg', //679 px * 829px
      price: 120,
      countInStock: 10,
      brand: 'x',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality plant',
    },
    {
      // _id: '4',
      name: 'plant4',
      slug: 'p4', //slug act as a unique key
      category: 'Gift Plants',
      image: '/images/cat4.jpg', //679 px * 829px
      price: 150,
      countInStock: 10,
      brand: 'x',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality plant',
    },
    //   {
    //     name: 'plant',
    //     slug: 'p5', //slug act as a unique key
    //     category: 'indoor',
    //     image: '/images/p1.jpg', //679 px * 829px
    //     price: 120,
    //     countInStock: 10,
    //     brand: 'x',
    //     rating: 4.5,
    //     numReviews: 10,
    //     description: 'high quality plant',
    //   },
  ],
};

export default data;
