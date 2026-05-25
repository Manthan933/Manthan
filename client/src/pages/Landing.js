import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Link
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden'
}));

const HeaderStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Safari support
  backgroundColor: 'rgba(255, 255, 255, 0.72)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 1000
}));

const HeroStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0, 8, 0),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(16, 0, 12, 0)
  }
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-15%',
  right: '-10%',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: `radial-gradient(circle, rgba(0, 171, 85, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`,
  filter: 'blur(60px)',
  pointerEvents: 'none',
  zIndex: 0
}));

const HeroOverlaySecondary = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-10%',
  left: '-10%',
  width: '400px',
  height: '400px',
  borderRadius: '50%',
  background: `radial-gradient(circle, rgba(51, 102, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)`,
  filter: 'blur(50px)',
  pointerEvents: 'none',
  zIndex: 0
}));

const FeaturesSectionStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  position: 'relative',
  zIndex: 1
}));

const FeatureCardStyle = styled(Card)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.customShadows?.z24 || '0 24px 48px 0 rgba(145, 158, 171, 0.24)',
    borderColor: theme.palette.primary.light
  }
}));

const IconWrapperStyle = styled(Box)(({ theme }) => ({
  width: 72,
  height: 72,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
  fontSize: '2rem',
  boxShadow: '0 8px 16px 0 rgba(0, 171, 85, 0.12)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotate(15deg) scale(1.1)'
  }
}));

const FooterStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

const FEATURES = [
  {
    icon: '📝',
    title: 'Create Tests',
    description: 'Design intuitive, customized online exams and quizzes with ease. Set time limits, customize scoring rules, and add detailed descriptions for seamless student prep.',
    color: '#00AB55',
    bg: 'rgba(0, 171, 85, 0.1)'
  },
  {
    icon: '🏫',
    title: 'Manage Classrooms',
    description: 'Organize dynamic class portals, invite students via secure join codes, and streamline collaborative interactions within a single, dedicated platform.',
    color: '#3366FF',
    bg: 'rgba(51, 102, 255, 0.1)'
  },
  {
    icon: '⚡',
    title: 'Real-Time Results',
    description: 'Instant, automated evaluation of tests provides teachers and students with immediate transparency and scoring summaries as soon as the test ends.',
    color: '#FFC107',
    bg: 'rgba(255, 193, 7, 0.1)'
  },
  {
    icon: '🔒',
    title: 'Secure Authentication',
    description: 'Robust user account controls ensure only authorized students can access assessments, preserving academic integrity and data privacy.',
    color: '#FF4842',
    bg: 'rgba(255, 72, 66, 0.1)'
  },
  {
    icon: '📊',
    title: 'Student Analytics',
    description: 'In-depth classroom summaries and detailed score cards enable teachers to identify key performance trends and track learning progress over time.',
    color: '#1890FF',
    bg: 'rgba(24, 144, 255, 0.1)'
  }
];

export default function Landing() {
  return (
    <RootStyle title="Manthan - Interactive Classroom & Test Platform">
      {/* HEADER NAVBAR */}
      <HeaderStyle>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
            <Logo sx={{ width: 120, height: 60 }} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                color="primary"
                sx={{ borderRadius: '8px', px: 3 }}
              >
                Sign In
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                sx={{ borderRadius: '8px', px: 3, boxShadow: '0 8px 16px 0 rgba(0, 171, 85, 0.24)' }}
              >
                Register
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </HeaderStyle>

      {/* HERO SECTION */}
      <HeroStyle>
        <HeroOverlay />
        <HeroOverlaySecondary />
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={7}>
              <Stack spacing={4}>
                <Typography variant="h1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  Transform Assessment with{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(90deg, #00AB55 0%, #3366FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Manthan
                  </Box>
                </Typography>

                <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 'normal', lineHeight: 1.6 }}>
                  An all-in-one platform for teachers and students. Create comprehensive exams, administer tests securely, manage interactive classrooms, and review live, automatic feedback.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{
                      borderRadius: '10px',
                      px: 5,
                      py: 1.5,
                      fontSize: '1rem',
                      boxShadow: '0 8px 24px 0 rgba(0, 171, 85, 0.3)'
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    size="large"
                    color="inherit"
                    sx={{
                      borderRadius: '10px',
                      px: 5,
                      py: 1.5,
                      fontSize: '1rem',
                      borderColor: 'text.secondary'
                    }}
                  >
                    Explore Dashboard
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                src="/static/illustrations/illustration_login.png"
                alt="Manthan Dashboard Illustration"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  filter: 'drop-shadow(0px 20px 40px rgba(145, 158, 171, 0.16))',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                    '100%': { transform: 'translateY(0px)' }
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroStyle>

      {/* WHY CHOOSE MANTHAN (FEATURES SECTION) */}
      <FeaturesSectionStyle id="features">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(90deg, #3366FF 0%, #00AB55 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Why Choose Manthan?
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}>
              Empower your educational experience with tools built for simplicity, robust efficiency, and reliable academic integrity.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {FEATURES.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                <FeatureCardStyle>
                  <IconWrapperStyle sx={{ backgroundColor: feature.bg, border: `1px solid ${feature.color}` }}>
                    {feature.icon}
                  </IconWrapperStyle>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </FeatureCardStyle>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeaturesSectionStyle>

      {/* FOOTER */}
      <FooterStyle>
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center">
            <Logo sx={{ width: 100, height: 50, filter: 'grayscale(100%)', opacity: 0.6 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              &copy; {new Date().getFullYear()} Manthan. Open-source educational technology.
            </Typography>
            <Link
              href="https://github.com/Manthan933/Manthan"
              target="_blank"
              rel="noopener"
              variant="caption"
              sx={{ color: 'primary.main', textDecoration: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              GitHub Repository
            </Link>
          </Stack>
        </Container>
      </FooterStyle>
    </RootStyle>
  );
}
