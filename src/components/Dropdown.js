import React from 'react';

export default function Dropdown(props) {

    const { dropdownName, linkList, onClickSort } = props;

    return (
        <div className="dropdown">
            <button className="dropbtn">{dropdownName}</button>
                <div className="dropdown-content">
                    { linkList && linkList.map( i => {
                        return (<a key={i} onClick={() => onClickSort(i)} >{i}</a>)
                    }) }
                </div>
        </div>
    )
}
