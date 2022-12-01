import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Lessons = () => {
    const [lessons, setLessons] = useState([]);    
    const getLessons = async()=>{
        const response = await axios.get('http://localhost:5000/api/lessons/')
        return response.data.data;
    }
    
    useEffect(() =>{
        getLessons().then(data=>{
            console.log(data)
            setLessons(data)
        })
    },[])
    return (
        <div className="grid grid-cols-3">
            {lessons.length >0 && lessons.map(lesson=>{
                
                return (<div key={lesson._id}>
                    <h1>{lesson.title}</h1>
                    <video width="320" height="240" controls>
                        <source src={lesson.video} type="video/mp4" />
                    </video>
                </div>)
            })}
        </div>
    );
};

export default Lessons;