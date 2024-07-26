const { Product,Company, Category } = require('../models/models');

const updateProduct = async (req, res) => {
    try {
      const { id, productName, category, company, price, discount, rating } = req.body;
  
      // Check if the category exists, if not, create it
      let categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        categoryDoc = new Category({ name: category });
        await categoryDoc.save();
      }
  
      // Check if the company exists, if not, create it
      let companyDoc = await Company.findOne({ name: company });
      if (!companyDoc) {
        companyDoc = new Company({ name: company, description: "Default description" }); // Adjust this as needed
        await companyDoc.save();
      }
  
      // Update the product
      const updatedProduct = await Product.findOneAndUpdate(
        { id },  // Ensure this is the correct identifier, MongoDB typically uses `_id`
        { productName, category: categoryDoc.name, company: companyDoc.name, price, discount, rating },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  


const insertProduct = async (req, res) => {
    const { productName, price, discount, rating, availability, category, company } = req.body;

    try {
        let categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            categoryDoc = new Category({ name: category });
            await categoryDoc.save();
        }

        let companyDoc = await Company.findOne({ name: company });
        if (!companyDoc) {
            companyDoc = new Company({ name: company, description: "Default description" });
            await companyDoc.save();
        }

        const newProduct = new Product({
            productName,
            price,
            discount,
            rating,
            availability,
            category: categoryDoc.name,
            company: companyDoc.name
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Failed to insert product:', error);
        res.status(500).json({ message: 'Failed to insert product', error: error.message });
    }
};


module.exports = {
  updateProduct,
  insertProduct
};