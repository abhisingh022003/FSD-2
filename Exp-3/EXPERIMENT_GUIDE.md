# Experiment 3: Implement Routing in SPA

## Overview
This is a complete implementation of client-side routing in a Single Page Application (SPA) using React Router DOM v6. The application demonstrates all key routing concepts from the Full Stack Development II course.

## Project Setup

### Installation
```bash
npm install react-router-dom
```

### Verify Installation
```bash
npm list react-router-dom
```

## Features Implemented

### 1. ✅ Basic Routing Setup
- **BrowserRouter**: Uses HTML5 History API for clean URLs
- **Routes**: Container for route definitions
- **Route**: Maps paths to components
- **Layout**: Nested layout component with `<Outlet>`

### 2. ✅ Navigation Components
- **Link**: Basic navigation without page reload
- **NavLink**: Active state highlighting for current route
- Mobile-responsive hamburger menu

### 3. ✅ Pages Implemented
- **Home** (`/`): Landing page with SPA benefits
- **About** (`/about`): Information about the application
- **Products** (`/products`): Product listing grid
- **Product Details** (`/products/:productId`): Dynamic routes with URL parameters
- **Contact** (`/contact`): Contact form with form handling
- **Login** (`/login`): Authentication demo
- **Dashboard** (`/dashboard`): Protected route example
- **NotFound** (`/404`): 404 error page for invalid routes

### 4. ✅ Dynamic Routes
```jsx
<Route path="/products/:productId" element={<ProductDetail />} />
```
- Access parameters using `useParams()` hook
- URL examples: `/products/1`, `/products/2`, etc.

### 5. ✅ Nested Routes & Layout
```jsx
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  // ... other routes
</Route>
```
- Layout component wraps all pages
- Navigation and breadcrumbs persist across pages
- Content rendered in `<Outlet />`

### 6. ✅ Protected Routes
```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```
- Requires authentication to access
- Redirects to login page if not authenticated
- Uses localStorage for demo authentication

### 7. ✅ Programmatic Navigation
```jsx
const navigate = useNavigate();
navigate('/dashboard');
navigate(-1); // Go back
```
- Used in ProductDetail for "Back" button
- Used in Dashboard for "Logout" button
- Used in Login to redirect after successful login

### 8. ✅ Breadcrumb Navigation
- Shows current location in hierarchy
- Example: `Home / Products / Product 1`
- Clickable breadcrumb links
- Auto-generated from URL pathname

### 9. ✅ 404 Not Found Handling
```jsx
<Route path="*" element={<NotFound />} />
```
- Catches all unmatched routes
- Displays helpful error page
- Provides links back to valid pages

## File Structure

```
src/
├── App.jsx                 # Main routing configuration
├── App.css                 # Application styles
├── index.css              # Global styles
├── main.jsx               # Entry point
├── pages/
│   ├── Home.jsx          # Home page
│   ├── About.jsx         # About page
│   ├── Products.jsx      # Products listing
│   ├── ProductDetail.jsx # Individual product (dynamic)
│   ├── Contact.jsx       # Contact form
│   ├── Login.jsx         # Login page
│   ├── Dashboard.jsx     # Protected dashboard
│   └── NotFound.jsx      # 404 error page
└── components/
    ├── Layout.jsx        # Main layout with Outlet
    ├── Navigation.jsx    # Navigation bar with NavLinks
    ├── Breadcrumbs.jsx  # Breadcrumb navigation
    └── ProtectedRoute.jsx # Route protection component
```

## Routing Configuration (App.jsx)

```jsx
<BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
```

## Key React Router Hooks Used

### useParams()
Access URL parameters in dynamic routes:
```jsx
const { productId } = useParams();
```

### useNavigate()
Programmatic navigation:
```jsx
const navigate = useNavigate();
navigate('/dashboard');
navigate(-1); // Go back
```

### useLocation()
Get current location information:
```jsx
const location = useLocation();
const pathname = location.pathname;
```

### useSearchParams()
Handle query parameters (if needed):
```jsx
const [params, setParams] = useSearchParams();
```

## Authentication Demo

The application includes a simple authentication system:
1. Click "Login" in the navbar
2. Enter any username and password
3. Click "Login" button
4. You'll be redirected to `/dashboard`
5. Dashboard is now accessible from navbar
6. Click "Logout" to clear authentication

**Note**: This is for demonstration only. Real authentication requires:
- Secure token storage
- Server-side validation
- Protected API endpoints

## Testing Checklist

Test all these URLs to verify routing:

