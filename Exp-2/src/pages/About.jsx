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
} from '@mui/material';
import Button from '../components/Button.jsx';
import Dropdown from '../components/Dropdown.jsx';
import TextField from '../components/TextField.jsx';

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

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Student Records
      </Typography>
      <TableContainer component={Paper}>
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

      <Typography variant="h5" gutterBottom sx={{ mt: 6 }}>
        Components Demo
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2 }}>
        <Button />
        <Dropdown />
        <TextField />
      </Box>
    </Container>
  );
}