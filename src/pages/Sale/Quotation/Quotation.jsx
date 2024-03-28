import React, { useState, useEffect, useRef } from "react";
import{NavLink} from "react-router-dom"
import { DownloadTableExcel } from "react-export-table-to-excel";
import {db, storage} from "../../../firebase";
import {onValue, ref, remove} from 'firebase/database';
import { getDownloadURL, ref as sRef } from "firebase/storage";
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const Quotation = () => {
    const [search, setSearch] = useState("");
    const [Quotation, setQuotation] = useState([]);
    const [resume, setResume] = useState(null);
  
    useEffect(() => {
    const getQuotation = () => {
       onValue(ref(db, 'Quotation') , (snapshot) => {
  
        if(snapshot.val() !==null){
          setQuotation({...snapshot.val()})
        }
      });
    }
  
     getQuotation();
        
        
    },[]);

    const openInNewTab = (url) => {
      window.open(url, "_blank", "noopener,noreferrer");
    };
  
    useEffect(() => {
      getDownloadURL(sRef(storage, "meisze-quotation-template-pdf.pdf")).then(
        (url) => {
          setResume(url);
        }
      );
    });
  
    const tableRef = useRef(null);

  
    return (
      <div className="main">
        <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      
  
        <div style={{padding: "0px 215px"}} className="container" >
          <div className= "input-wrapper">
  
          <FaSearch id='search-icon' />
          <input 
            type='text'
            className='inputField'
            placeholder='Search Bar Code'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
     
            </div>
          
          <div className="text-end" >
            <h1>Quotation List</h1>
            <NavLink to="add" className="btn-create">Create</NavLink>
            <DownloadTableExcel
                      filename="Quotation table"
                      sheet="Quotation"
                      
                      currentTableRef={tableRef.current}
                  >
  
                     <button className="btn-create"> Export Excel </button>
  
            </DownloadTableExcel>
            <button className="btn-create" onClick={() => openInNewTab(resume)}>
              Export PDF
            </button>
          </div>
              <table className="styled-table" ref={tableRef}>
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}}>Quotation no.</th>
                    <th style={{textAlign: "center"}}>Date</th>
                    <th style={{textAlign: "center"}}>Item</th>
                    <th style={{textAlign: "center"}}>Quantity</th>
                    <th style={{textAlign: "center"}}>Price</th>
                    <th style={{textAlign: "center"}}>Total</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {Object.keys(Quotation).filter(
                      (id) => {
                        return search.toLowerCase() === ''
                          ? Quotation[id]
                          : Quotation[id].no.toLowerCase().includes(search);
                      }
                    ).sort((a,b) => Quotation[a].no > Quotation[b].no ? 1 : -1)
                    .map((id) => {
                      return (
                              <tr>
  
                                <td style={{textAlign: "center"}}>{Quotation[id].no}</td>
                                <td style={{textAlign: "center"}}>{Quotation[id].date}</td>
                                <td style={{textAlign: "center"}}>{Quotation[id].item}</td>
                                <td style={{textAlign: "center"}}>{Quotation[id].quantity}</td>
                                <td style={{textAlign: "center"}}>{Quotation[id].price}</td>
                                <td style={{textAlign: "center"}}>{Quotation[id].total}</td>
                                <td style={{textAlign: "center"}}>
                                  <NavLink to={`update/${id}`}  className='btn-edit' >Edit</NavLink>
                                  <button className='btn-delete' onClick={() => {if(window.confirm("Are you sure that you wanted to delete that quotation?")){remove(ref(db, 'Quotation/' + id)); window.location.reload(true);}}}>Delete</button>
                                  <NavLink to={`view/${id}`} className='btn-view' >View</NavLink>
                                </td>
                              </tr>
                      );
                    })}
                </tbody>
                
        </table>
        
            </div>
      </div>
      </div>
    )
}

export default Quotation

