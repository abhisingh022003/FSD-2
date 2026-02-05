# Experiment 6 - Documentation

## Quick Start Guide

### 1. Navigate to Project
```bash
cd /home/abhi-singh/FSD-2/Exp-6/form-handling-app
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Application
Open your browser and go to: **http://localhost:5173**

---

## Features Overview

### Form 1: Registration Form
**Purpose:** User registration with comprehensive validation

**Features:**
- Username validation (3-20 chars, alphanumeric + underscore)
- Email validation
- Password strength indicator (Weak/Medium/Strong)
- Password requirements:
  - Min 8 characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character
- Confirm password matching
- Terms & conditions checkbox
- Real-time validation on blur
- ARIA accessibility labels

**Test Cases:**
1. Try submitting empty form → All fields show errors
2. Enter username "ab" → Error: min 3 chars
3. Enter email "test@test" → Error: invalid email
4. Enter weak password "hello" → Red strength indicator
5. Enter strong password "Hello123!" → Green strength indicator
6. Enter mismatched confirm password → Error shown
7. Try to submit without accepting terms → Error shown
8. Fill all correctly → Success message displayed

---

### Form 2: Profile Form
**Purpose:** Complete profile management with file upload

**Features:**
- Profile picture upload with preview (max 2MB, images only)
- Personal information fields
- Multiple input types (text, email, tel, date, url, textarea)
- Radio buttons for gender
- Dropdown for country
- Dynamic skills fields (add/remove)
- Field array management
- File validation

**Test Cases:**
1. Upload image → Preview appears
2. Upload file > 2MB → Alert shown
3. Upload non-image file → Alert shown
4. Click "Remove" on image → Preview cleared
5. Add multiple skills → New fields appear
6. Remove skill → Field removed
7. Enter invalid phone (9 digits) → Error shown
8. Select future date for DOB → Error shown
9. Enter invalid URL → Error shown
10. Fill all correctly → Success with all data displayed

---

### Form 3: Multi-Step Form
**Purpose:** Professional application with step-by-step navigation

**Features:**
- 3-step process with visual progress
- Step 1: Personal Info (name, email)
- Step 2: Contact Info (phone, address, city, zip)
- Step 3: Professional Details (education, experience, role)
- Data persistence across steps
- Step-wise validation
- Back/Next navigation
- Final submission with complete review

**Test Cases:**
1. Try Next on empty Step 1 → Validation errors
2. Fill Step 1 correctly → Move to Step 2
3. Click Back → Returns to Step 1 with data preserved
4. Complete Step 2 → Move to Step 3
5. Complete Step 3 → Final submission
6. Verify all data in success screen → All info displayed
7. Click "Start New Application" → Reset to Step 1

---

## Validation Rules Summary

### Registration Form
| Field | Validation |
|-------|-----------|
| Username | Required, 3-20 chars, alphanumeric + _ |
| Email | Required, valid email |
| Password | Required, min 8, 1 upper, 1 lower, 1 digit, 1 special |
| Confirm Password | Required, must match password |
| Terms | Required, must be checked |

### Profile Form
| Field | Validation |
|-------|-----------|
| First Name | Required |
| Last Name | Required |
| Email | Required, valid email |
| Phone | 10 digits |
| DOB | Required, not future |
| Gender | Required |
| Country | Required |
| Website | Valid URL |
| Bio | Max 500 chars |
| Skills | Min 1 skill |
| Picture | Image, max 2MB |

### Multi-Step Form
| Step | Fields | Validation |
|------|--------|-----------|
| 1 | First Name, Last Name, Email | All required, email format |
| 2 | Phone, Address, City, Zip | Phone 10 digits, Zip 6 digits |
| 3 | Education, Experience, Role | All required |

---

## Technology Stack

### Core
- **React 18** - UI library
- **Vite** - Build tool
- **JavaScript (ES6+)** - Programming language

### Form Handling
- **React Hook Form** - Form state management
- **Yup** - Schema validation
- **@hookform/resolvers** - Yup integration

### Features Used
- **useState** - State management
- **useForm** - Form hook
- **useFieldArray** - Dynamic fields
- **yupResolver** - Validation resolver
- **FileReader API** - File preview
- **ARIA** - Accessibility

---

## Code Highlights

### 1. Password Strength Indicator
```javascript
const calculatePasswordStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[@$!%*?&#]/.test(pwd)) score++;
  
  if (score <= 2) return { score, label: 'Weak', color: '#ff4444' };
  if (score <= 4) return { score, label: 'Medium', color: '#ffaa00' };
  return { score, label: 'Strong', color: '#00aa00' };
};
```

### 2. File Upload Validation
```javascript
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file.size > 2 * 1024 * 1024) {
    alert('File size must be less than 2MB');
    return;
  }
  if (!file.type.startsWith('image/')) {
    alert('Only image files are allowed');
    return;
  }
  // Generate preview
  const reader = new FileReader();
  reader.onloadend = () => setPreview(reader.result);
  reader.readAsDataURL(file);
};
```

### 3. Yup Schema Example
```javascript
const schema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
});
```

### 4. Dynamic Fields
```javascript
const { fields, append, remove } = useFieldArray({
  control,
  name: 'skills'
});

