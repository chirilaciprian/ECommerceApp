import axios from "axios";
import { getMyOrdersAndProducts } from "./orderService";
import { isAuthenticated } from "./authService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRecommendedProducts = async (
  sku: string,
  productsNumber: number
) => {
  try {
    let res = await axios.get(
      `http://127.0.0.1:5001/recommend?sku=${sku}&top_n=${productsNumber}`
    );
    const recommendedSkus = res.data.recommendations.map(
      (product: { sku: string }) => product.sku
    );
    res = await axios.post(
      `${API_BASE_URL}/api/products/get-products-by-skus`,
      {
        skus: recommendedSkus,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getRecommendedProductsHomePage = async () => {
  try {
    const user = await isAuthenticated();
    const totalRecommendedProducts = 24;
    const result = await getMyOrdersAndProducts();
    if (result === false) {
      throw new Error("Failed to get orders and products");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [orders, products] = result;
    let orderItems = result[2];
    const ordersId = orders.map((order: { id: string }) => order.id);

    // Filter orderItems where orderId exists in ordersId
    orderItems = orderItems.filter((item: { orderId: string }) =>
      ordersId.includes(item.orderId)
    );

    const productIds = orderItems
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .map((item: { productId: string }) => item.productId);
    const ordersProductsSkus = productIds.map(
      (id: string) =>
        products.find((product: { id: string }) => product.id === id)?.sku
    );
    const wishlist = await axios.get(
      `${API_BASE_URL}/api/wishlists/user/${user.id}`
    );
    const wishlistItems = await axios.get(
      `${API_BASE_URL}/api/wishlistItems/wishlist/${wishlist.data.id}`
    );
    const wishlistItemsIds = wishlistItems.data.map(
      (item: { productId: string }) => item.productId
    );
    const wishlistProductsSkus = products
      .filter((product: { id: string }) =>
        wishlistItemsIds.includes(product.id)
      )
      .map((product: { sku: string }) => product.sku);
    const productsSkus = [
      ...new Set([...wishlistProductsSkus, ...ordersProductsSkus]),
    ];
    const randomSkus = productsSkus
      .sort(() => Math.random() - 0.5) // Shuffle the array
      .slice(0, 4); // Take the first 4 elements        
    const recommendedProducts = await Promise.all(
      randomSkus.map(async (sku: string) => {
        const res = await getRecommendedProducts(
          sku,
          totalRecommendedProducts / randomSkus.length
        );        
        return res; // Store the response data
      })
    );
    return recommendedProducts.flat();

  } catch (err) {
    console.log(err);
    return false;
  }
};
