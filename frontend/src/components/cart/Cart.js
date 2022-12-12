import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {increaseQuantityProduct, decreaseQuantityProduct,removeProductFromCart} from '../../features/cart/cartSlice'
import CartEmpty from './CartEmpty';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const CartStyle = styled.div`
  @media screen and (max-width: 1024px){
    padding: 0 40px;
  }

  @media screen and (max-width: 500px){
    .cart-bottom{
      flex-direction: column;
      gap: 20px 0px;
    }    
  }
`
const Cart = () => {
  const dispatch = useDispatch()
  const handleTotalCostOfOneCourse = (price, quantity)=>{
    const total =  Number(price*quantity).toLocaleString('en-US')
    return total
  }

  const cart_products = useSelector((state)=>state.cart.products)

  const handleTotalBill = ()=>{
    let totalBill = 0;
    cart_products.forEach((product)=>{
      totalBill += Number(product.price * product.quantity)
    })
    return totalBill
  }
  
  if(cart_products.length ===0 ){
    return <CartEmpty/>
  }

  return (
    <CartStyle className='cart-container max-w-[1320px] mx-auto my-[40px] mb-[80px]'>
      <h2 className='text-[var(--primary-color)] text-[46px] mb-[40px]'>My Cart</h2>
      <div className='overflow-x-auto'>
        <table className='w-[1320px] cart-table'>
        
            <tbody>
              <tr className='cart-table-row grid grid-cols-6 text-[20px] font-semibold mb-[20px]'>
                <td>Name</td>
                <td>Image</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total Price</td>
                <td></td>
              </tr>
              {cart_products.length >0 && cart_products.map((product, index)=>{
                return ( <tr key={index} className='cart-table-row grid grid-cols-6 py-[20px]'>
                  <td className='my-auto'>{product.name}</td>
                  <td className='my-auto'><img className='ml-[10px]' src = {product.image} style={{width:'120px',height:'68px'}}/></td>
                  <td className='my-auto'>{product.price}</td>
                  <td className='my-auto '>
                    <button className='px-[15px] py-[5px] text-[22px] bg-[#ccc] text-[var(--primary-color)]' onClick={()=>{
                      dispatch(increaseQuantityProduct(product.id))
                    }}>+</button>
                    <span className='text-[22px] px-[25px]'>{product.quantity}</span>
                    <button className='px-[15px] py-[5px] text-[22px] bg-[#ccc] text-[var(--primary-color)]' onClick={()=>{
                      dispatch(decreaseQuantityProduct(product.id))
                    }}>-</button>
                  </td>
                  <td className='my-auto'>{handleTotalCostOfOneCourse(product.price, product.quantity)} VNĐ</td>
                  <td className='my-auto'><FontAwesomeIcon icon={faTrashCan} className="cursor-pointer text-[22px]" onClick={()=>{
                    dispatch(removeProductFromCart(product.id))
                  }}/></td>
                </tr>)
              })}
            </tbody>
        </table>
      </div>

      <div className='cart-bottom flex justify-between items-center mt-[40px]'>
        <h3 className='font-semibold text-[20px] text-[var(--primary-color)]'>Total cost: {handleTotalBill()} VNĐ</h3>
        <NavLink className='px-[20px] py-[10px] bg-[var(--primary-color)] text-white' to="/checkout">CHECKOUT</NavLink>
      </div>
      

    </CartStyle>
  );
};

export default Cart;