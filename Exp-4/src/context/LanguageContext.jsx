import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    username: 'Username',
    email: 'Email',
    theme: 'Theme',
    language: 'Language',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    shoppingCart: 'Shopping Cart',
    products: 'Products',
    addToCart: 'Add to Cart',
    removeFromCart: 'Remove',
    total: 'Total',
    emptyCart: 'Your cart is empty'
  },
  hi: {
    welcome: 'स्वागत है',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    username: 'उपयोगकर्ता नाम',
    email: 'ईमेल',
    theme: 'थीम',
    language: 'भाषा',
    lightMode: 'लाइट मोड',
    darkMode: 'डार्क मोड',
    shoppingCart: 'शॉपिंग कार्ट',
    products: 'उत्पाद',
    addToCart: 'कार्ट में जोड़ें',
    removeFromCart: 'हटाएं',
    total: 'कुल',
    emptyCart: 'आपका कार्ट खाली है'
  },
  es: {
    welcome: 'Bienvenido',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    username: 'Nombre de usuario',
    email: 'Correo electrónico',
    theme: 'Tema',
    language: 'Idioma',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    shoppingCart: 'Carrito de compras',
    products: 'Productos',
    addToCart: 'Añadir al carrito',
    removeFromCart: 'Eliminar',
    total: 'Total',
    emptyCart: 'Tu carrito está vacío'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
