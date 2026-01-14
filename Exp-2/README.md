# Full Stack - II (23CSH-382) Experiment 2

## Design UI using Component Libraries (Material UI / Bootstrap)

**Academic Session 2025–26 EVEN Semester Jan–Jun 2026**  
**UNIVERSITY INSTITUTE OF ENGINEERING DEPARTMENT AIT-CSE CORE & AIML**  
**Program Code: AI201 Semester: 4th**

### Experiment Objectives
**Learning Outcomes (CO1 - BT3):**
1. Understand UI component libraries and their benefits
2. Install and configure Material UI and Bootstrap in React
3. Design professional UI layouts using pre-built components
4. Customize themes and styles for branding
5. Implement responsive grid systems
6. Create forms with validation using library components
7. Build a complete dashboard interface

### Technologies Used
- **React 19** with Vite
- **Material UI (MUI)** - Primary UI library
- **React Bootstrap** - Secondary UI library for comparison
- **Custom CU Theme** - Chandigarh University branding (#c00000 red, #808080 gray)

### Features Implemented

#### ✅ Navigation Bar
- Responsive AppBar with hamburger menu
- Collapsible sidebar navigation
- Multiple views: Dashboard, Data Table, Forms, Product Cards, Settings

#### ✅ Sidebar Navigation
- Material UI Drawer component
- Menu items with icons
- Mobile-responsive (collapses on small screens)

#### ✅ Dashboard with Stat Cards
- 4 stat cards: Users, Orders, Revenue, Products
- Icons from Material UI Icons
- Responsive grid layout (12-column system)

#### ✅ Data Table
- Material UI Table component
- Sample student data
- Hover effects and proper styling

#### ✅ Forms with Validation
- Contact form with TextField, Select
- Form submission handling
- Modal dialog for success feedback

#### ✅ Modal Dialogs
- Confirmation modal using Material UI Dialog
- Proper state management

#### ✅ Product Cards Comparison
- Same product card implemented in both Material UI and Bootstrap
- Features: Image, title, description, rating, price, "Add to Cart" button
- Demonstrates library differences

#### ✅ Responsive Grid System
- Material UI Grid with breakpoints (xs, sm, md, lg)
- Bootstrap grid classes for comparison

#### ✅ Custom CU Branding Theme
- Primary color: #c00000 (CU Red)
- Secondary color: #808080 (CU Gray)
- Roboto font family
- Consistent styling across components

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd exp-2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
src/
├── App.jsx          # Main application component
├── main.jsx         # Entry point with Bootstrap CSS
├── index.css        # Global styles
└── assets/          # Static assets

public/
├── index.html       # HTML template with fonts
└── vite.svg

package.json         # Dependencies and scripts
```

### Key Dependencies
```json
{
  "@mui/material": "^6.x",
  "@mui/icons-material": "^6.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",
  "react-bootstrap": "^2.x",
  "bootstrap": "^5.x"
}
```

### Component Libraries Comparison

| Feature | Material UI | Bootstrap |
|---------|-------------|-----------|
| Design System | Google Material | Classic/Custom |
| React Integration | Native components | React wrapper |
| Bundle Size | ~300KB | ~150KB |
| Learning Curve | Moderate | Easy |
| Grid System | 12-column | 12-column |
| Best For | Modern apps | Quick prototypes |

### Screenshots

#### Dashboard Overview
![Dashboard](screenshots/dashboard.png)
*Main dashboard with stat cards and navigation*

#### Data Table
![Data Table](screenshots/table.png)
*Student data table with Material UI components*

#### Contact Form
![Forms](screenshots/forms.png)
*Responsive form with validation*

#### Product Cards Comparison
![Product Cards](screenshots/cards.png)
*Same component in Material UI (left) and Bootstrap (right)*

### Performance Optimization
- Tree shaking enabled for unused components
- Production build optimized
- Bundle analysis available via `vite-bundle-analyzer`

### Accessibility Features
- ARIA labels built-in
- Keyboard navigation support
- Screen reader compatible
- WCAG color contrast compliance

### Deployment
The application is ready for deployment on:
- **Netlify**: Drag & drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Using GitHub Actions

### Learning Outcomes Achieved
1. ✅ UI component libraries benefits understood
2. ✅ Material UI and Bootstrap configured
3. ✅ Professional layouts designed
4. ✅ Custom themes implemented
5. ✅ Responsive grids implemented
6. ✅ Forms with validation created
7. ✅ Complete dashboard built

### Future Enhancements
- Dark mode toggle
- Data visualization (charts)
- User authentication
- Real-time notifications
- Advanced routing

### References
- [Material UI Documentation](https://mui.com)
- [React Bootstrap Docs](https://react-bootstrap.github.io)
- [Bootstrap Documentation](https://getbootstrap.com)

**Submitted by:** [Your Name]  
**Roll Number:** [Your Roll]  
**Date:** January 2026

*Experiment completed under guidance of Mr. Prince Pal Singh, Assistant Professor*
