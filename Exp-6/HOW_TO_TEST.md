# 🚀 HOW TO RUN & TEST - Experiment 6

## ⚡ Quick Start (2 Minutes)

### Step 1: Navigate to Project
```bash
cd /home/abhi-singh/FSD-2/Exp-6/form-handling-app
```

### Step 2: Start Server (if not running)
```bash
npm run dev
```

### Step 3: Open Browser
```
http://localhost:5173
```

**That's it! The application is now running.** ✅

---

## 🧪 Testing Guide - Registration Form

### Test 1: Empty Form Submission
1. Click on "Registration Form" tab
2. Click "Register" button without filling anything
3. **Expected:** All fields show red error messages

### Test 2: Invalid Username
1. Type "ab" in username field
2. Click outside the field
3. **Expected:** Error "Username must be at least 3 characters"

### Test 3: Invalid Email
1. Type "test@invalid" in email field
2. Click outside
3. **Expected:** Error "Invalid email format"

### Test 4: Weak Password
1. Type "hello" in password field
2. **Expected:** 
   - Red strength bar
   - "Weak" label in red
   - Error "Password must be at least 8 characters"

### Test 5: Medium Password
1. Type "Hello123" in password field
2. **Expected:**
   - Orange strength bar
   - "Medium" label in orange

### Test 6: Strong Password
1. Type "Hello123!" in password field
2. **Expected:**
   - Green strength bar
   - "Strong" label in green
   - No errors

### Test 7: Password Mismatch
1. Password: "Hello123!"
2. Confirm Password: "Hello123"
3. Click outside
4. **Expected:** Error "Passwords must match"

### Test 8: Terms Not Accepted
1. Fill all fields correctly
2. Leave terms checkbox unchecked
3. Click "Register"
4. **Expected:** Error "You must accept the terms and conditions"

### Test 9: Successful Registration
1. Username: "testuser123"
2. Email: "test@example.com"
3. Password: "Hello123!"
4. Confirm Password: "Hello123!"
5. Check "I accept the Terms and Conditions"
6. Click "Register"
7. **Expected:**
   - Green checkmark appears
   - "Registration Successful!" message
   - Shows submitted username and email
   - "Register Another User" button

### Test 10: Form Reset
1. After success, click "Register Another User"
2. **Expected:** Form clears and returns to empty state

---

## 🧪 Testing Guide - Profile Form

### Test 1: File Upload - Valid Image
1. Click "Profile Form" tab
2. Click "Choose Profile Picture"
3. Select a JPG/PNG image < 2MB
4. **Expected:**
   - Image preview appears
   - "Remove" button shows

### Test 2: File Upload - Invalid Size
1. Try to upload an image > 2MB
2. **Expected:** Alert "File size must be less than 2MB"

### Test 3: File Upload - Invalid Type
1. Try to upload a PDF or text file
2. **Expected:** Alert "Only image files are allowed"

### Test 4: Remove Image
1. Upload a valid image
2. Click "Remove" button
3. **Expected:** Preview disappears

### Test 5: Dynamic Skills - Add
1. Scroll to "Skills" section
2. Fill first skill: "React"
3. Click "+ Add Skill"
4. **Expected:** New skill input appears
5. Add 2 more skills: "JavaScript", "Node.js"
6. **Expected:** Now you have 3 skill fields

### Test 6: Dynamic Skills - Remove
1. Click "Remove" on second skill
2. **Expected:** That skill field is removed

### Test 7: Invalid Phone Number
1. Enter phone: "123456789" (9 digits)
2. Click outside
3. **Expected:** Error "Phone must be 10 digits"

### Test 8: Valid Phone Number
1. Enter phone: "1234567890" (10 digits)
2. **Expected:** No error

### Test 9: Future Date of Birth
1. Select a future date for DOB
2. **Expected:** Error "Date cannot be in the future"

### Test 10: Invalid Website URL
1. Enter website: "notaurl"
2. **Expected:** Error "Must be a valid URL"

### Test 11: Valid Website URL
1. Enter website: "https://example.com"
2. **Expected:** No error

### Test 12: Successful Profile Submission
1. Fill all required fields:
   - First Name: "John"
   - Last Name: "Doe"
   - Email: "john@example.com"
   - Phone: "1234567890"
   - DOB: "1990-01-01"
   - Gender: Select "Male"
   - Country: "India"
   - Skills: "React", "JavaScript"
