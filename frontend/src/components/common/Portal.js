import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
function Portal({children, containerID}) {
    // containerID chính là vị trí của cái wrapper mà mình muốn chèn modal vào trong đó
    const [wrapper, setWrapper] = useState();
    useEffect(
        ()=>{
            let container = document.querySelector(`#${containerID}`)
            if(!container){
                container = document.createElement('div')
                container.id = containerID;
                document.body.appendChild(container);
            }
            setWrapper(container);

            return ()=>{
                if(!containerID){
                    document.body.removeChild(container);
                }
            }

        },[containerID]
    )

    if(!wrapper){
        return null;
    }

    return ReactDOM.createPortal(children, wrapper);
    
}

export default Portal;