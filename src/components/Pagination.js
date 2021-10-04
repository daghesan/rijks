import React, {useState} from 'react'
import "./Pagination.css"
import _ from 'lodash';

function Pagination(props) {

    const {perPage, resultPage, objectsCount, onChange} = props
    const [currentPage, setCurrentPage] = useState(1);
    
    let count=Math.ceil(10000 / perPage);
    if (objectsCount<10000){
        count = Math.ceil(objectsCount / perPage);
    }

    const pagesCount = count;
    
    if (pagesCount === 1){ return null;}
    else{}
    let init = currentPage;
    let end = (currentPage)+10;
    const pages = _.range(init, end );
    
    
    function goToNextPage() {
        if (currentPage + 10 < pagesCount)
        setCurrentPage(currentPage+10);
     }
   
     function goToPreviousPage() {
        if (currentPage > 10) setCurrentPage(currentPage-10)
     }

    return (
        <div className="pagination">
            <button className="previous" onClick={goToPreviousPage}>{"<<"}</button>
            { pages.map( i => {
                /* I must check that the index i is less than or equal to the page number, otherwise it won't render */
                if (i < pagesCount){return(
                    <a className={ i === resultPage ? "active" : ""} key={i} onClick={() => onChange(i)}>{i}</a>
                    )}
            })
            }
            <button className="next" onClick={goToNextPage}>{">>"}</button>
        </div>
    );

   
}
 
export default Pagination;