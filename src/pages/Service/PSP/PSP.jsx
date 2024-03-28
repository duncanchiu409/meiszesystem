import React, { useState, useEffect, useRef } from "react";
import{NavLink} from "react-router-dom"
import { DownloadTableExcel } from "react-export-table-to-excel";
import {db} from "../../../firebase";
import {onValue, ref, remove} from 'firebase/database'
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const PSP = () => {
  const [search, setSearch] = useState("");
    const [PSP, setPSP] = useState([]);
  
    useEffect(() => {
  const getPSP = () => {
       onValue(ref(db, 'PSP') , (snapshot) => {
  
        if(snapshot.val() !==null){
          setPSP({...snapshot.val()})
        }
      });
    }
  
     getPSP();
        
        
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
            placeholder='Search Service'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
     
            </div>
          
          <div className="text-end" >
            <h1>Purchase Service List</h1>
            <NavLink to="add" className="btn-create">Create</NavLink>
            <DownloadTableExcel
                      filename="Purchase Service table"
                      sheet="Purchase Service"
                      
                      currentTableRef={tableRef.current}
                  >
  
                     <button className="btn-create"> Export Excel </button>
  
            </DownloadTableExcel>
            
          </div>
              <table className="styled-table" ref={tableRef}>
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}}>Service</th>
                    <th style={{textAlign: "center"}}>Plan</th>
                    <th style={{textAlign: "center"}}>Quantity</th>
                    <th style={{textAlign: "center"}}>Start Day</th>
                    <th style={{textAlign: "center"}}>End Day</th>
                    <th style={{textAlign: "center"}}>Purchased By</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {Object.keys(PSP).filter(
                      (id) => {
                        return search.toLowerCase() === ''
                          ? PSP[id]
                          : PSP[id].name.toLowerCase().includes(search);
                      }
                    ).sort((a,b) => PSP[a].name > PSP[b].name ? 1 : -1)
                    .map((id) => {
                      return (
                              <tr>
                                <td style={{textAlign: "center"}}>{PSP[id].name}</td>
                                <td style={{textAlign: "center"}}>{PSP[id].plan}</td>
                                <td style={{textAlign: "center"}}>{PSP[id].quantity}</td>
                                <td style={{textAlign: "center"}}>{PSP[id].sd}</td>
                                <td style={{textAlign: "center"}}>{PSP[id].ed}</td>
                                <td style={{textAlign: "center"}}>{PSP[id].pb}</td>
                                <td style={{textAlign: "center"}}>
                                  <button className='btn-delete' onClick={() => {if(window.confirm("Are you sure that you wanted to delete that purchase?")){remove(ref(db, 'PSP/' + id)); window.location.reload(true);}}}>Cancel Purchase</button>
                                </td>
                              </tr>
                      );
                    })}
                </tbody>
                
        </table>
        
            </div>
      </div>
      </div>
            
    );
}

export default PSP
