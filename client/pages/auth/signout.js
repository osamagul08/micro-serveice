import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '50vh'
      }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6">Signing you out...</Typography>
      </Box>
    </Container>
  );
};
