import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantityProduct, increaseQuantityProduct, removeProductFromCart } from '../../../features/cart/cartSlice';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import LoadingModal from '../../common/LoadingModal';

const CheckoutStyle = styled.div`
  @media screen and (max-width: 1024px){
    padding: 0 40px;    
  }

  @media screen and (max-width: 500px){
    .checkout-heading{
      font-size: 40px;
      margin-bottom: 20px;
    }
    .cart-container{
      margin-bottom: 20px;
    }
  }
`


const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loadingCheckout, setLoadingCheckout] = useState(true);
  const handleTotalCostOfOneCourse = (price, quantity)=>{
    const total =  Number(price*quantity).toLocaleString('en-US')
    return total
  }

  const cart_products = useSelector((state)=>state.cart.products)
  const {user} = useSelector((state)=>state.auth)
  const handleTotalBill = ()=>{
    let totalBill = 0;
    cart_products.forEach((product)=>{
      totalBill += Number(product.price * product.quantity)
    })
    return totalBill
  }

  const checkoutRequest = async(list_idCourse)=>{
    const response = await axios.post(`http://localhost:5000/api/courses/payment/${user._id}`,list_idCourse)
    return response.data
  }

  const handleCheckout = ()=>{
    if(cart_products.length > 0){
      const list_idCourse = cart_products.map((product)=>product.id)
      setLoadingCheckout(true)
      checkoutRequest(list_idCourse).then((result)=>{
        setLoadingCheckout(false)
        if(result.status==='Success'){
          const timer = setTimeout(()=>{
            toast.success('Payment Success')
            navigate('/thankyou')
          },3000) 
        }else{
          toast.success('Some thing went wrong')
        }
      })

    }else{
      toast.error("You don't have any course in cart")
    }
    // navigate('/thankyou')
  }
  console.log(cart_products)
  return (
    <CheckoutStyle className='my-[40px] max-w-[1320px] mx-auto'>
      <h2 className='checkout-heading text-[46px] text-[var(--primary-color)] mb-[40px]'>Check out</h2>
      <div>
        <div className=''>
          <h3 className=' text-[20px] font-semibold'>Order detail</h3>
          
          <div>
            <div className='cart-container max-w-[1320px] mx-auto my-[40px] mb-[80px]'>
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
              </div>
            </div>

            <div className=''>
              <div>
                <div className='max-w-[500px]'>
                  <h3 className='mb-[12px] text-[20px] font-semibold'>Payment Method</h3>
                  <div className='flex justify-between items-center border-2 border-[#ccc]'>
                    <div className='px-4 py-3'>
                      <FontAwesomeIcon icon={faCreditCard} className="mr-[12px]"/>
                      <span className=''>Credit/Debit Card</span>
                    </div>
                    <div className='flex gap-x-3 mr-[12px]'>
                      <div>
                        <FontAwesomeIcon icon={faCcVisa} className="text-[20px]"/>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faCcMastercard} className="text-[20px]"/>
                      </div>
                    </div>
                  </div>

                  <div className='mt-[20px]'>
                    <label htmlFor="nameCard">Name on card</label>
                    <input type="text" name="nameCard" id = "nameCard" placeholder='Name on card' className='text-[#ccc] w-full py-[12px] px-[10px] text-[18px] mt-[6px] mb-[12px]'/>

                    <label htmlFor="numberCard">Card number</label>
                    <input type="text" name="numberCard" id = "numberCard" placeholder='0000 0000 0000 0000' className='text-[#ccc] w-full py-[12px] px-[10px] text-[18px] mt-[6px] mb-[12px]'/>

                    <label htmlFor="cvc">CVC/CVV</label>
                    <input type="text" name="cvc" id = "cvc" placeholder='CVC/CVV' className='text-[#ccc] w-full py-[12px] px-[10px] text-[18px] mt-[6px] mb-[12px]'/>

                    <label htmlFor="expiryDateCard">Expiry date</label>
                    <input type="text" name="expiryDateCard" id = "expiryDateCard" placeholder='Expiry date' className='text-[#ccc] w-full py-[12px] px-[10px] text-[18px] mt-[6px] mb-[12px]'/>

                    <button type='submit' className='ml-auto mt-[20px] px-[12px] py-[10px] bg-[var(--primary-color)] text-white' onClick={handleCheckout}>COMPLETE CHECKOUT</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </CheckoutStyle>
  );
};

export default Checkout;