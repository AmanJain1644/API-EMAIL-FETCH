import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Grid, Card, CardContent
} from '@mui/material';

const AddProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    category: '',
    company: '',
    price: 0,
    discount: 0,
    rating: 0,
    availability: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!newProduct.productName || !newProduct.category || !newProduct.company || newProduct.price === 0 || newProduct.discount === 0 || newProduct.rating === 0 || !newProduct.availability) {
        alert('Please fill in all fields.');
        return;
      }

    try {
      const response = await fetch('/api/products/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      // Notify user of success and reset the form fields
      alert('Product added successfully!');
      setNewProduct({
        productName: '',
        category: '',
        company: '',
        price: 0,
        discount: 0,
        rating: 0,
        availability: '',
      });
    } catch (error) {
      // Handle errors if the server response was not ok
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>Add New Product</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="productName"
                value={newProduct.productName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                name="company"
                value={newProduct.company}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Discount"
                name="discount"
                type="number"
                value={newProduct.discount}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Rating"
                name="rating"
                type="number"
                value={newProduct.rating}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Availability"
                name="availability"
                value={newProduct.availability}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} onClick={handleSubmit} variant="contained" color="success">
            Add Product
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddProductPage;
