import React from 'react';
import Button from '../../common/Button';
import styled from 'styled-components';
const ContactStyle = styled.div`
    @media screen and (max-width: 1024px){
        padding: 128px 40px;
    }

    @media screen and (max-width: 767px){
        .input-item{
            width: 100%;
        }
        .name-email-form-box{
            justify-content: space-between;
        }
    }

    @media screen and (max-width: 500px){
        padding: 80px 20px;
        .contact-info{
            flex-direction: column;
            gap: 12px;
        }
        .name-email-form-box{
            flex-direction: column;
            gap: 12px;
        }

        .name-email-form-input{
            width: 100%;
        }
    }
`

const Contact = () => {
    return (
        <ContactStyle className="max-w-[1320px] mx-auto py-[128px]">
            <div>
                <h1 className='text-[46px] font-normal text-[var(--primary-color)] mb-[40px]'>Contact us</h1>
                <p className='text-[16px] font-normal text-[#999999] mb-[24px]'>We're open for any suggestion or just to have a chat</p>
            </div>

            <div className='contact-info flex gap-x-8 mb-[24px]'>
                <div>
                    <h2 className='text-[13px] font-bold'>ADDRESS:</h2>
                    <p className='text-[16px] font-normal text-[#999999]'>198 West 21th Street, Suite 721 New York NY 10016</p>
                </div>
                <div>
                    <h2 className='text-[13px] font-bold'>EMAIL:</h2>
                    <p className='text-[16px] font-normal text-[#999999]'>info@yoursite.com</p>
                </div>
                <div>
                    <h2 className='text-[13px] font-bold'>PHONE:</h2>
                    <p className='text-[16px] font-normal text-[#999999]'>+ 1235 2355 98</p>
                </div>
            </div>

            <div>
                <div className='name-email-form-box flex gap-x-[32px] mb-[10px]'>
                    <input type="text" name="name" id="name" placeholder='name' className='name-email-form-input w-[264px] py-[6px] px-[12px]'/>
                    <input type="text" name="email" id="email" placeholder='email'  className='name-email-form-input w-[264px] py-[6px] px-[12px]'/>
                </div>
                <div className='mb-[10px]'>
                    <input type="text" name="subject" id="subject" placeholder='subject' className='input-item w-[560px] py-[6px] px-[12px]'/>
                </div>
                <div className='mb-[10px]'>
                    <textarea name="message" id="message" placeholder='Create a message here' className='input-item border-2 w-[560px] py-[6px] px-[12px] h-[98px]'/>
                </div>
                <Button primary={true}>SEND MESSAGE</Button>
            </div>

        </ContactStyle>
    );
};

export default Contact;