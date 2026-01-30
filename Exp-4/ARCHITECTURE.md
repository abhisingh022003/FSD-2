# 🏗️ Architecture & Data Flow

## 📊 Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    index.html                          │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              main.jsx (Entry Point)              │  │  │
│  │  │                                                   │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │         Redux Provider (store)            │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │      LanguageProvider               │  │  │  │  │
│  │  │  │  │  ┌───────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │      ThemeProvider            │  │  │  │  │  │
│  │  │  │  │  │  ┌─────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │    UserProvider         │  │  │  │  │  │  │
│  │  │  │  │  │  │  ┌───────────────────┐  │  │  │  │  │  │  │
│  │  │  │  │  │  │  │      App.jsx      │  │  │  │  │  │  │  │
│  │  │  │  │  │  │  └───────────────────┘  │  │  │  │  │  │  │
│  │  │  │  │  │  └─────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  └───────────────────────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### Context API Flow

```
┌──────────────┐
│   Component  │
│  (Consumer)  │
└──────┬───────┘
       │ useContext(UserContext)
       ▼
┌──────────────┐
│   Context    │
│   Provider   │
└──────┬───────┘
       │ value={{ user, login, logout }}
       ▼
┌──────────────┐
│  State Hook  │
│ useState()   │
└──────────────┘

User Action → login() → setState() → Provider → All Consumers Update
```

### Redux Toolkit Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Component                             │
└───────┬──────────────────────────────────────┬──────────┘
        │                                      │
        │ useSelector()                        │ dispatch(action)
        ▼                                      ▼
┌───────────────┐                    ┌──────────────────┐
│  Redux Store  │◄───────────────────│     Action       │
└───────┬───────┘                    └──────────────────┘
        │                                      │
        │                                      │
        ▼                                      ▼
┌───────────────┐                    ┌──────────────────┐
│   Reducer     │◄───────────────────│   Middleware     │
│   (Slice)     │                    │   (Thunk)        │
└───────┬───────┘                    └──────────────────┘
        │
        │ New State
        ▼
┌───────────────┐
│  LocalStorage │
└───────────────┘

Flow: Component → dispatch(action) → Reducer → New State → Store → Component Re-render
```

---

## 🗂️ State Management Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION STATE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐    ┌─────────────────────────┐   │
│  │   CONTEXT API        │    │   REDUX TOOLKIT         │   │
│  │   (UI State)         │    │   (Business Logic)      │   │
│  ├──────────────────────┤    ├─────────────────────────┤   │
│  │                      │    │                         │   │
│  │  • User Auth         │    │  • Shopping Cart        │   │
│  │    - Login/Logout    │    │    - Items              │   │
│  │    - User Info       │    │    - Quantities         │   │
│  │                      │    │    - Total              │   │
│  │  • Theme             │    │                         │   │
│  │    - Light/Dark      │    │  • Products             │   │
│  │                      │    │    - List               │   │
│  │  • Language          │    │    - Filters            │   │
│  │    - EN/HI/ES        │    │    - Search             │   │
│  │                      │    │                         │   │
│  │  • Translation       │    │  • Counter              │   │
│  │                      │    │    - Value              │   │
│  └──────────────────────┘    └─────────────────────────┘   │
│                                                              │
│  Fast, Simple Updates       Complex State, Persistence      │
│  No External Deps           DevTools, Middleware            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Component Hierarchy

```
App.jsx
├── Header (title, description)
├── Tab Navigation
│   ├── Context API Tab
│   └── Redux Toolkit Tab
│
├── Context API Section (Tab 1)
│   ├── ContextDemo.jsx
│   │   ├── Theme Toggle
│   │   ├── Language Selector
│   │   └── User Auth Form
│   └── Info Box
│
└── Redux Section (Tab 2)
    ├── Counter.jsx
    ├── ProductList.jsx
    │   ├── Filters
    │   ├── Search
    │   └── Product Grid
    │       └── Product Cards
    ├── ShoppingCart.jsx
    │   ├── Cart Header
    │   ├── Cart Items
    │   │   └── Item Controls
    │   └── Cart Footer
    └── Info Box
