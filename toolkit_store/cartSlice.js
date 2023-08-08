import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// let item;
// if (typeof window !== "undefined") {
//   item = localStorage.getItem("cartItems");
// }

const initialState = {
//   cartItems: item ? JSON.parse(item) : [],
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    product_addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex < 0) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
        toast.success(`${action.payload.title} added to the cart`, {
          position: "bottom-left",
        });
      } else {
        state.cartItems[itemIndex].quantity += 1;
        toast.info(`${action.payload.title} quantity increaased in cart`, {
          position: "bottom-left",
        });
      }
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    product_decQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        toast.info(`${action.payload.title} quantity decreased in cart`, {
          position: "bottom-left",
        });
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.error(`${action.payload.title} removed from cart`, {
          position: "bottom-left",
        });
      }
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    product_incQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity < action.payload.stock) {
        state.cartItems[itemIndex].quantity += 1;
        // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.info(`${action.payload.title} quantity increased in cart`, {
          position: "bottom-left",
        });
      } else {
        toast.warn(`${action.payload.title} product out of stock`, {
          position: "bottom-left",
        });
      }
    },
    product_removeItemFromCart: (state, action) => {
      // Method 1
      //   const itemIndex = state.cartItems.findIndex(
      //     (item) => item.id === action.payload.id
      //   );
      //   state.cartItems.splice(itemIndex, 1);

      //   Method 2
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.title} removed from cart`, {
        position: "bottom-left",
      });
    },
    product_addSubTotal: (state, action) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartQuantity = quantity;
      state.cartTotal = total;
      // console.log(state.cartTotalPrice)
    },
  },
});

export const {
  product_addToCart,
  product_incQuantity,
  product_decQuantity,
  product_removeItemFromCart,
  product_addSubTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
