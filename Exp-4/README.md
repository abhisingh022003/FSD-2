# Experiment 4: State Management in React SPA

## 📚 Full Stack Development - II (23CSH-382)
**Session:** 2025-26 (Even Semester)  
**Experiment:** Implement State Management in SPA  
**Learning Outcome:** CO1 - BT3

---

## 🎯 Experiment Objectives

This experiment demonstrates comprehensive state management in React applications using:

1. **Context API** - Built-in React solution for simple global state
2. **Redux Toolkit** - Industry-standard solution for complex state management

---

## ✨ Features Implemented

### Context API Implementation
- ✅ **User Authentication Context**
  - Login/Logout functionality
  - User state persistence
  - Protected state access
  
- ✅ **Theme Context**
  - Light/Dark mode toggle
  - Real-time theme switching
  - CSS-in-JS theming
  
- ✅ **Language Context**
  - Multi-language support (English, Hindi, Spanish)
  - Translation system
  - Dynamic language switching

### Redux Toolkit Implementation
- ✅ **Shopping Cart Management**
  - Add/Remove items
  - Quantity adjustment
  - Real-time total calculation
  - LocalStorage persistence
  
- ✅ **Product Management**
  - Async data fetching with `createAsyncThunk`
  - Loading states
  - Error handling
  
- ✅ **Product Filtering**
  - Category-based filtering
  - Search functionality
  - Real-time filter updates
  
- ✅ **Redux DevTools Integration**
  - Time-travel debugging
  - Action history
  - State inspection

---

## 🛠️ Tech Stack

- **React 18.3+** - UI Library
- **Vite** - Build tool & dev server
- **Redux Toolkit 2.x** - State management
- **React Redux** - React bindings for Redux
- **Context API** - Built-in React state management

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd Exp-4
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

5. **Install Redux DevTools Extension**
- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ContextDemo.jsx       # Context API demonstration
│   ├── Counter.jsx            # Simple Redux counter
│   ├── ProductList.jsx        # Product catalog with filters
│   └── ShoppingCart.jsx       # Shopping cart component
│
├── context/
│   ├── UserContext.jsx        # User authentication context
│   ├── ThemeContext.jsx       # Theme management context
│   └── LanguageContext.jsx    # Multi-language context
│
├── store/
│   ├── index.js               # Redux store configuration
│   └── slices/
│       ├── counterSlice.js    # Counter state slice
│       ├── cartSlice.js       # Shopping cart slice
│       └── productSlice.js    # Product management slice
│
├── App.jsx                    # Main application component
├── App.css                    # Application styles
├── main.jsx                   # Entry point with providers
└── index.css                  # Global styles
```

---

## 🔧 Key Concepts Demonstrated

### Context API

#### Creating Context
```javascript
const UserContext = createContext();
```

#### Provider Pattern
```javascript
<UserContext.Provider value={{ user, login, logout }}>
  {children}
</UserContext.Provider>
```

#### Consuming Context
```javascript
const { user, login } = useUser();
```

### Redux Toolkit

#### Creating Slices
```javascript
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      // Immer allows direct mutation
      state.items.push(action.payload);
    }
  }
});
```

#### Async Thunks
```javascript
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(API_URL);
    return response.json();
  }
);
```

#### Store Configuration
```javascript
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer
  }
});
```

#### Using Redux Hooks
```javascript
const items = useSelector(state => state.cart.items);
const dispatch = useDispatch();

dispatch(addItem(product));
```

---

## 🎨 Features Walkthrough

### 1. Context API Tab

#### User Authentication
- Fill in username and email
- Click "Login" to authenticate
- User info displays with logout option
- State persists across theme/language changes

#### Theme Toggle
- Click theme button to switch between light/dark modes
- All components update dynamically
- Smooth transitions

#### Language Selector
- Choose from English, Hindi, or Spanish
- All text updates in real-time
- Translations applied across entire app

### 2. Redux Toolkit Tab

#### Simple Counter
- Demonstrates basic Redux state management
- Increment/Decrement/Reset actions
- Immediate UI updates

#### Product Catalog
- Products loaded via async thunk
- Filter by category dropdown
- Search by product name
- Real-time filtering

#### Shopping Cart
- Add products from catalog
- Adjust quantities with +/- buttons
- Remove individual items
- Clear entire cart
- Total calculated automatically
- **Persists to localStorage** - refresh page to verify!

---

## 🔍 Redux DevTools Usage

1. Open browser DevTools (F12)
2. Click "Redux" tab
3. Interact with the app
4. Observe:
   - **Action History** - All dispatched actions
   - **State Tree** - Current state structure
   - **Diff** - What changed in state
   - **Time Travel** - Jump to any previous state

### Actions to Watch
- `cart/addItem` - Adding product to cart
- `cart/removeItem` - Removing from cart
- `products/fetchProducts/pending` - Start loading
- `products/fetchProducts/fulfilled` - Data loaded
- `products/setCategory` - Filter change

---

## 💾 LocalStorage Persistence

The shopping cart state automatically saves to `localStorage`:

```javascript
// Saved automatically on every state change
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(state.cart));
});

