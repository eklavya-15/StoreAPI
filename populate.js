require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./model/products');
const jsonProducts = require('./products.json');

async function seedDatabase() {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);

    // Remove existing products (optional)
    await Product.deleteMany();

    // Insert products from the JSON file into the database
    const insertedProducts = await Product.insertMany(jsonProducts);

    console.log(`${insertedProducts.length} products inserted.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    process.exit();
  }
}

seedDatabase();
