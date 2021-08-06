// material
import { Stack, Container, Typography, Paper } from '@material-ui/core';
// components
import Page from '../components/Page';
import TestForm from '../components/test/TestForm';
import CountdownTimer from '../components/test/Timer';
// ----------------------------------------------------------------------

export default function Test() {
  return (
    <Page>
      <Container component={Paper} elevation={5} maxWidth="md" style={{ padding: '2.5%' }}>
        <Stack direction="row" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Test
          </Typography>
          <CountdownTimer />
        </Stack>
        <Container>
          <TestForm />
        </Container>
      </Container>
    </Page>
  );
}