2. Upload a profile picture
3. Click "Save Profile"
4. **Expected:**
   - Success screen with all data
   - Profile picture shows
   - All information displayed correctly

---

## 🧪 Testing Guide - Multi-Step Form

### Test 1: Step 1 - Invalid Submission
1. Click "Multi-Step Form" tab
2. Click "Next" without filling
3. **Expected:** Error messages on all Step 1 fields

### Test 2: Step 1 - Valid Submission
1. First Name: "Jane"
2. Last Name: "Smith"
3. Email: "jane@example.com"
4. Click "Next"
5. **Expected:**
   - Move to Step 2
   - Step 1 marked as completed (green)
   - Progress line turns green

### Test 3: Step 2 - Back Navigation
1. From Step 2, click "Back"
2. **Expected:**
   - Return to Step 1
   - Data still filled (Jane Smith, jane@example.com)

### Test 4: Step 2 - Data Persistence
1. Click "Next" to return to Step 2
2. **Expected:**
   - Any previously filled Step 2 data is still there

### Test 5: Step 2 - Invalid Phone
1. Phone: "123" (3 digits)
2. Click "Next"
3. **Expected:** Error "Phone must be 10 digits"

### Test 6: Step 2 - Invalid Zip
1. Phone: "1234567890"
2. Address: "123 Main St"
3. City: "New York"
4. Zip: "12345" (5 digits)
5. Click "Next"
6. **Expected:** Error "Zip code must be 6 digits"

### Test 7: Step 2 - Valid Submission
1. Phone: "1234567890"
2. Address: "123 Main Street"
3. City: "Mumbai"
4. Zip: "400001"
5. Click "Next"
6. **Expected:**
   - Move to Step 3
   - Steps 1 & 2 marked completed
   - Both progress lines green

### Test 8: Step 3 - Complete Application
1. Education: "Bachelor's Degree"
2. Experience: "3-5 years"
3. Current Role: "Software Engineer"
4. Click "Submit Application"
5. **Expected:**
   - Success screen
   - All 3 sections of data displayed:
     * Personal: Jane Smith, jane@example.com
     * Contact: 1234567890, 123 Main Street, Mumbai - 400001
     * Professional: Bachelor's, 3-5 years, Software Engineer

### Test 9: Reset Multi-Step Form
1. Click "Start New Application"
2. **Expected:**
   - Return to Step 1
   - All fields cleared
   - Progress reset

---

## 🎨 UI/UX Testing

### Test 1: Tab Navigation
1. Click each tab: Registration, Profile, Multi-Step
2. **Expected:** Active tab highlights in blue

### Test 2: Responsive Design - Mobile
1. Resize browser to < 768px width
2. **Expected:**
   - Tabs stack vertically (if narrow)
   - Forms remain usable
   - Two-column layouts become single column

### Test 3: Keyboard Navigation
1. Press Tab key repeatedly
2. **Expected:**
   - Focus moves through form fields
   - Focus indicators visible
3. Press Enter on submit button
4. **Expected:** Form submits

### Test 4: Loading States
1. Fill any form correctly
2. Click submit
3. **Expected:**
   - Button text changes to "Registering..." or "Saving..."
   - Button disabled during submission

### Test 5: Error Display Timing
1. Focus on email field
2. Type invalid email
3. Click outside (blur)
4. **Expected:** Error appears only after blur, not while typing

---

## 🔍 Accessibility Testing

### Test 1: Screen Reader Labels
1. Right-click any input
2. Inspect element
3. **Expected:**
   - `<label>` associated with `<input>`
   - `id` matches `htmlFor`

### Test 2: ARIA Attributes
1. Trigger an error on any field
2. Inspect the input
3. **Expected:**
   - `aria-invalid="true"` on error
   - `aria-describedby` points to error message
   - Error has `role="alert"`

### Test 3: Semantic HTML
1. Inspect form structure
2. **Expected:**
   - Proper `<form>` tags
   - `<fieldset>` for radio groups
   - Semantic heading hierarchy (h1, h2, h3)

---

## 📊 Performance Testing

### Test 1: Form Re-renders
1. Open browser DevTools
2. Type in any field
3. **Expected:** Minimal re-renders (React Hook Form optimization)

### Test 2: Validation Timing
1. Fill a field correctly
2. Move to next field
3. **Expected:** Validation happens on blur, not on every keystroke

### Test 3: Large File Upload
1. Try uploading 1.9MB image
2. **Expected:** Upload succeeds, preview appears quickly

