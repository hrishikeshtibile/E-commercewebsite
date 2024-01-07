import express from "express";
import connectDb from "./db/config.js";
import User from "./db/User.js";
import Product from "./db/Product.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();
// ------------------------------------------------------------------------------------------------------------
app.post("/register", async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Create a new user instance using the User model
    const newUser = new User({
      username,
      email,
      password, // In a production environment, you should hash the password before saving it
    });

    // Save the user data to the database
    const result = await newUser.save();

    // Send a success response
    res.status(201).send(result);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ----------------------------------------------------------------------------------------------
app.post("/login", async (req, res) => {
  try {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    // Check if the user exists in the database based on the email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // At this point, the user is successfully authenticated
    res.status(201).send(user);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// -----------------------------------------------------------------------------------------------
app.post("/add-product", async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, price, category, company, userId } = req.body;

    // Create a new product instance using the Product model
    const newProduct = new Product({
      name,
      price,
      category,
      company,
      userId,
    });

    // Save the product data to the database
    await newProduct.save();

    // Send a success response
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// --------------------------------------------------------------------------------------------
app.get("/allproducts/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Retrieve products with the specified user ID from the database
    const products = await Product.find({ userId : id});

    // Send the list of products as a response
    res.send(products);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ---------------------------------------------------------------------------------------
app.delete("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Use deleteOne to remove the product with the specified ID
    const result = await Product.deleteOne({ _id: productId });

    // Check if the product was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// -----------------------------------------------------------------------------------------------
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Retrieve products with the specified user ID from the database
    const products = await Product.findOne({ _id : id});

    // Send the list of products as a response
    res.send(products);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ------------------------------------------------------------------------------------------------------
app.put("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, price, category, company, userId } = req.body;

    // Use findOneAndUpdate to update the product with the specified ID
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { name, price, category, company, userId } },
      { new: true } // Return the updated document
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Send the updated product as a response
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ----------------------------------------------------------------------------------------
app.listen(5000,function(){
  console.log("server is running ");
});