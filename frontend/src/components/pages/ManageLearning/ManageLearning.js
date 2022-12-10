import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import  axios  from 'axios';


const ManageLearning = () => {
  const test = async()=>{
    const res = await axios.get('https://');
  }
  return (
    <div>
      Manage Learning
      <FontAwesomeIcon icon={faClock}/>
    </div>
  );
};

export default ManageLearning;