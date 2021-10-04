import React, {useState, useEffect} from "react";
import "./DisplayPage.css"
import Image from "../img/NoImage.png";
import { useParams } from "react-router";
import axios from "axios";
import PageNotFound from "./PageNotFound";

function DisplayPage() {

    
    const { id } = useParams();
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const TIMEOUT_INTERVAL = 6000;
    let textMaterialsDimension = ""
    let objectDimensions = ""
    const key = "1XyAnF97";
    const endpoint = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${key}`;

    async function fetchData(){

        try{

        const { data: result } = await axios.get(endpoint, { timeout: TIMEOUT_INTERVAL });
        setData( result );
        setError([]);
        
        } catch (err) {
            setError(err)
        }

    }


    useEffect(() => {
        fetchData();
    },[]);
    


    function modalClick(){
        
        var modal = document.getElementById("myModal");
        var img = document.getElementById("myImg");
        var modalImg = document.getElementById("img01");
        img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        }
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
        modal.style.display = "none";
    }
    }

      function getMaterials(){
        
        let material = ""

        data.artObject.materials.forEach( (element) => {
            material = element.charAt(0).toUpperCase() + element.slice(1);
            textMaterialsDimension = textMaterialsDimension + material + ", ";
        } )

        return textMaterialsDimension;
        
    }

    function getDimensions(){
        data.artObject.dimensions.forEach( (element, index, arr) => {
            switch(index){
                  case 0: objectDimensions = "(h)" + element.value + element.unit + " x ";
                  break;  
                  case 1: if ( index < arr.length-1){
                      objectDimensions = objectDimensions + "(w)" + element.value + element.unit + " x " ;
                      break; 
                      }else{
                          objectDimensions = objectDimensions + "(w)" + element.value + element.unit;
                          break;
                      }
                  case 2: 
                      if (element.type === "weight"){
                        objectDimensions = objectDimensions + "(weight)" + element.value + element.unit;
                      }else{
                          objectDimensions = objectDimensions + "(d)" + element.value + element.unit;
                          break;
                        }
                    }  
          })

          return objectDimensions;
    }


    function getDisplayPage(){
        return(
           (data &&
        <div  className="displayPage">
                    <div className="info">
                    <div className="infoEl">
                        <h1>{data.artObject.longTitle}</h1>
                    </div>
                    <div className="infoEl" id="captionEl">
                        <p >{getMaterials() + getDimensions()} </p>
                    </div>
                    <div className="infoEl">
                        <p>{data.artObject.plaqueDescriptionEnglish}</p>
                    </div>
                    <div className="image">
                    <img id="myImg" src={data.artObject.webImage.url} alt={Image} onClick={modalClick}></img>
                    </div> 
                        <div id="myModal" className="modal">
                        <span className="close">&times;</span>
                        <img src={data.artObject.webImage.url} className="modal-content" id="img01" alt={Image} />
                        <div id="caption">
                        <p>{data.artObject.longTitle}</p>
                        </div>
                        </div> 
                    </div>  
            </div>
        ))
    }

    function getErrorView(){

       if (error.response && (error.response.status === 400 )){
           return <PageNotFound></PageNotFound>
       }else if (error.response && (error.response.status > 400 || error.response.status <= 500)){
           return (
           <div className="errorDiv">
           <p> We are sorry, something went wrong! </p>
            <button id="errorBtn" onClick={() => fetchData()}>
                Try again
            </button>
         </div>)
       }else{ 
       return <div className="loader"></div>
       }
    }

     
        if (data.length !== 0 && error.length === 0){
            return(
                getDisplayPage()
            )
        } else 
        {
            return(
                getErrorView()
            )
        }
    
    


}
 
export default DisplayPage;