// Add field
<button onClick={() => append({ name: '' })}>
  + Add Skill
</button>

// Remove field
<button onClick={() => remove(index)}>
  Remove
</button>
```

---

## Accessibility Features

1. **ARIA Labels**
   - `aria-invalid` on error fields
   - `aria-describedby` linking errors
   - `role="alert"` for error messages

2. **Semantic HTML**
   - Proper `<label>` elements
   - `htmlFor` attributes
   - `<fieldset>` for radio groups

3. **Keyboard Navigation**
   - Tab order preserved
   - Enter to submit
   - Focus management

4. **Screen Reader Support**
   - Descriptive labels
   - Error announcements
   - Status messages

---

## Common Issues & Solutions

### Issue 1: Form not validating
**Solution:** Check that yupResolver is properly configured in useForm

### Issue 2: File upload not working
**Solution:** Verify accept attribute and file size checks

### Issue 3: Multi-step form losing data
**Solution:** Ensure formData state is updated before step change

### Issue 4: Password strength not updating
**Solution:** Check onChange event is registered correctly

---

## Performance Optimizations

1. **On Blur Validation** - Reduces re-renders
2. **Controlled Components** - Efficient state management
3. **React Hook Form** - Minimal re-renders
4. **CSS Transitions** - Smooth animations
5. **Lazy Validation** - Only validate touched fields

---

## Browser Compatibility

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Screenshots to Capture

1. **Tab Navigation** - All three tabs visible
2. **Registration Form** - Empty state
3. **Registration Form** - With errors
4. **Password Strength** - Weak (red)
5. **Password Strength** - Strong (green)
6. **Registration Success** - Success message
7. **Profile Form** - File upload preview
8. **Profile Form** - Multiple skills added
9. **Profile Success** - With uploaded image
10. **Multi-Step** - Step 1 with progress bar
11. **Multi-Step** - Step 2
12. **Multi-Step** - Step 3
13. **Multi-Step Success** - All data displayed
14. **Mobile View** - Responsive design

---

## Submission Checklist

- [ ] All dependencies installed
- [ ] Application runs without errors
- [ ] All three forms functional
- [ ] Validation working correctly
- [ ] File upload working
- [ ] Multi-step navigation working
- [ ] Success messages displaying
- [ ] Mobile responsive
- [ ] Screenshots captured
- [ ] README.md complete
- [ ] Code documented
- [ ] GitHub repository created
- [ ] Live demo available

---

## Future Improvements

1. Add backend API integration
2. Implement localStorage persistence
3. Add form analytics
4. Create custom validation messages
5. Add internationalization
6. Implement dark mode
7. Add unit tests
8. Add E2E tests with Cypress
9. Add form submission tracking
10. Implement auto-save feature

---

## Learning Outcomes Achieved

✅ **CO2-BT3:** Successfully demonstrated:
1. Form handling in React
2. Controlled components
3. Form validation techniques
4. React Hook Form integration
5. Yup schema validation
6. File upload handling
7. Multi-step form implementation
8. Error message display
9. Accessibility features
10. Best practices

---

**Experiment Status:** ✅ COMPLETE

**Developed by:** Student Name  
**Guided by:** Mr. Prince Pal Singh  
**Course:** Full Stack - II (23CSH-382)  
**Date:** February 2026
