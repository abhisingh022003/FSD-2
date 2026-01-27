import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1300,
            background: 'linear-gradient(90deg, #111827 0%, #1f2937 50%, #0f172a 100%)',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
              UI Components Gallery
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, pt: 10, px: { xs: 1.5, md: 3 }, pb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
