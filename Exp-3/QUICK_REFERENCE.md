# React Router v6 - Quick Reference Card

## Installation
```bash
npm install react-router-dom
```

---

## Basic Setup
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Components

### BrowserRouter
Provides routing context to entire app.
```jsx
<BrowserRouter>
  <Routes>...</Routes>
</BrowserRouter>
```

### Routes
Container for route definitions.
```jsx
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```

### Route
Maps URL path to component.
```jsx
<Route path="/about" element={<About />} />
<Route path="/products/:id" element={<ProductDetail />} />
<Route path="*" element={<NotFound />} />
```

### Link
Navigation without page reload.
```jsx
<Link to="/about">About</Link>
<Link to="/products/1">Product 1</Link>
```

### NavLink
Link with active state support.
```jsx
<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
  About
</NavLink>
```

### Outlet
Renders child routes in nested layouts.
```jsx
function Layout() {
  return (
    <div>
      <nav>Navigation</nav>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}
```

### Navigate
Redirect to another route.
```jsx
<Route path="/old" element={<Navigate to="/new" replace />} />
```

---

## Hooks

### useParams()
Access URL parameters.
```jsx
const { productId } = useParams();
// For /products/:productId → /products/1 → productId = "1"
```

### useNavigate()
Programmatic navigation.
```jsx
const navigate = useNavigate();

navigate('/home');                    // Go to home
navigate(-1);                         // Go back
navigate('/new', { replace: true }); // Replace history
```

### useLocation()
Get current location info.
```jsx
const location = useLocation();
location.pathname  // /products
location.search    // ?id=1
location.hash      // #section
```

### useSearchParams()
Manage query parameters.
```jsx
const [params, setParams] = useSearchParams();

const q = params.get('q');
setParams({ q: 'react' });
// URL: /search?q=react
```

---

## Routing Patterns

### Basic Routes
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

### Dynamic Routes
```jsx
<Route path="/products/:productId" element={<ProductDetail />} />

// In component:
const { productId } = useParams();
```

### Nested Routes
```jsx
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Route>
```

### Protected Routes
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// ProtectedRoute component:
export default function ProtectedRoute({ children }) {
  if (!isAuth()) return <Navigate to="/login" />;
  return children;
}
```

### 404 Handling
```jsx
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="*" element={<NotFound />} />
```

---

## Common Patterns

### Form Submission with Navigation
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  await submitForm(data);
  navigate('/success');
};
```

### Breadcrumb Navigation
```jsx
const location = useLocation();
const segments = location.pathname.split('/').filter(x => x);

return (
  <nav>
    {segments.map(segment => (
      <Link to={`/${segment}`}>{segment}</Link>
    ))}
  </nav>
);
```

### Conditional Routing
```jsx
<Route
  path="/admin"
  element={isAdmin ? <Admin /> : <Navigate to="/" />}
/>
```

### Back Button
```jsx
const navigate = useNavigate();
<button onClick={() => navigate(-1)}>Back</button>
```

### Redirect After Login
```jsx
const navigate = useNavigate();
const handleLogin = () => {
  setAuth(true);
  navigate('/dashboard');
};
```

---

## Query Parameters Example

```jsx
// /search?q=react&page=2

export default function Search() {
  const [params, setParams] = useSearchParams();
  
  const q = params.get('q');        // "react"
  const page = params.get('page');  // "2"
  
  return (
    <div>
      <p>Search for: {q}</p>
      <p>Page: {page}</p>
    </div>
  );
}
```

---

## URL Parameter Example

```jsx
// /products/1

<Route path="/products/:productId" element={<ProductDetail />} />

export default function ProductDetail() {
  const { productId } = useParams();  // "1"
  return <h1>Product {productId}</h1>;
}
```

---

## Router Types

### BrowserRouter (Recommended)
Clean URLs: `/about`
Requires server configuration.

### HashRouter
Hash URLs: `/#/about`
No server config needed.

### MemoryRouter
In-memory history (testing).

---

## Route Matching Order
```jsx
<Routes>
  {/* Static first */}
  <Route path="/products/new" element={<New />} />
  
  {/* Dynamic second */}
  <Route path="/products/:id" element={<Detail />} />
  
  {/* Wildcard last */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## Active Link Class

```jsx
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  About
</NavLink>

/* CSS */
.nav-link {
  color: gray;
}
.nav-link.active {
  color: blue;
  font-weight: bold;
}
```

---

## Redirect Pattern

```jsx
// Old route → New route
<Route path="/old-page" element={<Navigate to="/new-page" replace />} />

// Conditional redirect
isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />
```

---

## Navigation Example

```jsx
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    localStorage.setItem('auth', 'true');
    navigate('/dashboard');
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

---

## File Structure Pattern

```
src/
├── components/
│   ├── Layout.jsx
│   ├── Navigation.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   └── NotFound.jsx
└── App.jsx
```

---

## Deployment Config

### Netlify
```
/* /index.html 200
```

### Vercel
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Debugging Tips

```javascript
// Check current location
console.log(window.location.pathname);

// Check route parameters
const params = useParams();
console.log(params);

// Check authentication
console.log(localStorage.getItem('auth'));

// Navigate in console
navigate('/page');
```

---

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "useParams outside Route" | Hook outside Routes | Ensure inside Route |
| "Page reload on link click" | Using `<a>` tag | Use `<Link>` component |
| "404 on direct URL" | No server redirect | Configure server |
| "Parameter undefined" | Wrong parameter name | Check route definition |
| "Protected route fails" | Auth check wrong | Verify localStorage |

---

## Performance Tips

1. ✅ Use lazy loading for large components
2. ✅ Code split by route
3. ✅ Cache API responses
4. ✅ Avoid inline functions in Route
5. ✅ Use React.memo for heavy components

---

## Testing Routes

```bash
# Test URLs
/                 # Home
/about            # About
/products         # Products
/products/1       # Product detail
/products/999     # Invalid product
/login            # Login
/dashboard        # Protected
/invalid          # 404
```

---

**Quick Reference Complete!** ⚡
Print this card for quick lookup while coding.

---

*React Router v6 - Mastery in Seconds* 🚀
