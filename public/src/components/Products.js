import axios from 'axios';
import { useEffect, useState } from 'react';

const Products = () => {
const [products, setProducts] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/products')
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

  }, []);
  
  return <h1>{console.log(products)}</h1>
};

export default Products;