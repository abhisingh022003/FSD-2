import { useSelector, useDispatch } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import {
  selectCartItems,
  selectCartTotal,
  selectItemCount,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart
} from '../store/slices/cartSlice';

function ShoppingCart() {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectItemCount);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h3>🛒 {t('shoppingCart')}</h3>
        <span className="cart-count">{itemCount} items</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>{t('emptyCart')}</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">{item.image}</div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => handleDecrement(item.id)}
                    className="btn-qty"
                  >
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleIncrement(item.id)}
                    className="btn-qty"
                  >
                    ➕
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="btn-remove"
                  title={t('removeFromCart')}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <button onClick={handleClearCart} className="btn-clear">
              Clear Cart
            </button>
            <div className="cart-total">
              <strong>{t('total')}:</strong>
              <span className="total-amount">${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
