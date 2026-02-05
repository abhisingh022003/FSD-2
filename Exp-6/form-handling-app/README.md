# Experiment 6: Form Handling and Validation

**Full Stack - II (23CSH-382)**  
**Academic Session 2025–26 | EVEN Semester Jan–Jun 2026**  
**Program Code: AI201 | Semester: 4th**

## 👨‍🏫 Instructor
**Mr. Prince Pal Singh (E18505)**  
Assistant Professor, AIT-CSE  
Email: prince.18505@cumail.in

---

## 📋 Experiment Overview

This experiment demonstrates comprehensive form handling and validation in React using modern libraries and best practices.

### Learning Outcomes (CO2 - BT3)
1. ✅ Understand form handling in React
2. ✅ Create controlled components
3. ✅ Implement form validation
4. ✅ Use React Hook Form library
5. ✅ Integrate Yup validation
6. ✅ Handle file uploads
7. ✅ Build multi-step forms
8. ✅ Display error messages

### Duration
4-5 hours

### Tools & Technologies
- React 18+
- Vite
- React Hook Form
- Yup
- Modern JavaScript (ES6+)

---

## 🚀 Features Implemented

### 1. Registration Form
A complete user registration form with:
- **Username validation** (3-20 characters, alphanumeric + underscore)
- **Email validation** (proper email format)
- **Password validation** with requirements:
  - Minimum 8 characters
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one number
  - At least one special character (@$!%*?&#)
- **Password strength indicator** (Weak/Medium/Strong)
- **Confirm password** matching
- **Terms and conditions** checkbox
- **Real-time validation** on blur
- **Accessible form** with ARIA labels

### 2. Profile Form
A comprehensive profile management form with:
- **Profile picture upload** with preview (max 2MB)
- **Personal information** (name, email, phone, DOB)
- **Gender selection** (radio buttons)
- **Country selection** (dropdown)
- **Website URL** validation
- **Bio textarea** (max 500 characters)
- **Dynamic skills fields** (add/remove)
- **Multiple input types** demonstration
- **File upload handling** with validation

### 3. Multi-Step Form
A professional 3-step application form with:
- **Visual progress indicator**
- **Step navigation** (Next/Back buttons)
- **Data persistence** across steps
- **Step-wise validation**
- **Three sections:**
  1. Personal Information (name, email)
  2. Contact Information (phone, address, city, zip)
  3. Professional Details (education, experience, role)
- **Final submission** with complete data display

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory:**
```bash
cd form-handling-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:5173
```

---

## 🏗️ Project Structure

```
form-handling-app/
├── src/
│   ├── components/
│   │   ├── RegistrationForm.jsx      # Registration form component
│   │   ├── RegistrationForm.css      # Registration form styles
│   │   ├── ProfileForm.jsx           # Profile form component
│   │   ├── ProfileForm.css           # Profile form styles
│   │   ├── MultiStepForm.jsx         # Multi-step form component
│   │   └── MultiStepForm.css         # Multi-step form styles
│   ├── App.jsx                       # Main app component with tabs
│   ├── App.css                       # Main app styles
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── package.json                      # Dependencies
├── vite.config.js                    # Vite configuration
└── README.md                         # This file
```

---

## 🎯 Key Concepts Demonstrated

### 1. Controlled Components
React manages form input values through state:
```javascript
const [email, setEmail] = useState('');
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

### 2. React Hook Form
Simplified form handling with built-in validation:
```javascript
const { register, handleSubmit, formState: { errors } } = useForm();
```

### 3. Yup Schema Validation
Declarative validation schemas:
```javascript
const schema = yup.object({
  email: yup.string().required('Email required').email('Invalid email'),
  password: yup.string().required('Password required').min(8)
});
```

### 4. File Upload Handling
- File type validation (images only)
- File size validation (max 2MB)
- Preview generation using FileReader
- Image display with cleanup

### 5. Dynamic Form Fields
Using `useFieldArray` for managing dynamic lists:
```javascript
const { fields, append, remove } = useFieldArray({ name: 'skills' });
```

### 6. Form Validation Patterns
- **onBlur validation** - Validate when field loses focus
- **Real-time feedback** - Immediate error messages
- **Schema-based validation** - Yup integration
- **Custom validation** - Password strength calculator

### 7. Accessibility
- Proper ARIA labels
- Error message announcements
- Keyboard navigation support
- Semantic HTML structure

---

## 🧪 Testing Checklist

### Manual Testing
- [ ] Submit empty forms
- [ ] Test each validation rule
- [ ] Try invalid email formats
- [ ] Test password requirements
- [ ] Upload invalid file types
- [ ] Upload files > 2MB
- [ ] Test dynamic field addition/removal
- [ ] Navigate multi-step form back/forth
- [ ] Test keyboard navigation
- [ ] Verify mobile responsiveness
- [ ] Check success message display
- [ ] Test form reset functionality

### Edge Cases Tested
- [ ] Very long inputs
- [ ] Special characters in fields
- [ ] Copy-paste behavior
- [ ] Network error simulation
- [ ] Multiple rapid submissions
- [ ] Browser autofill compatibility

---

## 🎨 UI/UX Features

- **Responsive design** - Works on mobile, tablet, and desktop
- **Visual feedback** - Color-coded error states
- **Loading states** - Button disabled during submission
- **Success messages** - Clear confirmation after submission
- **Password strength indicator** - Visual feedback with colors
- **Progress tracking** - Multi-step form progress bar
- **Smooth animations** - Fade-in effects for form steps
- **Clean layout** - Professional styling with modern CSS

---

## 📚 Form Validation Rules

### Registration Form
| Field | Rules |
|-------|-------|
| Username | Required, 3-20 chars, alphanumeric + underscore |
| Email | Required, valid email format |
| Password | Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char |
| Confirm Password | Required, must match password |
| Terms | Must be checked |

### Profile Form
| Field | Rules |
|-------|-------|
| First Name | Required |
| Last Name | Required |
| Email | Required, valid email |
| Phone | 10 digits |
| DOB | Required, not in future |
| Gender | Required |
| Country | Required |
| Website | Valid URL format |
| Bio | Max 500 characters |
| Skills | At least 1 skill required |
| Profile Picture | Image only, max 2MB |

### Multi-Step Form
**Step 1:**
- First Name, Last Name, Email (all required)

**Step 2:**
- Phone (10 digits), Address, City, Zip Code (6 digits) - all required

**Step 3:**
- Education, Experience, Current Role - all required

---

## 🔧 Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-hook-form": "^7.x",
  "yup": "^1.x",
  "@hookform/resolvers": "^3.x"
}
```

---

## 📱 Screenshots & Demo

The application features:
1. **Tab Navigation** - Switch between three form types
2. **Responsive Layout** - Mobile-friendly design
3. **Error Handling** - Clear, actionable error messages
4. **Success States** - Beautiful confirmation screens
5. **Form Data Display** - Review submitted information

---

## 🎓 Best Practices Implemented

1. ✅ **Labeled inputs** for accessibility
2. ✅ **Validate on blur** for better UX
3. ✅ **Specific error messages** - Clear guidance
4. ✅ **Disable submit during processing** - Prevent duplicate submissions
5. ✅ **Visual feedback** - Loading states, colors
6. ✅ **Proper input types** - email, tel, url, date, etc.
7. ✅ **Keyboard navigation** - Tab order, Enter to submit
8. ✅ **Mobile-friendly** - Responsive design
9. ✅ **Sensitive data handling** - Password type inputs
10. ✅ **Server error handling** - Graceful error display

---

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Form data persistence in localStorage
- [ ] reCAPTCHA integration
- [ ] Email verification
- [ ] Social login integration
- [ ] Form analytics
- [ ] A/B testing for form layouts
- [ ] Auto-save drafts
- [ ] Internationalization (i18n)
- [ ] Dark mode support

---

## 📝 Learning Resources

### Official Documentation
- [React Hook Form](https://react-hook-form.com)
- [Yup Validation](https://github.com/jquense/yup)
- [MDN Web Forms](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [W3C ARIA](https://www.w3.org/WAI/ARIA)

### Additional Tools
- React Hook Form DevTools
- Form validation libraries
- Accessibility checkers
- Browser DevTools

---

## 🏆 Key Takeaways

1. **Controlled components** give React control over form state
2. **React Hook Form** significantly reduces boilerplate code
3. **Yup** provides powerful schema-based validation
4. **Validate on blur** provides better user experience
5. **Clear error messages** help users fix issues quickly
6. **Keyboard navigation** support is essential for accessibility
7. **Thorough testing** ensures robust form handling
8. **Async validation** enables server-side checks

> **Remember:** Good forms improve user experience and increase conversion rates!

---

## 📞 Contact & Support

**Instructor:** Mr. Prince Pal Singh  
**Email:** prince.18505@cumail.in  
**Department:** AIT-CSE Core AIML  
**University:** University Institute of Engineering

---

## 📄 License

This project is created for educational purposes as part of the Full Stack - II course curriculum.

---

## 🎉 Acknowledgments

- Course: Full Stack - II (23CSH-382)
- Experiment: 6 - Form Handling and Validation
- Learning Outcome: CO2 - BT3
- Academic Year: 2025-26 (EVEN Semester)

---

**"Validate early, validate often"** ✨

---

*Last Updated: February 2026*
