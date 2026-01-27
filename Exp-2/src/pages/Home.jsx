import { Container, Grid, Paper, Typography, Stack } from '@mui/material';
import Button from '../components/Button.jsx';
import TextField from '../components/TextField.jsx';
import Select from '../components/Select.jsx';
import Rating from '../components/Rating.jsx';
import Checkbox from '../components/Checkbox.jsx';

export default function Home() {
    return (
        <Container maxWidth="lg" sx={{ pt: 2 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3, background: '#fff', boxShadow: '0 12px 35px rgba(15, 23, 42, 0.08)' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>UI Components Showcase</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Quick previews of five essential Material-UI components.
                </Typography>
            </Paper>

            <Grid container spacing={2.5}>
                {[{ title: 'Button', comp: <Button /> },
                  { title: 'TextField', comp: <TextField /> },
                  { title: 'Select', comp: <Select /> },
                  { title: 'Rating', comp: <Rating /> },
                  { title: 'Checkbox', comp: <Checkbox /> }].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.title}>
                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, height: '100%', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)', border: '1px solid #eef2f7' }}>
                            <Stack spacing={2} alignItems="flex-start">
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {item.title}
                                </Typography>
                                {item.comp}
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}