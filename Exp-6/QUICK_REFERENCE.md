# Quick Reference Guide - Experiment 6

## 🚀 Quick Start

```bash
# Navigate to project
cd /home/abhi-singh/FSD-2/Exp-6/form-handling-app

# Start development server
npm run dev

# Open browser
http://localhost:5173
```

---

## 📁 Project Files

### Main Components
- `App.jsx` - Main app with tab navigation
- `RegistrationForm.jsx` - User registration (username, email, password)
- `ProfileForm.jsx` - Profile with file upload & dynamic fields
- `MultiStepForm.jsx` - 3-step application form

### Styling
- `App.css` - Global styles
- `RegistrationForm.css` - Registration form styles
- `ProfileForm.css` - Profile form styles  
- `MultiStepForm.css` - Multi-step form styles

---

## 🎯 Key Features by Form

### 1️⃣ Registration Form
- ✅ Username (3-20 chars)
- ✅ Email validation
- ✅ Password strength indicator
- ✅ Confirm password
- ✅ Terms checkbox
- ✅ Yup schema validation

### 2️⃣ Profile Form
- ✅ File upload with preview
- ✅ Personal info (name, email, phone, DOB)
- ✅ Gender (radio buttons)
- ✅ Country (dropdown)
- ✅ Website URL
- ✅ Bio (textarea)
- ✅ Dynamic skills (add/remove)

### 3️⃣ Multi-Step Form
- ✅ 3 steps with progress bar
- ✅ Data persistence
- ✅ Back/Next navigation
- ✅ Step-wise validation
- ✅ Final submission review

---

## 🔑 Important Code Patterns

### 1. React Hook Form Setup
```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  mode: 'onBlur'
});
```

### 2. Yup Schema
```jsx
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Email required').email('Invalid'),
  password: yup.string().required('Password required').min(8)
});
```

### 3. Form Registration
```jsx
<input
  {...register('email')}
  className={errors.email ? 'error' : ''}
  aria-invalid={errors.email ? 'true' : 'false'}
/>
{errors.email && <span>{errors.email.message}</span>}
```

### 4. File Upload
```jsx
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }
};
```

### 5. Dynamic Fields
```jsx
const { fields, append, remove } = useFieldArray({
  control,
  name: 'skills'
});

// Add
<button onClick={() => append({ name: '' })}>Add</button>

// Remove
<button onClick={() => remove(index)}>Remove</button>
```

---

## 📋 Validation Rules Cheat Sheet

### Registration
- **Username:** 3-20 chars, alphanumeric + _
- **Email:** Valid email format
- **Password:** Min 8, 1 upper, 1 lower, 1 digit, 1 special
- **Terms:** Must be checked

### Profile
- **Phone:** 10 digits
- **DOB:** Not in future
- **Website:** Valid URL
- **Bio:** Max 500 chars
- **Skills:** Min 1 required
- **Image:** Max 2MB, images only

### Multi-Step
- **Step 1:** Name, Email required
- **Step 2:** Phone (10), Address, City, Zip (6)
- **Step 3:** Education, Experience, Role

---

## 🎨 CSS Variables

```css
--primary-color: #4a90e2;
--secondary-color: #50c878;
--error-color: #ff4444;
--warning-color: #ffaa00;
--success-color: #00aa00;
--text-color: #333;
--border-color: #ddd;
--bg-light: #f9f9f9;
```

---

## 🧪 Testing Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run linter
npm run lint
```

---

## 🐛 Common Errors & Fixes

### Error: Module not found
```bash
npm install react-hook-form yup @hookform/resolvers
```

### Error: Port already in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Validation not working
- Check yupResolver is imported
- Verify schema is passed to useForm
- Ensure mode is set (onBlur recommended)

### File upload not showing preview
- Check FileReader implementation
- Verify state is updated
- Check image src is set correctly

---

## 📊 Performance Tips

1. ✅ Use `mode: 'onBlur'` for better UX
2. ✅ Avoid unnecessary re-renders
3. ✅ Use controlled components efficiently
4. ✅ Validate on blur, not on change
5. ✅ Clean up file readers

---

## ♿ Accessibility Checklist

- [x] All inputs have labels
- [x] Error messages use role="alert"
- [x] aria-invalid on error fields
- [x] aria-describedby for errors
- [x] Keyboard navigation works
- [x] Tab order is logical
- [x] Focus indicators visible

---

## 📱 Responsive Design

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

Key breakpoint: **768px**

---

## 🎯 Deliverables

1. ✅ Registration Form with Yup validation
2. ✅ Profile Form with file upload
3. ✅ Multi-step form with progress
4. ✅ Password strength indicator
5. ✅ Dynamic fields (add/remove)
6. ✅ Error messages display
7. ✅ Success confirmations
8. ✅ Mobile responsive
9. ✅ Accessibility features
10. ✅ README documentation

---

## 🔗 Useful Resources

- React Hook Form: https://react-hook-form.com
- Yup: https://github.com/jquense/yup
- MDN Forms: https://developer.mozilla.org/docs/Learn/Forms
- ARIA: https://www.w3.org/WAI/ARIA

---

## 📸 Screenshot Checklist

- [ ] Registration form (empty)
- [ ] Registration form (with errors)
- [ ] Password strength (weak/medium/strong)
- [ ] Registration success
- [ ] Profile form with image preview
- [ ] Profile form with multiple skills
- [ ] Profile success
- [ ] Multi-step (all 3 steps)
- [ ] Multi-step success
- [ ] Mobile responsive views

---

## 💡 Key Takeaways

1. React Hook Form reduces boilerplate
2. Yup provides powerful schema validation
3. Controlled components give React full control
4. File upload needs proper validation
5. Dynamic fields use useFieldArray
6. Accessibility is essential
7. Validate on blur for better UX
8. Error messages should be clear

---

## 📝 Experiment Info

**Course:** Full Stack - II (23CSH-382)  
**Experiment:** 6 - Form Handling and Validation  
**Instructor:** Mr. Prince Pal Singh  
**Department:** AIT-CSE Core AIML  
**Duration:** 4-5 hours  
**Learning Outcome:** CO2 - BT3

---

**Status:** ✅ COMPLETE

*Validate early, validate often!* 🚀