```

---

## 💾 Data Persistence Flow

```
┌──────────────────────────────────────────────────────────┐
│                    App Lifecycle                          │
└──────────────────────────────────────────────────────────┘

App Start
    │
    ▼
┌─────────────────────┐
│ Load from Storage   │
│ loadState()         │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Configure Store     │
│ with preloadedState │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Render App          │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     User Interacts
│ User Action         │◄────────────────────
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Dispatch Action     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Reducer Updates     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Store Subscription  │
│ Triggers            │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Save to Storage     │
│ saveState()         │
└─────────────────────┘
          │
          │ (loop back to "User Interacts")
          └──────────────────────►
```

---

## 🔄 Redux Action Flow

```
1. USER INTERACTION
   ↓
   [Button Click: "Add to Cart"]
   ↓

2. DISPATCH ACTION
   ↓
   dispatch(addItem(product))
   ↓

3. ACTION OBJECT
   ↓
   {
     type: 'cart/addItem',
     payload: { id: 1, name: 'Laptop', price: 999.99 }
   }
   ↓

4. MIDDLEWARE (Thunk)
   ↓
   [Intercepts action if needed]
   ↓

5. REDUCER
   ↓
   cartSlice.reducers.addItem(state, action)
   ↓
   [Immer creates new state immutably]
   ↓

6. NEW STATE
   ↓
   state.cart.items = [...items, newItem]
   state.cart.total += newItem.price
   ↓

7. STORE UPDATE
   ↓
   Redux Store updates
   ↓

8. SUBSCRIPTION
   ↓
   store.subscribe() → saveState()
   ↓

9. COMPONENT RE-RENDER
   ↓
   useSelector detects change
   ↓
   Component re-renders
   ↓

10. UI UPDATE
    ↓
    User sees updated cart
```

---

## 📡 Async Action Flow (fetchProducts)

```
1. COMPONENT MOUNT
   ↓
   useEffect(() => {
     dispatch(fetchProducts())
   }, [])
   ↓

2. DISPATCH THUNK
   ↓
   createAsyncThunk created 3 actions:
   - fetchProducts.pending
   - fetchProducts.fulfilled
   - fetchProducts.rejected
   ↓

3. PENDING STATE
   ↓
   Action: products/fetchProducts/pending
   Reducer: state.loading = true
   UI: Shows "Loading..."
   ↓

4. API CALL
   ↓
   await fetch() or setTimeout()
   ↓

5a. SUCCESS PATH              5b. ERROR PATH
    ↓                             ↓
    fulfilled                     rejected
    ↓                             ↓
    state.loading = false         state.loading = false
    state.data = payload          state.error = error
    ↓                             ↓
    UI: Shows products            UI: Shows error
```

---

## 🎨 Theme Toggle Flow

```
User clicks theme button
    ↓
┌─────────────────────┐
│ toggleTheme()       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ setTheme(newTheme)  │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Context Provider    │
│ value updates       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ All consumers       │
│ re-render           │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ className changes   │
│ to "theme-dark"     │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ CSS applies         │
│ dark mode styles    │
└─────────────────────┘
```

---

## 🌐 Language Switch Flow

```
User selects language
    ↓
┌─────────────────────┐
│ changeLanguage(lang)│
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ setLanguage(lang)   │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Language Context    │
│ updates             │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ t() function gets   │
│ new translations    │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ All text re-renders │
│ in selected lang    │
└─────────────────────┘
```

---

## 🛒 Shopping Cart Update Flow

```
Click "Add to Cart" on Product
    ↓
