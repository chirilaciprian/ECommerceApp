import { FaShopify, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthHook } from "../../hooks/authHooks";
import { isAuthenticated, logout } from "../../services/authService";
import { useEffect,  useState } from "react";
import { fetchCartItems, updateCartItemQuantity } from "../../services/ProductService"; // Import fetchCartItems and updateCartItemQuantity

export const Navbar = () => {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cartItems, setCartItems] = useState<any[]>([]); // Use appropriate type if available
  const authHook = AuthHook();

  // Fetch and set cart items when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      const res = await isAuthenticated();
      if (res) {
        authHook.setIsAuthenticated(true);
        await fetchAndSetCartItems(); // Fetch and set cart items if authenticated
      } else {
        authHook.setIsAuthenticated(false);
      }
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    fetchAndSetCartItems();
    console.log("YAAAA") // Fetch and set cart items when cartItems change
  },[])
  // Fetch and set cart items
  const fetchAndSetCartItems = async () => {
    try {
      const items = await fetchCartItems(); // Fetch cart items
      if (items) {
        setCartItems(items); // Set cart items
      }
    } catch (err) {
      console.error("Failed to fetch cart items", err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    authHook.setIsAuthenticated(false);
    logout();
  };

  // Update cart item quantity
  const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      console.error('Quantity cannot be less than 1');
      return;
    }
    
    try {
      await updateCartItemQuantity(itemId, newQuantity); // Update quantity on server
      const updatedCartItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCartItems); // Update local state
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  return (
    <>
      <div className="playfair flex justify-between items-center p-5 pl-16 pr-16 font-semibold text-lg shadow-sm">
        <div className="flex gap-2">
          <FaShopify className="text-4xl" />
          <span className="merriweather text-3xl font-thin italic">C-Shop</span>
        </div>
        <div className="flex gap-14">
          <Link
            to="/"
            className="cursor-pointer link link-underline link-underline-black"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="cursor-pointer link link-underline link-underline-black"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="cursor-pointer link link-underline link-underline-black"
          >
            About Us
          </Link>
        </div>

        {authHook.isAuthenticated ? (
          <div className="flex flex-row text-3xl gap-6 relative">
            <div>
              <button
                className="cursor-pointer"
                onClick={() => setIsOpenUser(!isOpenUser)}
              >
                <FaUserCircle />
              </button>
              {isOpenUser && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white shadow-xl">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/myorders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My orders
                  </Link>
                  <Link
                    to=""
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <Link
                className="cursor-pointer relative"
                onClick={() => setIsOpenCart(!isOpenCart)}
                to="/cart"
              >
                <FaShoppingCart />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              {isOpenCart && (
                <div className="absolute right-0 mt-2 w-64 py-2 bg-white shadow-xl z-10">
                  {cartItems.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Your cart is empty.
                    </div>
                  ) : (
                    <ul>
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span>{item.product.name}</span>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}>+</button>
                          <button onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}>-</button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex justify-center mt-2">
                    <Link
                      to="/cart"
                      className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-6">
            <Link
              to="/signup"
              className="text-xl font-bold cursor-pointer link link-underline link-underline-black"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-xl font-bold cursor-pointer link link-underline link-underline-black"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
