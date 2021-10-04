import React, { useState, useEffect, useRef } from "react";
import "./SearchPage.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from 'react-router-dom';
import axios from "axios";
import Pagination from "./Pagination";
import ListObjects from "./ListObjects";
import PageNotFound from "./PageNotFound";
import Dropdown from "./Dropdown";

function SearchPage() {

  /* dataset from the API*/
  const [data, setData] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [visibility, setVisibility] = useState("hidden");
  const [resultPage, setResultPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const node = useRef()
  /* endpoint API */
  const key = "1XyAnF97";
  const endpoint = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&p=${resultPage}&ps=30`;


  async function fetchSuggestion(){
    const { data: result } = await axios.get(endpoint+`&q=${wordEntered}`);
    if (result.count !== 0){  
    setSuggestion( result );
    } else {
      setVisibility("hidden");
    }
    }

    async function fetchData(){

      try{    
        const sort = sortType !== "" ? ("&s="+sortType) : ""
        const { data: result } = await axios.get(endpoint+`&q=${wordEntered}+${sort}`);
        if (result.count !== 0){
          setData( result );
          setError([]);
        }
        //console.log(result)
      }catch(err){
        setError(err)
      }
          
    }

  /* useEffect hooks for mounting and updating components */

  useEffect(() => {
  fetchSuggestion();
  },[wordEntered]);

  useEffect(() => {
  fetchData();
  },[resultPage,sortType]);


  
  const checkIfClickedOutside = e => {
    if (visibility ==="visible" && node.current && !node.current.contains(e.target)) {
      clearInput()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [visibility])


  /* search and input */

  const pressEnter = (event) =>{
    if (event.key === "Enter"){
      fetchData()
      clearInput()
    }
  }

  const onChangeWordEntered = (event) =>{
    const word = event.target.value;
    setWordEntered(word);
    if (suggestion.count === 0){
      setVisibility("hidden");
    } else {
      setVisibility("visible");
    }
  }

  const clearInput = () => {
    setWordEntered("");
    setVisibility("hidden");
  };

  const onPageChange = (page) =>{
    setResultPage(page);
  }

  const onSort = (sort) => {
    
   /* create a state to save the sorting type */
    switch(sort){
    case "Relevance":
    setSortType("relevance"); 
    break;
    case "Date (descending)":
      setSortType("achronologic"); 
    break;
    case "Date (ascending)":
     setSortType("chronologic"); 
    break;
    case "Artist":
    setSortType("artist"); 
    break;
    }

  }

  function renderSearch(){
    return(
      /* this can be refactored soon in a new component */
    <div className="search">
      <div ref={node} className="searchInputs">
        <input
          type="text"
          placeholder={"Search for an artwork" }
          value={wordEntered}
          onChange={onChangeWordEntered}
          onKeyPress={pressEnter} 
        />
        <div className="searchIcon">
        <CloseIcon id="clearBtn" onClick={clearInput} />
        </div>
        <button className="searchButton">
        <SearchIcon id="searchBtn" onClick={() => {fetchData();clearInput()}} />
        </button>
      </div>
      {
      /* this can be refactored soon in a new component */
      suggestion.length !== 0 && (
        <div className="dataResult" style={{visibility: visibility}}>
          {suggestion.artObjects.slice(0,5).map((value) => {
           return (
              <Link className="dataItem" to={{
                pathname:`/object/${value.objectNumber}`
              }} 
              key={value.id}
                target="_blank"
                > 
                <p className="longTitle">{value.longTitle} </p>
              </Link>
            );
  
          })}
        </div>
      )}
  </div>
    )
  }

  function renderListObjects(){
    return(
      <div className="listData">
    {

    (data.length !== 0) && <ListObjects data={data} /> 

    }
    </div>
  )
  }

  function renderFiltering(){
    return(
      <div className="filtering">
      <Pagination perPage={30} resultPage={resultPage} objectsCount={data.count} onChange={onPageChange}/>
      <Dropdown dropdownName={"Sort by"} linkList={ ["Relevance","Date (descending)","Date (ascending)","Artist"] } onClickSort={onSort} ></Dropdown>
      </div>
    )
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

/* general render method */

if (data.length !== 0 && error.length === 0){
  return(
    <div className="container">
    {renderSearch()}
    {renderFiltering()}
    {renderListObjects()}

    
  </div>/* container */
  )
} else 
{
  return(
      getErrorView()
  )
}

  

}

export default SearchPage;