┌──────────────────────────┐
│ dispatch(addItem(product))│
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ cartSlice reducer        │
│ - Find existing item?    │
│   YES → increment qty    │
│   NO  → add new item     │
│ - Update total           │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ New state created        │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ Store subscription fires │
│ → saveState()            │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ localStorage updated     │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ useSelector detects      │
│ state change             │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ ShoppingCart component   │
│ re-renders               │
└──────────────────────────┘
```

---

## 🔍 Product Filter Flow

```
Type in Search Box
    ↓
┌──────────────────────────┐
│ onChange event           │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ dispatch(               │
│   setSearchQuery(text)   │
│ )                        │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ productSlice reducer     │
│ - Update searchQuery     │
│ - Run filterProducts()   │
│ - Update filteredData    │
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ Component re-renders     │
│ with filtered list       │
└──────────────────────────┘

filterProducts() logic:
1. Start with all products
2. Filter by category if not "all"
3. Filter by search query
4. Return filtered array
```

---

## 📦 Store Structure

```
Redux Store
│
├── counter
│   └── value: 0
│
├── cart
│   ├── items: [
│   │   {
│   │     id: 1,
│   │     name: "Laptop",
│   │     price: 999.99,
│   │     quantity: 2,
│   │     image: "💻"
│   │   }
│   │ ]
│   └── total: 1999.98
│
└── products
    ├── data: [...all products]
    ├── filteredData: [...filtered products]
    ├── loading: false
    ├── error: null
    ├── selectedCategory: "all"
    └── searchQuery: ""
```

---

## 🎭 Context State Structure

```
Contexts
│
├── UserContext
│   ├── user: { name: "John", email: "john@example.com" }
│   ├── isLoggedIn: true
│   ├── login(userData)
│   └── logout()
│
├── ThemeContext
│   ├── theme: "dark"
│   └── toggleTheme()
│
└── LanguageContext
    ├── language: "en"
    ├── changeLanguage(lang)
    └── t(key) - translation function
```

---

## 🔌 Provider Nesting Order

```
<React.StrictMode>
  <Provider store={store}>           ← Redux (outermost)
    <LanguageProvider>               ← Language
      <ThemeProvider>                ← Theme
        <UserProvider>               ← User (innermost)
          <App />
        </UserProvider>
      </ThemeProvider>
    </LanguageProvider>
  </Provider>
</React.StrictMode>

Why this order?
1. Redux first - needed by all
2. Language - used in all components
3. Theme - wraps content with theme class
4. User - most specific context
```

---

## 🎯 State Access Patterns

### Context API Access
```jsx
// Any component inside provider
function MyComponent() {
  const { user } = useUser();        // Direct access
  const { theme } = useTheme();      // Direct access
  const { t } = useLanguage();       // Direct access
  
  return <div>{t('welcome')}, {user.name}</div>;
}
```

### Redux Access
```jsx
// Any component
function MyComponent() {
  const items = useSelector(state => state.cart.items);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Total: ${total}</p>
      <button onClick={() => dispatch(clearCart())}>
        Clear
      </button>
    </div>
  );
}
```

---

## 🎓 Learning Path

```
Start Here
    │
    ▼
Learn Context API
    │
    ├─► Create Context
    ├─► Provider Pattern
    ├─► useContext Hook
    └─► Custom Hooks
    │
    ▼
Learn Redux Basics
    │
    ├─► Actions
    ├─► Reducers
    ├─► Store
    └─► Selectors
    │
    ▼
Learn Redux Toolkit
    │
    ├─► createSlice
    ├─► configureStore
    ├─► createAsyncThunk
    └─► RTK Best Practices
    │
    ▼
Master DevTools
    │
    ├─► Action Inspection
    ├─► State Tree
    ├─► Time Travel
    └─► State Export/Import
    │
    ▼
Advanced Patterns
    │
    ├─► Normalization
    ├─► Memoization
    ├─► Middleware
    └─► Performance
```

---

*Use these diagrams to understand the flow and architecture!*
