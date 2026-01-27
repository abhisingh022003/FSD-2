import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from '@mui/material';
import CustomButton from '../components/Button.jsx';
import CustomTextField from '../components/TextField.jsx';
import CustomSelect from '../components/Select.jsx';
import CustomRating from '../components/Rating.jsx';
import CustomCheckbox from '../components/Checkbox.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    setModalOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Form
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Get In Touch
      </Typography>
      <Card sx={{ boxShadow: '0 12px 35px rgba(15, 23, 42, 0.08)', borderRadius: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              margin="normal"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Submission Successful</DialogTitle>
        <DialogContent>
          <Typography>Your form has been submitted successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" gutterBottom sx={{ mt: 6 }}>
        Components Demo
      </Typography>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)', border: '1px solid #eef2f7' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Button</Typography>
            <CustomButton />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>TextField</Typography>
            <CustomTextField />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Select</Typography>
            <CustomSelect />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Rating</Typography>
            <CustomRating />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Checkbox</Typography>
            <CustomCheckbox />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}