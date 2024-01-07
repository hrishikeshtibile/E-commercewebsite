import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
  const navigate = useNavigate();
  const [auth,setauth]=useState(localStorage.getItem("user"));

  useEffect(()=>{
    // const auth = localStorage.getItem("user");
    if(auth){
      navigate("/");
    }
  });
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here, e.g., send the data to a server
    axios
      .post("http://localhost:5000/login", formData)
      .then((response) => {
        // console.log('TEST');
        if (response.status === 201) {
          // Redirect the user to the main page using the navigate function
          // console.log(response);
          const user = JSON.stringify(response.data);
          setauth(localStorage.setItem("user",user));
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log("Form data submitted:", formData);
  };

  return(
    <div className="signup-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;