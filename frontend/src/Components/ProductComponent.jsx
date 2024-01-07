// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import 'bootstrap/dist/css/bootstrap.min.css';

// const AddProduct = () => {
//   const [productData, setProductData] = useState({
//     name: "",
//     price: "",
//     userId: "",
//     company: "",
//     category: "",
//   });

//   useEffect(() => {
//     // Retrieve userId from local storage or any other source
//     const userIdFromStorage = JSON.parse(localStorage.getItem("user"))._id;

//     // Set userId in the component state
//     setProductData((prevData) => ({
//       ...prevData,
//       userId: userIdFromStorage || "",
//     }));
//   }, []); // Run this effect only once on component mount

//   const handleChange = (e) => {
//     setProductData({
//       ...productData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/add-product",
//         productData
//       );

//       console.log("Product added successfully!");
//       console.log("Response:", response.data); // Log the response data

//       // Handle successful response, e.g., redirect or show a success message
//     } catch (error) {
//       console.error("Error adding product:", error.message);
//       // Handle error, e.g., display a generic error message to the user
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit} className="signup-form">
//         <div className="form-group">
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={productData.name}
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <label>
//             Price:
//             <input
//               type="text"
//               name="price"
//               value={productData.price}
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <label>
//             Company:
//             <input
//               type="text"
//               name="company"
//               value={productData.company}
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <label>
//             Category:
//             <input
//               type="text"
//               name="category"
//               value={productData.category}
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <button type="submit">Add product</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    userId: "",
    company: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    company: "",
    category: "",
  });

  useEffect(() => {
    const userIdFromStorage = JSON.parse(localStorage.getItem("user"))._id;
    setProductData((prevData) => ({
      ...prevData,
      userId: userIdFromStorage || "",
    }));
  }, []);

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

    // Validate Name
    if (productData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate Price
    if (productData.price.trim() === "") {
      newErrors.price = "Price is required";
      valid = false;
    } else if (isNaN(productData.price)) {
      newErrors.price = "Price must be a number";
      valid = false;
    }

    // Validate Company
    if (productData.company.trim() === "") {
      newErrors.company = "Company is required";
      valid = false;
    }

    // Validate Category
    if (productData.category.trim() === "") {
      newErrors.category = "Category is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/add-product",
          productData
        );

        console.log("Product added successfully!");
        console.log("Response:", response.data);

        // Handle successful response
      } catch (error) {
        console.error("Error adding product:", error.message);
        // Handle error
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Add Product</h2>
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
            <span className="error">{errors.name}</span>
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
            <span className="error">{errors.company}</span>
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
            <span className="error">{errors.category}</span>
          </label>
        </div>
        <div className="form-group">
          <button type="submit">Add product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
