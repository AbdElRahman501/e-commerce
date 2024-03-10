//actions
import {
  fetchProducts,
  fetchProduct,
  fetchProductsById,
  getCategoriesWithProductCount,
  fetchFilteredProducts,
  insertProducts,
  getAllProperties,
} from "./actions/product.actions";

//orders
import { createOrder, fetchOrders } from "./actions/order.actions";

//models
import Product from "./models/product.model";
import Order from "./models/order.model";

export {
  getAllProperties,
  insertProducts,
  fetchOrders,
  fetchFilteredProducts,
  fetchProducts,
  fetchProduct,
  getCategoriesWithProductCount,
  fetchProductsById,
  createOrder,
  Product,
  Order,
};
