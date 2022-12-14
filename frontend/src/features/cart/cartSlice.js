
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total_product: 0,
  products: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantityProduct: (state, action)=>{
      // state.total_product++
      // state.products[action.payload].quantity++
      // return {
      //   ...state
      // }
      const result = {
        ...state,
        total_product: state.total_product +1,
        products: state.products.map((product)=>product.id === action.payload?{...product, quantity: product.quantity +1}: product)
      }
      return result     
    },
    decreaseQuantityProduct: (state,action)=>{
      let quantity = 0;

      for (let i=0;i<state.products.length;i++){
        if(state.products[i].id === action.payload){
          quantity = state.products[i].quantity
        }
      }
      if(quantity>1){
        const result = {
          ...state,
          total_product: state.total_product -1,
          products: state.products.map((product)=>product.id === action.payload?{...product, quantity: product.quantity -1}: product)
        }
        return result
      }
    },
    addProductToCart: (state, action)=>{
      console.log(action.payload.name)
      let result = null;
      if(state.total_product===0){
        const product = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          image: action.payload.image         
        }

        result = {
          ...state,
          total_product: state.total_product+1,
          products: [...state.products, product]
        }

      }else{
        let check = false
        state.products.map((product, index)=>{
          if(product.id === action.payload.id){
            const quantity = state.products[index].quantity+1
            result = {
              ...state,
              total_product: state.total_product+1,
              products: state.products.map((product, index)=>
                product.id === action.payload.id ? {...product,quantity: quantity }:product
              )
            }
            check=true
          }
        })
        if(!check){
          const product = {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: 1,
            image: action.payload.image         
          }
          result = {
            ...state,
            total_product: state.total_product+1,
            products: [...state.products, product]
          }
  
        }
      }
      return result
    },
    removeProductFromCart: (state, action)=>{
      // const _quantity = state.products[action.payload].quantity
      let quantity = 0;

      for (let i=0;i<state.products.length;i++){
        if(state.products[i].id === action.payload){
          quantity = state.products[i].quantity
        }
      }
      
      const result = {
        ...state,
        total_product: state.total_product - quantity,
        products: state.products.filter((product)=>{
          return product.id !== action.payload
        })
      }


      return result
    }
  }
})
export const {increaseQuantityProduct,decreaseQuantityProduct,addProductToCart,removeProductFromCart} = cartSlice.actions
export default cartSlice.reducer