---

## 🐛 Edge Case Testing

### Test 1: Special Characters in Username
1. Username: "test@user#123"
2. **Expected:** Error "Username can only contain letters, numbers, and underscores"

### Test 2: Very Long Input
1. Bio: Type 600 characters
2. **Expected:** Error "Bio must not exceed 500 characters"

### Test 3: Copy-Paste Password
1. Copy "Hello123!" to clipboard
2. Paste in both password fields
3. **Expected:** Both fields accept, no mismatch error

### Test 4: Remove All Skills
1. Add 2 skills
2. Try to remove all skills
3. **Expected:** 
   - At least one skill field remains (can't remove all)
   - OR error if submitted with no skills

---

## 📱 Cross-Browser Testing

### Recommended Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Test Each Browser
1. Open application
2. Test one form completely
3. Verify all features work

---

## 📸 Screenshot Checklist

Take screenshots of:
1. [ ] All three tabs visible
2. [ ] Registration - empty state
3. [ ] Registration - with errors
4. [ ] Password weak (red)
5. [ ] Password strong (green)
6. [ ] Registration success
7. [ ] Profile - with image preview
8. [ ] Profile - 3+ skills added
9. [ ] Profile success
10. [ ] Multi-step Step 1
11. [ ] Multi-step Step 2
12. [ ] Multi-step Step 3
13. [ ] Multi-step success
14. [ ] Mobile view
15. [ ] Tablet view

---

## 🎯 Complete Testing Sequence (15 mins)

### Sequence 1: Registration (3 mins)
1. Submit empty → errors ✅
2. Fill with weak password → strength indicator ✅
3. Fix to strong password → green indicator ✅
4. Submit successfully → success screen ✅

### Sequence 2: Profile (5 mins)
1. Upload image → preview ✅
2. Add 3 skills → all show ✅
3. Remove 1 skill → removed ✅
4. Fill all fields → submit ✅
5. Success with image → verify ✅

### Sequence 3: Multi-Step (5 mins)
1. Step 1 → fill and next ✅
2. Step 2 → back and forth ✅
3. Step 2 → fill and next ✅
4. Step 3 → fill and submit ✅
5. Success → all data shown ✅

### Sequence 4: Edge Cases (2 mins)
1. Invalid files ✅
2. Invalid formats ✅
3. Boundary values ✅

---

## ✅ Final Verification

Before submission, verify:
- [ ] Server runs without errors
- [ ] All three forms load
- [ ] Validation works on all forms
- [ ] File upload functional
- [ ] Dynamic fields work
- [ ] Multi-step navigation works
- [ ] Success screens display
- [ ] Mobile responsive
- [ ] No console errors
- [ ] All documentation files present

---

## 🎓 Demo Script for Presentation

### 1. Introduction (1 min)
"This is Experiment 6: Form Handling and Validation. I've implemented three forms demonstrating React Hook Form and Yup validation."

### 2. Registration Form (2 mins)
"First, the registration form with password strength indicator. Watch as I type - weak, medium, strong. Now submit successfully."

### 3. Profile Form (3 mins)
"Second, profile form with file upload. I'll upload an image - see the preview. Now I'll add multiple skills dynamically. Submit to see all data."

### 4. Multi-Step Form (3 mins)
"Finally, a 3-step wizard. Notice the progress bar. Step 1, next. Step 2, back and forth - data persists. Step 3, submit. All data displayed."

### 5. Code Walkthrough (2 mins)
"The code uses React Hook Form for state management and Yup for validation schemas. Here's the password strength calculator."

### 6. Conclusion (1 min)
"All learning outcomes achieved: form handling, validation, file uploads, multi-step forms, and accessibility."

---

## 🔧 Troubleshooting

### Server won't start
```bash
# Kill existing process
lsof -ti:5173 | xargs kill -9
# Restart
npm run dev
```

### Validation not working
1. Check console for errors
2. Verify yup and react-hook-form installed
3. Check schema is passed to useForm

### File upload not working
1. Check browser console
2. Verify file size < 2MB
3. Ensure file is an image

### Styles not loading
1. Hard refresh: Ctrl+Shift+R
2. Clear cache
3. Check CSS imports

---

**Ready to test? Open http://localhost:5173 and follow this guide!** 🚀

**Testing Time:** ~15-20 minutes for complete coverage  
**Demo Time:** ~12 minutes

---

*Happy Testing!* ✨
