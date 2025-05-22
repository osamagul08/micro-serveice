import Link from 'next/link';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box
} from '@mui/material';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <TableRow key={ticket.id} hover>
        <TableCell component="th" scope="row">
          <Typography variant="body1" fontWeight="medium">
            {ticket.title}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="primary" fontWeight="bold">
            ${ticket.price}
          </Typography>
        </TableCell>
        <TableCell>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} passHref>
            <Button variant="outlined" size="small">
              View
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Available Tickets
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="tickets table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">
                    Price
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticketList}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');
  return { tickets: data };
};

export default LandingPage;