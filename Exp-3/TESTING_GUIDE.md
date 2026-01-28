# Testing Guide - Experiment 3: SPA Routing

## Manual Testing Checklist

Complete all the following tests to verify the routing implementation:

---

## 1. Basic Navigation Tests

### Test 1.1: Navigate using Navbar Links
- [ ] Click "Home" link in navbar → Should load Home page
- [ ] Click "About" link in navbar → Should load About page
- [ ] Click "Products" link in navbar → Should load Products page
- [ ] Click "Contact" link in navbar → Should load Contact page
- [ ] Verify no page reload (smooth transition)

### Test 1.2: Active Link Highlighting
- [ ] Verify Home link is highlighted (active) when on Home page
- [ ] Visit About page → About link should be highlighted
- [ ] Visit Products page → Products link should be highlighted
- [ ] Visit Contact page → Contact link should be highlighted
- [ ] Active link has different background color (white with purple text)

### Test 1.3: Navbar Menu on Mobile
- [ ] Resize browser to mobile width (<768px)
- [ ] Verify hamburger menu appears (☰)
- [ ] Click hamburger menu → Navigation expands
- [ ] Click a link → Page changes and menu closes
- [ ] Click hamburger again → Menu collapses

---

## 2. Dynamic Routes Tests

### Test 2.1: Product Listing and Navigation
- [ ] Visit `/products` → See product grid with 4 items
- [ ] Verify each product shows: name, price, "View Details" button
- [ ] Click "View Details" for Product 1 → Navigate to `/products/1`
- [ ] URL in address bar changes to `/products/1`

### Test 2.2: Dynamic Product Details
- [ ] On `/products/1` → Product name: "React Router Guide"
- [ ] Visit `/products/2` → Product name: "SPA Development"
- [ ] Visit `/products/3` → Product name: "Web Development Pro"
- [ ] Visit `/products/4` → Product name: "Advanced React"

### Test 2.3: Product Detail Page Features
- [ ] Click "Back to Products" button → Navigate back to `/products`
- [ ] Breadcrumb shows "Home / products / 1" on detail page
- [ ] Price displays correctly for each product
- [ ] "What You'll Learn" list displays for product

### Test 2.4: Invalid Product ID
- [ ] Visit `/products/999` → See "Product Not Found" error
- [ ] Click "Back to Products" → Navigate to `/products`
- [ ] Visit `/products/abc` → See "Product Not Found" error

---

## 3. Nested Routes and Layout Tests

### Test 3.1: Layout Persistence
- [ ] Navigate through different pages
- [ ] Verify Navigation bar is always visible
- [ ] Verify breadcrumb navigation is always visible
- [ ] Verify footer is always visible
- [ ] Only page content changes

### Test 3.2: Breadcrumb Navigation
- [ ] On Home (`/`) → Breadcrumb shows "Home"
- [ ] On About (`/about`) → Breadcrumb shows "Home / about"
- [ ] On Products (`/products`) → Breadcrumb shows "Home / products"
- [ ] On Product 1 (`/products/1`) → Breadcrumb shows "Home / products / 1"
- [ ] Click breadcrumb link → Navigate to that section

### Test 3.3: Footer and Layout Structure
- [ ] Footer always visible at bottom of page
- [ ] Main content has proper padding and styling
- [ ] Layout background gradient visible on all pages

---

## 4. Protected Routes Tests

### Test 4.1: Unauthorized Access
- [ ] Visit `/dashboard` without logging in
- [ ] Should redirect to `/login` page
- [ ] URL changes to `/login`
- [ ] Cannot directly access dashboard

### Test 4.2: Login Flow
- [ ] Click "Login" in navbar → Navigate to `/login`
- [ ] On login page, verify:
  - Username input field
  - Password input field
  - Login button
  - Helpful hint message

### Test 4.3: Successful Login
- [ ] Enter any username (e.g., "admin")
- [ ] Enter any password (e.g., "password")
- [ ] Click "Login" button
- [ ] Should see success alert
- [ ] Redirected to `/dashboard`
- [ ] Dashboard content displays

### Test 4.4: Dashboard Access
- [ ] After login, "Dashboard" link appears in navbar
- [ ] Dashboard link is clickable
- [ ] Dashboard shows protected content
- [ ] URL is `/dashboard`

### Test 4.5: Logout
- [ ] On Dashboard, click "Logout" button
- [ ] See logout confirmation (redirected to login)
- [ ] URL changes to `/login`
- [ ] Dashboard link disappears from navbar
- [ ] Cannot access `/dashboard` anymore

---

## 5. 404 Not Found Tests

### Test 5.1: Invalid Routes
- [ ] Visit `/invalid-page` → See 404 error page
- [ ] Visit `/nonexistent` → See 404 error page
- [ ] Visit `/random-path` → See 404 error page

### Test 5.2: 404 Page Features
- [ ] 404 page shows heading "404 - Page Not Found"
- [ ] Shows requested path that doesn't exist
- [ ] Provides helpful links:
  - Go Home (to `/`)
  - About Us (to `/about`)
  - Products (to `/products`)
  - Contact (to `/contact`)

### Test 5.3: Recovery from 404
- [ ] Click "Go Home" link → Navigate to Home
- [ ] Click "Products" link → Navigate to Products
- [ ] Breadcrumb navigation works on 404 page

---

## 6. URL Direct Access Tests

### Test 6.1: Direct URL Access
- [ ] Type `/` in address bar → Home page loads
- [ ] Type `/about` in address bar → About page loads
- [ ] Type `/products` in address bar → Products list loads
- [ ] Type `/products/2` in address bar → Product 2 details load
- [ ] Type `/contact` in address bar → Contact page loads
- [ ] Type `/invalid` in address bar → 404 page loads

