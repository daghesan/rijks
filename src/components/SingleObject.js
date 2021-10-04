import React from "react";
import "./ListObjects.css";
import Image from "../img/NoImage.png";
import { Link } from 'react-router-dom';


function SingleObject({value}){

    if(value){
    if (value.hasImage){
    return(
    <div className="grid-item" >
                    <img id="imageItem" src={value.webImage.url} alt={Image}></img>
                    <Link className="linkItem" to={{
                    pathname:`/object/${value.objectNumber}`
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
            <div className="grid-item" >
            <img id="imageItem" src={Image} alt={Image}></img>
            <Link className="linkItem" to={{
            pathname:`/object/${value.objectNumber}`
            }} 
            target="_blank"
            >
            {value.title}
            </Link>
            <p>{value.principalOrFirstMaker}</p>
            </div>)
        }
    }   
}
 
export default SingleObject;