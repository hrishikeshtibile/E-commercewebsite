import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// const UpdateProduct = () => {
//   const [productData, setProductData] = useState({
//     name: "",
//     price: "",
//     company: "",
//     category: "",
//   });

//   const [errors, setErrors] = useState({
//     price: ""
//   });
//   const navigate =  useNavigate();
//   const param = useParams();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/products/${param.id}`);
//       // console.log(response.data);
//       setProductData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//     }
//   };

//   useEffect(() => {
//     fetchData()
//   },[param]);

//   const handleChange = (e) => {
//     setProductData({
//       ...productData,
//       [e.target.name]: e.target.value,
//     });

//     // Clear the error message when the user starts typing in the corresponding field
//     setErrors({
//       ...errors,
//       [e.target.name]: "",
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { ...errors };

//    if(isNaN(productData.price)) {
//       newErrors.price = "Price must be a number";
//       valid = false;
//     }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async () => {
//     // e.preventDefault();

//     if (validateForm()) {
//       try {
//         const response = await axios.put(`http://localhost:5000/products/${param.id}`,productData);

//         console.log("Product updated successfully!");
//         console.log("Response:", response.data);
//         // if(response.data){
//         //   navigate('/');
//         // }
//         navigate("/");
        
//         // Handle successful response
//       } catch (error) {
//         console.error("Error updating product:", error.message);
//         // Handle error
//       }
//     } else {
//       console.log("Form validation failed");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Update</h2>
//       <form onSubmit={handleSubmit} className="signup-form">
        // <div className="form-group">
        //   <label>
        //     Name:
        //     <input
        //       type="text"
        //       name="name"
        //       value={productData.name}
        //       onChange={handleChange}
        //     />
        //   </label>
        // </div>
        // <div className="form-group">
        //   <label>
        //     Price:
        //     <input
        //       type="text"
        //       name="price"
        //       value={productData.price}
        //       onChange={handleChange}
        //     />
        //     <span className="error">{errors.price}</span>
        //   </label>
        // </div>
        // <div className="form-group">
        //   <label>
        //     Company:
        //     <input
        //       type="text"
        //       name="company"
        //       value={productData.company}
        //       onChange={handleChange}
        //     />
        //   </label>
        // </div>
        // <div className="form-group">
        //   <label>
        //     Category:
        //     <input
        //       type="text"
        //       name="category"
        //       value={productData.category}
        //       onChange={handleChange}
        //     />
        //   </label>
        // </div>
//         <div className="form-group">
//           <button type="submit">Update Product</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;

// ... (import statements)

const UpdateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    company: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    price: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });

    // Clear the error message when the user starts typing in the corresponding field
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    const priceAsNumber = parseInt(productData.price);

    if (isNaN(priceAsNumber) || productData.price.trim() === "") {
      newErrors.price = "Price must be a valid number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.put(`http://localhost:5000/products/${id}`, productData);
        console.log("Product updated successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error updating product:", error.message);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Update</h2>
      <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
            <span className="error">{errors.price}</span>
          </label>
        </div>
        <div className="form-group">
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={productData.company}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
