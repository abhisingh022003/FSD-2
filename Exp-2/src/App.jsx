import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
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
        <AppBar position="fixed" sx={{ zIndex: 1300 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <h2 style={{ margin: 0 }}>My App</h2>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, pt: 8, pl: 2, pr: 2 }}>
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
