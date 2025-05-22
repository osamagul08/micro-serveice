import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box
} from '@mui/material';

const OrderIndex = ({ orders }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Orders
          </Typography>
          <List>
            {orders.map((order) => {
              return (
                <ListItem 
                  key={order.id}
                  sx={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    mb: 1,
                    backgroundColor: '#fafafa'
                  }}
                >
                  <ListItemText
                    primary={order.ticket.title}
                    secondary={`Order ID: ${order.id}`}
                  />
                  <Chip 
                    label={order.status} 
                    color={order.status === 'complete' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;
