import React from "react";
import { Link } from 'react-router-dom';
import "./ListData.css";
import Masonry from 'react-masonry-css';
import Image from "../img/NoImage.png";

function ListData({data}){

    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }

    return ( 
        

        <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
           
            {
                
                data && data.artObjects.map((value) => {
                    
                    if (value.hasImage){
                        return(
                        <div className="grid-item" key={value.id}>
                            { 
                            value.hasImage && <img id="imageItem" src={value.webImage.url} alt=""></img>
                            }
                            <Link className="linkItem" to={{
                            pathname:`/${value.objectNumber}`
                            }} 
                            target="_blank"
                            >
                            {value.title}
                            </Link>
                            <p>{value.principalOrFirstMaker}</p>
                            </div>
                            )
                    }else{
                        return(
                        <div className="grid-item" key={value.id}>
                        <img id="imageItem" src={Image} alt=""></img>
                        <Link className="linkItem" to={{
                        pathname:`/${value.objectNumber}`
                        }} 
                        target="_blank"
                        >
                        {value.title}
                        </Link>
                        <p>{value.principalOrFirstMaker}</p>
                        </div>)}

                })

                }
            
  
            </Masonry>
     );
    

}
 
export default ListData;