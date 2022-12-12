import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CartEmptyStyle = styled.div`
  @media screen and (max-width: 1024px){
    padding: 0 40px;
  }

  @media screen and (max-width: 500px){
    .empty-cart-img-box{
      height: 300px;
    }
  }

`

const CartEmpty = () => {
  return (
    <CartEmptyStyle className='bg-[#F8F8F8]'>
      <div className='max-w-[1320px] mx-auto py-[80px]'>
        <div className='flex justify-center'>
          <div className='empty-cart-img-box w-[500px] h-[400px]'><img className='w-full h-full' src="https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="" /></div>
        </div>
        <NavLink to="/courses" className='px-[10px] py-[10px] bg-[var(--primary-color)] text-white float-right'>GO TO COURSES</NavLink>
      </div>
    </CartEmptyStyle>
  );
};

export default CartEmpty;