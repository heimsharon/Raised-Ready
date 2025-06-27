import '../assets/styles/Checkout.css';

interface CartItem {
  product: {
    name: string;
    price: number;
    image: string;
  };
  design: string | null;
  designImage: string;
  total: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
}

export default function Checkout({ cartItems }: CheckoutProps) {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <p>Your legacy is almost ready.</p>

      <div className="cart-preview">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <p><strong>Product:</strong> {item.product.name}</p>
                <p><strong>Price:</strong> ${item.product.price}</p>
                <div className="design-preview">
                  <img src={item.designImage} alt="Custom design" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              </div>
            </div>
          ))
        )}
        
        {cartItems.length > 0 && (
          <div className="total-section">
            <p><strong>Total: ${totalAmount}</strong></p>
          </div>
        )}
      </div>

      <button 
        className="confirm-button" 
        disabled={cartItems.length === 0}
        onClick={() => alert('Order placed successfully!')}
      >
        Confirm & Place Order
      </button>
    </div>
  );
}
