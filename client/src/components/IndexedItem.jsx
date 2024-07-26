import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { Menu, Star } from '@mui/icons-material';

const IndexedItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/filterProducts`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        const foundProduct = products.find(item => item.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
          setEditedProduct(foundProduct);
        } else {
          throw new Error(`Product with ID ${id} not found`);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error fetching product: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      {/* Product Details */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <img
                  src={product.imageUrl || 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/PxG_GVE_Blog_Header-bike_1.width-1300.png'}
                  alt={product.productName}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              {isEditing ? (
                <>
                  <TextField
                    label="Product Name"
                    name="productName"
                    value={editedProduct.productName}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Category"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Company"
                    name="company"
                    value={editedProduct.company}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Discount"
                    name="discount"
                    type="number"
                    value={editedProduct.discount}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Rating"
                    name="rating"
                    type="number"
                    value={editedProduct.rating}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" color="primary" onClick={handleSaveClick}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" sx={{ color: '#f96209', mb: 2 }}>
                    {product.productName}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Company: {product.company}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#f96209', mr: 1 }}>
                      Price:
                    </Typography>
                    <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                    {product.discount > 0 && (
                      <Typography variant="body2" color="error" sx={{ ml: 1 }}>
                        {product.discount}% OFF
                      </Typography>
                    )}
                  </Box>
                  {product.discount > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        You save:
                      </Typography>
                      <Typography variant="body1" color="error">
                        ${((product.price * product.discount) / 100).toFixed(2)} ({product.discount}%)
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#f96209', mr: 1 }}>
                      Rating:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {Array.from(Array(Math.round(product.rating))).map((_, index) => (
                        <Star key={index} sx={{ color: '#fdd835', fontSize: '1.2rem', mb: '-3px' }} />
                      ))}
                    </Box>
                  </Box>
                  <Button variant="contained" color="primary" onClick={handleEditClick}>
                    Edit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IndexedItem;
