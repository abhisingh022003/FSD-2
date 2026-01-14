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
} from '@mui/material';

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
      <Card>
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
    </Container>
  );
}