### Test 6.2: Page Refresh
- [ ] On Home page (`/`) → Press F5 → Still on Home
- [ ] On Products page (`/products`) → Refresh → Still on Products
- [ ] On Product detail (`/products/1`) → Refresh → Still on Product 1
- [ ] On Dashboard (after login) → Refresh → Still on Dashboard
- [ ] No errors in console after refresh

---

## 7. Browser Navigation Tests

### Test 7.1: Back Button
- [ ] Navigate: Home → About → Products
- [ ] Click browser back button → Go to About
- [ ] Click browser back button → Go to Home
- [ ] Click browser back button → Go to previous page

### Test 7.2: Forward Button
- [ ] Navigate: Home → Products → Contact
- [ ] Click back button twice → On Home
- [ ] Click forward button → Go to Products
- [ ] Click forward button → Go to Contact

### Test 7.3: Multiple Back Navigations
- [ ] On Products page, click "View Details" for Product 1
- [ ] Click "Back to Products" → Back to Products list
- [ ] Click back button → Go to Products (from navbar)
- [ ] Verify no infinite loops

---

## 8. Form Functionality Tests

### Test 8.1: Contact Form
- [ ] Navigate to `/contact`
- [ ] Fill in Name field → Type "John Doe"
- [ ] Fill in Email field → Type "john@example.com"
- [ ] Fill in Message field → Type "Test message"
- [ ] Click "Send Message" button
- [ ] See success alert with name
- [ ] Form clears after submission

### Test 8.2: Contact Form Validation
- [ ] Try submitting empty form
- [ ] Try submitting with only name
- [ ] Try submitting with invalid email
- [ ] Verify browser validation works

---

## 9. Responsive Design Tests

### Test 9.1: Desktop View (>1024px)
- [ ] All navbar links visible horizontally
- [ ] Product grid shows 3-4 items per row
- [ ] Page layout properly centered
- [ ] Breadcrumbs display correctly

### Test 9.2: Tablet View (768px - 1024px)
- [ ] Navbar adapts to tablet size
- [ ] Product grid shows 2-3 items per row
- [ ] Touch-friendly button sizes
- [ ] Form inputs properly sized

### Test 9.3: Mobile View (<768px)
- [ ] Hamburger menu appears
- [ ] Navbar links hidden until menu opens
- [ ] Product grid shows 1 item per row
- [ ] Forms stack vertically
- [ ] Breadcrumbs in mobile format
- [ ] Footer properly sized

---

## 10. Performance Tests

### Test 10.1: Navigation Speed
- [ ] Navigate between pages → Transitions are smooth
- [ ] No lag or delay in page switching
- [ ] Verify instant navigation (no page reload)

### Test 10.2: Console Errors
- [ ] Open browser DevTools (F12)
- [ ] Navigate through all pages
- [ ] Verify NO errors in console
- [ ] Verify NO warnings about routing

### Test 10.3: State Preservation
- [ ] On Contact form, type message
- [ ] Navigate away → Message is gone
- [ ] Navigate back to Contact
- [ ] Form is empty (state not preserved - expected)

---

## 11. Styling and UI Tests

### Test 11.1: Color Scheme
- [ ] Verify purple-blue gradient background
- [ ] Navbar has glass morphism effect
- [ ] Links change color on hover
- [ ] Active link is white with purple text

### Test 11.2: Button Styling
- [ ] Primary buttons (blue gradient) on hover show effect
- [ ] Secondary buttons have border style
- [ ] Logout button is red
- [ ] Buttons have cursor change on hover

### Test 11.3: Form Styling
- [ ] Input fields have border
- [ ] Focused inputs have blue border and shadow
- [ ] Labels are properly aligned
- [ ] Form is centered on page

---

## 12. Accessibility Tests

### Test 12.1: Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Links and buttons are keyboard accessible
- [ ] Forms can be filled with keyboard
- [ ] Enter key submits forms

### Test 12.2: Screen Reader (Optional)
- [ ] Page structure is semantic
- [ ] Links have meaningful text
- [ ] Form labels connected to inputs
- [ ] Headings properly nested

---

## 13. Edge Case Tests

### Test 13.1: Rapid Navigation
- [ ] Rapidly click between navbar links
- [ ] Verify app doesn't crash
- [ ] All pages load correctly

### Test 13.2: Same Route Navigation
- [ ] Click Products link while on Products page
- [ ] Page doesn't reload unnecessarily
- [ ] URL remains same

### Test 13.3: Special Characters in URL
- [ ] Visit `/products/test%20product`
- [ ] Visit `/products/1?query=test`
- [ ] Verify app handles gracefully

---

## Test Results Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Navigation with Links | ✓/✗ | |
| Active Link Highlighting | ✓/✗ | |
| Dynamic Routes | ✓/✗ | |
| Nested Routes | ✓/✗ | |
| Protected Routes | ✓/✗ | |
| 404 Handling | ✓/✗ | |
| Breadcrumbs | ✓/✗ | |
| Mobile Responsive | ✓/✗ | |
| Performance | ✓/✗ | |
| Forms | ✓/✗ | |

---

## Debugging Tips

### If pages don't load:
```javascript
// Check routes in browser console
console.log('Current location:', window.location.href);
```

### If navigation doesn't work:
- Verify `<BrowserRouter>` wraps entire app
- Check for typos in path names
- Ensure `<Outlet />` in Layout component

### If protected route fails:
- Check localStorage key in DevTools
- Verify ProtectedRoute component logic
- Check authentication state

### If styles don't load:
- Check browser console for CSS errors
- Verify App.css is imported
- Clear browser cache (Ctrl+Shift+Delete)

---

## Browser Compatibility

Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

**All tests passed? Experiment 3 is complete!** ✅
