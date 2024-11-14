// cartContext

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "../constants/types";
import api, { Basket, GetAllcategory } from "../constants/END_POINTS";
import { CatImages, TestImages } from "../constants/ImgArray";

interface CartItem extends Product {
  id: any;
  quantity: number;
  book: string;
}

interface CartContextType {
  cartItems: CartItem[]; // Array to store items in the cart
  addToCart: (product: Product) => void; // Function to add a product to the cart
  removeFromCart: (productId: string) => void; // Function to remove a product by its ID
  updateCartItemQuantity: (productId: string, newQuantity: number) => void; // Function to update the quantity of a cart item
  categories: any[]; // Array to hold categories
  books: any[];
  cartId: any;
  total: any;
  loading: boolean;
  getMyBasket: () => void;
  confirmDelete: any;
  setConfirmDelete: any;
  setLoading: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider(props: any) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // State for cart items
  const [categories, setCategories] = useState<any[]>([]); // State for categories
  const [books, setBooks] = useState([]); // State for books
  const [cartId, setCartId] = useState<string | null>(null); // State for cart ID
  const [total, setTotal] = useState(0); // State for total cart value
  const [loading, setLoading] = useState(false); // State for loading status
  const [confirmDelete, setConfirmDelete] = useState<{
    productId: string;
    productName: string;
  } | null>(null); // State for confirming deletion

  // =================================================================
  // Add a product to the cart
  const addToCart = async (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      toast.info(`${product.name} is already in your cart.`);
      return;
    }

    try {
      const payload = {
        book: product.id,
        quantity:1
      };

      const response = await api.post(`${Basket}/item`, payload);
      if (response.status === 200) {
        await getMyBasket();
        toast.success(`${product.name} has been added to the cart!`);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  };

  // ========================================================
  // Remove a product from the cart
  const removeFromCart = async (productId: string) => {
    try {
      // Filter out the product to remove
      const updatedCartItems = cartItems.filter(
        (item) => item.book !== productId
      );

      // Prepare payload with remaining products
      const payload = {
        items: updatedCartItems.map((item) => ({
          book: item.book, // Book ID
          quantity: item.quantity.toString(), // Convert quantity to string
        })),
      };

      const response = await api.put(`${Basket}/${cartId}`, payload);

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setCartItems(updatedCartItems);
        toast.success("Product removed from the cart!");
      } else {
        throw new Error("Failed to remove product from the cart");
      }
    } catch (error: any) {
      console.error("Error removing product from the cart:", error.message);
      toast.error(
        error.message || "An error occurred while removing the product."
      );
    }
  };

  // ===============================================================
  // Update the quantity of a product in the cart
  const updateCartItemQuantity = async (
    productId: string,
    newQuantity: number
  ) => {
    setLoading(true);
    try {
      if (newQuantity <= 0) {
        toast.error("Quantity must be at least 1.");
        return;
      }

      const updatedCartItems = cartItems.map((item) => {
        if (item.book === productId) {
          return { ...item, quantity: newQuantity }; // Update quantity
        }
        return item;
      });

      const payload = {
        items: updatedCartItems.map((item) => ({
          book: item.book,
          quantity: item.quantity.toString(), // Convert quantity to string
        })),
      };

      const response = await api.put(`${Basket}/${cartId}`, payload);

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setCartItems(updatedCartItems);
        setLoading(false);
        toast.success("Quantity updated!");
      } else {
        throw new Error("Failed to update cart.");
      }
    } catch (error: any) {
      console.error("Error updating cart:", error);
      toast.error(
        error.message || "An error occurred while updating the cart."
      );
    }
  };

  // =================================================================
  // Fetch the cart from the API
  const getMyBasket = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${Basket}`);

      const items = response.data.items || [];
      const cartId = response.data._id;
      const total = response.data.total;

      if (items.length === 0) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      setCartItems(items);
      setCartId(cartId);
      setTotal(total);
    } catch  (error: any) {
      console.error("Error fetching basket from API:", error);
      
    } finally {
      setLoading(false);
    }
  };

  // ===================================================================
  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${GetAllcategory}`);
      const categoriesWithBooks = response.data.filter(
        (category: any) => category.books.length > 0
      );

      const allBooks =
        categoriesWithBooks.flatMap((category: any) =>
          category.books.map((book: any, index: number) => ({
            id: book._id,
            name: book.name,
            author: book.author || book.auther,
            price: book.price,
            image: TestImages[index % TestImages.length],
            categoryId: category._id,
          }))
        ) || [];
      setBooks(allBooks);
    } catch (error: any) {
      console.error("Error fetching books", error);
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // ==================================================================
  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await api.get(`${GetAllcategory}`);
      const categoriesWithBooks = response.data.filter(
        (category: any) => category.books.length > 0
      );

      const meregeData = categoriesWithBooks.map(
        (cate: any, index: number) => ({
          ...cate,
          image: CatImages[index % CatImages.length],
        })
      );

      setCategories(meregeData);
    } catch (error: any) {
      console.error("Error fetching categories", error);
      toast.error(error.response.data.message);
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchCategories();
    fetchBooks();
    getMyBasket();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        categories,
        books,
        cartId,
        total,
        loading,
        getMyBasket,
        confirmDelete,
        setConfirmDelete,
        setLoading,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
