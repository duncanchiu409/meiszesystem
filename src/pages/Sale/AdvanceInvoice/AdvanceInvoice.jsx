import React, { useState, useEffect, useRef } from "react";
import{NavLink} from "react-router-dom"
import { DownloadTableExcel } from "react-export-table-to-excel";
import {db} from "../../../firebase";
import {onValue, ref} from 'firebase/database'
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const AdvanceInvoice = () => {
    const [search, setSearch] = useState("");
    const [AdvanceInvoice, setAdvanceInvoice] = useState([]);
  
    useEffect(() => {
    const getAdvanceInvoice = () => {
       onValue(ref(db, 'AdvanceInvoice') , (snapshot) => {
  
        if(snapshot.val() !==null){
          setAdvanceInvoice({...snapshot.val()})
        }
      });
    }
  
     getAdvanceInvoice();
        
        
    },[]);
  
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
            <h1>Advance Invoice List</h1>
            <NavLink to="add" className="btn-create">Create</NavLink>
            <DownloadTableExcel
                      filename="Advance Invoice table"
                      sheet="Advance Invoice"
                      
                      currentTableRef={tableRef.current}
                  >
  
                     <button className="btn-create"> Export Excel </button>
  
            </DownloadTableExcel>
            
          </div>
              <table className="styled-table" ref={tableRef}>
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}}>Advance Invoice no.</th>
                    <th style={{textAlign: "center"}}>Date</th>
                    <th style={{textAlign: "center"}}>Bill to</th>
                    <th style={{textAlign: "center"}}>Item</th>
                    <th style={{textAlign: "center"}}>Total Amount</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {Object.keys(AdvanceInvoice).filter(
                      (id) => {
                        return search.toLowerCase() === ''
                          ? AdvanceInvoice[id]
                          : AdvanceInvoice[id].barcode.toLowerCase().includes(search);
                      }
                    ).sort((a,b) => AdvanceInvoice[a].no > AdvanceInvoice[b].no ? 1 : -1)
                    .map((id) => {
                      return (
                              <tr>
  
                                <td style={{textAlign: "center"}}>{AdvanceInvoice[id].no}</td>
                                <td style={{textAlign: "center"}}>{AdvanceInvoice[id].date}</td>
                                <td style={{textAlign: "center"}}>{AdvanceInvoice[id].bt}</td>
                               
                                <td style={{textAlign: "center"}}>{AdvanceInvoice[id].item}</td>
                                <td style={{textAlign: "center"}}>${AdvanceInvoice[id].total}</td>
                                
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

export default AdvanceInvoice
