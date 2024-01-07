import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      var userId = JSON.parse(localStorage.getItem("user"));
      userId = userId._id;
      console.log(userId);
      const response = await axios.get(`http://localhost:5000/allproducts/${userId}`);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  useEffect(() => {
    if(auth){
      fetchData();
    }else{
      navigate("/signup");
    }
    
  }, []);

  async function deleteProduct(id){
    try {
      const response = await axios.delete(`http://localhost:5000/products/${id}`);
      console.log(response.data,response.status);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  }

  return (
    <div className="products-container">
      <h1>Product Lists</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Company</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index+1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.company}</td>
              <td>
                <div>
                  <button className="deletebtn" onClick={()=>{deleteProduct(product._id)}}>Delete</button>
                  
                  <Link to= {"/update/" + product._id}>
                      <button className="updatebtn">Update</button>
                  </Link>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;


