// material
import { Grid, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ClassCard, NewClassPopover } from '../components/dashboard';
//
import classrooms from '../_mocks_/blog';

export default function Dashboard() {
  return (
    <Page>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Classrooms
          </Typography>
          <NewClassPopover />
        </Stack>
        <Grid container spacing={3}>
          {classrooms.map((classroom, index) => (
            <ClassCard key={classroom.id} classroom={classroom} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