// Loaded on app startup
const preloadedState = loadState();
```

**Test it:** Add items to cart → Refresh page → Items persist!

---

## 🎓 Learning Outcomes Achieved

| Outcome | Implementation |
|---------|---------------|
| Understand state management challenges | Demonstrated prop drilling solution |
| Implement Context API | User, Theme, Language contexts |
| Set up Redux Toolkit | Store, slices, reducers configured |
| Create actions & reducers | Multiple slices with various actions |
| Use hooks | useContext, useSelector, useDispatch |
| Handle async actions | createAsyncThunk for API calls |
| Debug with DevTools | Redux DevTools integration |
| Compare solutions | Side-by-side Context vs Redux |

---

## 📊 Comparison: Context API vs Redux Toolkit

| Feature | Context API | Redux Toolkit |
|---------|-------------|---------------|
| **Setup Complexity** | ✅ Simple | ⚠️ More boilerplate |
| **Dependencies** | ✅ None (built-in) | ❌ External package |
| **DevTools** | ❌ Limited | ✅ Excellent |
| **Performance** | ⚠️ Can cause re-renders | ✅ Optimized |
| **Async Handling** | ⚠️ Manual | ✅ Built-in thunks |
| **Best For** | Simple global state | Complex applications |
| **Learning Curve** | ✅ Easy | ⚠️ Steeper |
| **Middleware** | ❌ No | ✅ Yes |
| **Time Travel** | ❌ No | ✅ Yes |

---

## 🚀 Advanced Concepts

### Selectors with Memoization
```javascript
export const selectItemCount = (state) => 
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
```

### Multiple Providers Pattern
```javascript
<Provider store={store}>
  <LanguageProvider>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </LanguageProvider>
</Provider>
```

### Immer Integration (Redux Toolkit)
```javascript
// Looks like mutation, but creates immutable update
addItem: (state, action) => {
  state.items.push(action.payload);
  state.total += action.payload.price;
}
```

---

## 🧪 Testing the Implementation

### Manual Tests

1. **Context API Tests**
   - [ ] Login with user credentials
   - [ ] Verify user info displays
   - [ ] Logout and confirm state clears
   - [ ] Toggle theme and check styling
   - [ ] Change language and verify translations

2. **Redux Tests**
   - [ ] Add products to cart
   - [ ] Increment/decrement quantities
   - [ ] Remove items from cart
   - [ ] Verify total calculations
   - [ ] Refresh page and confirm persistence
   - [ ] Filter products by category
   - [ ] Search for specific products

3. **DevTools Tests**
   - [ ] Open Redux DevTools
   - [ ] Add item and check action
   - [ ] Inspect state tree
   - [ ] Time-travel to previous state
   - [ ] Export/import state

---

## 📝 Code Quality Features

- ✅ **Clean Code**: Organized file structure
- ✅ **Reusable Components**: Modular design
- ✅ **Custom Hooks**: useUser, useTheme, useLanguage
- ✅ **Error Handling**: Try-catch for localStorage
- ✅ **Loading States**: Async operation feedback
- ✅ **Responsive Design**: Mobile-friendly UI
- ✅ **Accessibility**: Semantic HTML
- ✅ **Performance**: Optimized selectors

---

## 🐛 Common Issues & Solutions

### Issue: Redux DevTools not showing
**Solution:** Install Redux DevTools browser extension

### Issue: Cart doesn't persist
**Solution:** Check browser localStorage permissions

### Issue: Components not updating
**Solution:** Verify Provider wraps component tree

### Issue: "Cannot read property 'map' of undefined"
**Solution:** Add loading state checks before rendering

---

## 📚 References & Resources

### Official Documentation
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Context API](https://react.dev/reference/react/useContext)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

### Tutorials
- Redux Essentials Tutorial
- Redux Toolkit Quick Start
- React Context API Guide

---

## 👨‍💻 Author

**Name:** Abhi Singh  
**Program:** AI201 - AIT-CSE  
**Semester:** 4th  
**Course:** Full Stack - II (23CSH-382)  
**Session:** 2025-26 Even Semester

---

## 📜 License

This project is created for educational purposes as part of the Full Stack Development - II course.

---

## 🙏 Acknowledgments

- **Instructor:** Mr. Prince Pal Singh (E18505)
- **Department:** AIT-CSE CORE & AIML
- **Institution:** University Institute of Engineering

---

## 🎯 Submission Checklist

- [x] Context API implementation (User, Theme, Language)
- [x] Redux Toolkit setup
- [x] Shopping cart with add/remove
- [x] Product list with filters
- [x] Async data fetching
- [x] LocalStorage persistence
- [x] Redux DevTools integration
- [x] Responsive design
- [x] Documentation (README)
- [x] Clean code structure

---

**Experiment Status:** ✅ Complete  
**Date:** January 2026  
**Duration:** 4-5 hours

---

## 🎓 Key Takeaways

1. **Context API** is perfect for simple global state like themes and auth
2. **Redux Toolkit** excels in complex apps with lots of state interactions
3. **DevTools** make debugging Redux state changes trivial
4. **Persistence** can be achieved with localStorage middleware
5. **Async operations** are elegantly handled with createAsyncThunk
6. **Immer** (built into Redux Toolkit) simplifies immutable updates
7. Choose the **right tool** based on app complexity

---

*Master state, master React!* 🚀
