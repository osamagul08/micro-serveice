import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography component="h1" variant="h4" gutterBottom>
            Create a Ticket
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              inputProps={{ step: "0.01" }}
              value={price}
              onBlur={onBlur}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              size="large"
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NewTicket;
