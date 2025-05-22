import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  LinearProgress,
  Chip,
} from "@mui/material";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" color="error">
              Order Expired
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  const progressValue = Math.max(0, (timeLeft / 900) * 100); // Assuming 15 min expiry

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            Complete Your Payment
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Time left to pay:
            </Typography>
            <Chip
              label={`${timeLeft} seconds`}
              color={timeLeft < 60 ? "error" : "primary"}
              size="large"
            />
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{ mt: 2, height: 8, borderRadius: 4 }}
              color={timeLeft < 60 ? "error" : "primary"}
            />
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <StripeCheckout
              token={({ id }) => doRequest({ token: id })}
              stripeKey="pk_test_JMdyKVvf8EGTB0Fl28GsN7YY"
              amount={order.ticket.price * 100}
              email={currentUser.email}
            />
          </Box>
          {errors && <Alert severity="error">{errors}</Alert>}
        </Paper>
      </Box>
    </Container>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
