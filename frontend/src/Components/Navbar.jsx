// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar=()=>{
//    // const auth = localStorage.getItem("user");
//    const[auth,setauth]=useState(localStorage.getItem("user"))

//    function handlelogout() {
//      setauth(localStorage.clear());
//      // localStorage.clear();
//      // navigate("/signup");
//      setauth(false);
//    }
   
//    return (
    //  <div>
    //    {auth ? (
    //      <ul className="nav-ul">
    //        <li>
    //          <Link to="/">Products</Link>
    //        </li>
    //        <li>
    //          <Link to="/add">Add Products</Link>
    //        </li>
    //        <li>
    //          <Link to="/update">Update Product</Link>
    //        </li>
    //        <li>
    //          <Link to="/profile">Profile</Link>
    //        </li>
    //        <li>
    //          <Link onClick={handlelogout} to="/signup">
    //            Logout
    //          </Link>
    //        </li>
    //      </ul>
    //    ) : (
        
    //      <ul className="nav-ul nav-right">
    //        <div className="nav-user">
    //          <li>
    //            <Link to="/signup">SignUp</Link>
    //          </li>
    //          <li>
    //            <Link to="/login">Login</Link>
    //          </li>
    //        </div>
    //      </ul>
    //    )}
    //  </div>
//    );

// }



// export default Navbar;

// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem("user");
    // Navigate to home or login page after logout
    navigate("/signup");
  };

  return (
    <div>
       {isLoggedIn ? (
         <ul className="nav-ul">
           <li>
             <Link to="/">Products</Link>
           </li>
           <li>
             <Link to="/add">Add Products</Link>
           </li>
           {/* <li>
             <Link to="/update">Update Product</Link>
           </li> */}
           <li>
             <Link to="/profile">Profile</Link>
           </li>
           <li>
             <Link onClick={handleLogout} to="/signup">
               Logout
             </Link>
           </li>
         </ul>
       ) : (
        
         <ul className="nav-ul nav-right">
           <div className="nav-user">
             <li>
               <Link to="/signup">SignUp</Link>
             </li>
             <li>
               <Link to="/login">Login</Link>
             </li>
           </div>
         </ul>
       )}
     </div>
  );
};

export default Navbar;