### Basic Navigation
- [ ] `/` - Home page
- [ ] `/about` - About page
- [ ] `/products` - Products listing
- [ ] `/contact` - Contact page
- [ ] `/login` - Login page

### Dynamic Routes
- [ ] `/products/1` - Product 1 details
- [ ] `/products/2` - Product 2 details
- [ ] `/products/999` - Should show "Product Not Found"

### Protected Routes
- [ ] `/dashboard` - Without login (redirects to `/login`)
- [ ] Login first, then visit `/dashboard`
- [ ] Click logout, `/dashboard` should redirect again

### Error Handling
- [ ] `/invalid-path` - Should show 404 page
- [ ] `/products/invalid` - Should show product not found
- [ ] Breadcrumb navigation on all pages

### Browser Features
- [ ] Navigate using navbar links
- [ ] Back/Forward buttons work correctly
- [ ] Direct URL access works
- [ ] Page refresh preserves route
- [ ] Mobile menu toggle on small screens

## Styling Features

- **Gradient Background**: Beautiful purple-blue gradient
- **Glass Morphism**: Navigation bar with backdrop blur
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Active Navigation**: Highlighted current page
- **Smooth Animations**: Slide-in effects for pages
- **Form Styling**: Consistent form design
- **Error Styling**: Distinct 404 page styling
- **Product Cards**: Grid layout with hover effects

## Performance Considerations

### Current Implementation
- All components are eagerly loaded
- Suitable for small to medium applications

### For Large Applications, Consider:
1. **Code Splitting**: Use lazy loading for routes
```jsx
const Home = lazy(() => import('./pages/Home'));
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</Suspense>
```

2. **Route-Based Code Splitting**: Load code per route
3. **Pre-fetching**: Load next likely route

## Browser Configuration

For production deployment, configure your server to serve `index.html` for all unmatched routes:

### Netlify (public/_redirects)
```
/* /index.html 200
```

### Vercel (vercel.json)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## Common Issues & Solutions

### Issue: Page shows 404 on direct access
**Solution**: Configure server redirects (see Browser Configuration above)

### Issue: Links cause page reload
**Solution**: Use `<Link>` or `<NavLink>` instead of `<a>` tags

### Issue: Route parameters are undefined
**Solution**: Check route definition matches parameter name

### Issue: Protected route not working
**Solution**: Verify localStorage key name is correct

### Issue: Navigate not working
**Solution**: Make sure component is inside BrowserRouter

## Experiment Deliverables

✅ **Completed Features**:
1. ✅ Multi-page SPA with 7+ pages
2. ✅ Navigation with active highlighting (NavLink)
3. ✅ Dynamic routes with URL parameters (/products/:id)
4. ✅ Nested routes with Layout component
5. ✅ Protected route with authentication
6. ✅ 404 Not Found error handling
7. ✅ Programmatic navigation (useNavigate)
8. ✅ Breadcrumb navigation system

**Submission Requirements**:
- [ ] Code with all routing features
- [ ] Live deployment (GitHub Pages / Vercel / Netlify)
- [ ] Screenshots of:
  - Home page
  - Navigation between pages
  - Dynamic route example (/products/1)
  - Breadcrumb navigation
  - 404 error page
  - Login and dashboard (protected route)

## Running the Application

### Development
```bash
npm run dev
```
Opens at http://localhost:5173

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Learning Outcomes Achieved (CO1 - BT3)

1. ✅ Understand client-side routing concepts
2. ✅ Install React Router DOM library
3. ✅ Implement basic routing with multiple pages
4. ✅ Create dynamic routes with URL parameters
5. ✅ Use nested routes for layouts
6. ✅ Implement programmatic navigation
7. ✅ Protect routes with authentication
8. ✅ Handle 404 Not Found pages

## Next Steps

Enhance the application with:
1. Route transitions and animations
2. Scroll restoration (top of page on route change)
3. Loading states for async components
4. Analytics tracking per route
5. Query parameter handling
6. Historical state preservation
7. Custom error boundaries
8. Auth token refresh logic

## Resources

- **React Router Documentation**: https://reactrouter.com
- **React Docs**: https://react.dev
- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/API/History_API
- **React Router v6 Migration Guide**: https://reactrouter.com/en/main/guides/migration-guide

## Contact

**Course**: Full Stack Development - II (23CSH-382)
**Semester**: 4th
**Instructor**: Mr. Prince Pal Singh (E18505)
**Email**: prince.18505@cumail.in

---

**Happy Routing!** 🚀
