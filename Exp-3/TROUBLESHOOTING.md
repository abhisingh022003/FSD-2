# Troubleshooting Guide - React Router Implementation

## Common Issues and Solutions

---

## Issue 1: Page Shows 404 on Direct URL Access

### Symptom
When you type a route directly in the address bar (e.g., `/about`), you get a 404 error instead of the page loading.

### Root Cause
The web server doesn't know how to handle routes that don't exist as actual files. It returns 404 before React Router can handle them.

### Solution

#### For Development (Vite)
The dev server automatically redirects unknown routes to `index.html`. This should work out of the box.

If not working:
1. Verify `vite.config.js` has proper configuration
2. Restart the dev server: `npm run dev`
3. Clear browser cache: `Ctrl+Shift+Delete`

#### For Production (Deployment)

**Netlify:**
Create `public/_redirects` file:
```
/* /index.html 200
```

**Vercel:**
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**GitHub Pages:**
Add to your build script or create `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Apache Server:**
Create `.htaccess` in root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
Update nginx.conf:
```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/html;

  location / {
    try_files $uri /index.html;
  }
}
```

---

## Issue 2: Links Cause Page Reload

### Symptom
Clicking a link causes the entire page to reload instead of smooth navigation.

### Root Cause
Using `<a>` tags instead of React Router's `<Link>` or `<NavLink>` components.

### Solution

❌ **Wrong:**
```jsx
<a href="/about">About</a>
```

✅ **Correct:**
```jsx
import { Link, NavLink } from 'react-router-dom';

// For basic links:
<Link to="/about">About</Link>

// For active state highlighting:
<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
  About
</NavLink>
```

---

## Issue 3: URL Parameters are Undefined

### Symptom
`useParams()` returns an object with undefined values.

### Root Cause
- Route path doesn't match component's parameter usage
- Parameter name mismatch between route and useParams

### Solution

✅ **Correct:**
```jsx
// Route definition
<Route path="/products/:productId" element={<ProductDetail />} />

// Component
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams(); // Name must match!
  console.log(productId); // Will have value
}
```

❌ **Wrong:**
```jsx
// Route definition
<Route path="/products/:id" element={<ProductDetail />} />

// Component
export default function ProductDetail() {
  const { productId } = useParams(); // Wrong name!
  console.log(productId); // Will be undefined
}
```

---

## Issue 4: useNavigate() Not Working

### Symptom
`navigate()` doesn't change the route or throws an error.

### Root Cause
Component is not inside a `<BrowserRouter>` provider.

### Solution

✅ **Correct:**
```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Then in any component inside Routes:
```jsx
import { useNavigate } from 'react-router-dom';

export default function MyComponent() {
  const navigate = useNavigate(); // Works!
  
  const handleClick = () => {
    navigate('/about');
  };
  
  return <button onClick={handleClick}>Go to About</button>;
}
```

❌ **Wrong:**
```jsx
// Component used outside BrowserRouter
export default function MyComponent() {
  const navigate = useNavigate(); // Error: useNavigate outside Router
  // ...
}
```

---

## Issue 5: Protected Route Always Redirects

### Symptom
Even after logging in, protected routes redirect to login page.

### Root Cause
Authentication state check is looking for wrong localStorage key or value.

### Solution

**Check your localStorage key is consistent:**

```jsx
// In Login.jsx - when saving auth
localStorage.setItem('isAuthenticated', 'true');

// In ProtectedRoute.jsx - when checking auth
const isAuthenticated = localStorage.getItem('isAuthenticated');

if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}
```

**Debug in browser console:**
```javascript
// Check if localStorage is set correctly
console.log(localStorage.getItem('isAuthenticated'));

// Manually set for testing
localStorage.setItem('isAuthenticated', 'true');

// Clear when done
localStorage.removeItem('isAuthenticated');
```

---

## Issue 6: Nested Routes Not Rendering

### Symptom
Nested routes in Layout don't show content when clicked.

### Root Cause
- Missing `<Outlet />` in Layout component
- Routes not properly nested
- Wrong path structure

### Solution

✅ **Correct:**
```jsx
// App.jsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/products" element={<Products />} />
  </Route>
</Routes>

// Layout.jsx
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet /> {/* Required! */}
      </main>
      <Footer />
    </div>
  );
}
```

❌ **Wrong - Missing Outlet:**
```jsx
export default function Layout() {
  return (
    <div>
      <Navigation />
      {/* Missing <Outlet /> - nothing renders here! */}
      <Footer />
    </div>
  );
}
```

---

## Issue 7: 404 Wildcard Not Catching Routes

### Symptom
Invalid routes don't show 404 page, instead show blank page or error.

### Root Cause
Wildcard route is not at the end of Routes list.

### Solution

