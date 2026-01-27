import React from 'react';
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
  Box,
  Grid,
} from '@mui/material';
import Button from '../components/Button.jsx';
import TextField from '../components/TextField.jsx';
import Select from '../components/Select.jsx';
import Rating from '../components/Rating.jsx';
import Checkbox from '../components/Checkbox.jsx';

const students = [
  { id: 1, name: 'Rahul Kumar', roll: '101', grade: 'A' },
  { id: 2, name: 'Priya Sharma', roll: '102', grade: 'A+' },
  { id: 3, name: 'Amit Singh', roll: '103', grade: 'B+' },
  { id: 4, name: 'Sneha Patel', roll: '104', grade: 'A' },
];

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Student Data Table
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
        Student Records
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 12px 35px rgba(15, 23, 42, 0.08)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Roll</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Grade</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.roll}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 6, fontWeight: 600 }}>
        Components Demo
      </Typography>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)', border: '1px solid #eef2f7' }}>
        <Grid container spacing={2.5}>
          {[{ title: 'Button', comp: <Button /> },
            { title: 'TextField', comp: <TextField /> },
            { title: 'Select', comp: <Select /> },
            { title: 'Rating', comp: <Rating /> },
            { title: 'Checkbox', comp: <Checkbox /> }].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                  {item.comp}
                </Box>
              </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}