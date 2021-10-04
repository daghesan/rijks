import React from "react";
import "./ListObjects.css";
import Masonry from 'react-masonry-css';
import SingleObject from "./SingleObject";

function ListObjects({data}){

    const breakpoints = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    }

    return ( 
        

        <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
           
            {data && data.artObjects.map((value) => {
                    return <SingleObject value={value}  key={value.id}/>
                    })
            }
  
        </Masonry>
     );
    

}
 
export default ListObjects;