✅ **Correct - Wildcard LAST:**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="*" element={<NotFound />} /> {/* Must be last! */}
</Routes>
```

❌ **Wrong - Wildcard catches everything:**
```jsx
<Routes>
  <Route path="*" element={<NotFound />} /> {/* Wrong position! */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  // These routes never match!
</Routes>
```

---

## Issue 8: Breadcrumb Navigation Broken

### Symptom
Breadcrumb doesn't show or shows incorrect paths.

### Root Cause
- Logic error in breadcrumb generation
- useLocation not imported
- Empty pathname

### Solution

**Verify useLocation works:**
```jsx
import { useLocation } from 'react-router-dom';

export default function DebugBreadcrumb() {
  const location = useLocation();
  
  console.log('Current path:', location.pathname);
  console.log('Path segments:', location.pathname.split('/').filter(x => x));
  
  return <div>{location.pathname}</div>;
}
```

**Fix breadcrumb component:**
```jsx
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  // Always show Home link
  if (pathSegments.length === 0) {
    return <nav className="breadcrumbs">Home</nav>;
  }

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/');
        return (
          <span key={path}>
            <span> / </span>
            <Link to={path}>{segment}</Link>
          </span>
        );
      })}
    </nav>
  );
}
```

---

## Issue 9: State Lost When Navigating

### Symptom
Form data or state disappears when navigating away and back.

### Root Cause
Component is unmounted when you navigate away, losing its local state.

### Solution

**Option 1: Use Context API**
```jsx
import { createContext, useState } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState({});
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
```

**Option 2: Use localStorage**
```jsx
import { useState, useEffect } from 'react';

export default function Form() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Use formData...
}
```

**Option 3: Use React Query or similar**
Use a caching library for API data.

---

## Issue 10: Multiple Route Parameters

### Symptom
Can't access multiple parameters from URL.

### Root Cause
Incorrect route definition or parameter destructuring.

### Solution

✅ **Correct:**
```jsx
// Route definition with multiple parameters
<Route path="/users/:userId/posts/:postId" element={<Post />} />

// Component
import { useParams } from 'react-router-dom';

export default function Post() {
  const { userId, postId } = useParams();
  
  return (
    <div>
      <p>User: {userId}</p>
      <p>Post: {postId}</p>
    </div>
  );
}

// URL: /users/123/posts/456
// userId = "123", postId = "456"
```

---

## Issue 11: Browser Console Warnings

### Warning: React Router
"Warning: You should call navigate() inside a function, not during render"

### Solution
Don't call navigate during render:

❌ **Wrong:**
```jsx
export default function BadComponent() {
  const navigate = useNavigate();
  navigate('/home'); // Called during render!
  return <div>Loading...</div>;
}
```

✅ **Correct:**
```jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoodComponent() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/home'); // Called in effect
  }, [navigate]);
  
  return <div>Loading...</div>;
}
```

---

## Issue 12: CSS Not Loading on Nested Routes

### Symptom
Styles work on `/` but not on `/about` or other routes.

### Root Cause
CSS file path issue in nested components or CSS import not at root level.

### Solution

**Import CSS in App.jsx (not in pages):**
```jsx
// App.jsx
import './App.css'; // Import at root

function App() {
  return (
    <BrowserRouter>
      {/* Routes... */}
    </BrowserRouter>
  );
}
```

**Verify CSS is imported:**
```bash
# Check if App.css exists
ls -la src/App.css
```

---

## Issue 13: Query Parameters Not Working

### Symptom
`useSearchParams()` returns empty values.

### Root Cause
Query parameters are different from URL parameters.

### Solution

```jsx
import { useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get individual parameters
  const query = searchParams.get('q');
  const page = searchParams.get('page');
  
  // Update parameters
  const handleSearch = (term) => {
    setSearchParams({ q: term, page: 1 });
  };
  
  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      <p>Query: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}

// URL: /search?q=react&page=2
// query = "react"
// page = "2"
```

---

## Debugging Checklist

### Before Everything
- [ ] Restart dev server (`npm run dev`)
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Open DevTools (F12)
- [ ] Check Console tab for errors

### For Route Issues
- [ ] Verify route path spelling
- [ ] Check parameter names match
- [ ] Verify wildcard is last
- [ ] Ensure `<BrowserRouter>` wraps entire app

### For Navigation Issues
- [ ] Use `<Link>` not `<a>` tags
- [ ] Check component is inside Routes
- [ ] Verify useNavigate is called in effect/handler

### For Nested Routes
- [ ] Verify `<Outlet />` in Layout
- [ ] Check route nesting structure
- [ ] Test with simple component first

### For Protected Routes
- [ ] Check localStorage in DevTools
- [ ] Console.log authentication state
- [ ] Verify redirect path is correct

### For Styling
- [ ] Check CSS is imported in root component
- [ ] Verify file paths are correct
- [ ] Open Network tab to see if CSS loads

---

## Useful Browser DevTools Commands

```javascript
// Check current route
console.log(window.location.pathname);

// Check localStorage
console.log(localStorage.getItem('isAuthenticated'));

// Set authentication for testing
localStorage.setItem('isAuthenticated', 'true');

// Clear localStorage
localStorage.clear();

// Check if React is loaded
console.log(window.React);

// Check routing info
console.log('All props:', this.props);
```

---

## Still Having Issues?

1. **Clear everything**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Check package versions**
   ```bash
   npm list react-router-dom
   npm list react
   npm list react-dom
   ```

3. **Restart your IDE**
   - Close and reopen VS Code
   - Refresh browser (Ctrl+F5)

4. **Search error message**
   - Copy exact error from console
   - Search on Google or Stack Overflow

5. **Check official docs**
   - https://reactrouter.com
   - https://react.dev

---

**Still stuck? Ask your instructor!** 📞
