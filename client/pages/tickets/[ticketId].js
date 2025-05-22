import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  Chip,
} from "@mui/material";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography component="h1" variant="h3" gutterBottom>
            {ticket.title}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Chip
              label={`$${ticket.price}`}
              color="primary"
              size="large"
              sx={{ fontSize: "1.2rem", padding: "20px 12px" }}
            />
          </Box>
          {errors && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors}
            </Alert>
          )}
          <Button
            onClick={() => doRequest()}
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Purchase
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};

export default TicketShow;
