import React, { useState, useEffect, useRef } from "react";
import{NavLink} from "react-router-dom"
import { DownloadTableExcel } from "react-export-table-to-excel";
import {db} from "../../../firebase";
import {onValue, ref, remove} from 'firebase/database'
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const SP = () => {
  const [search, setSearch] = useState("");
    const [shift, setShift] = useState([]);
  
    useEffect(() => {
  const getShift = () => {
       onValue(ref(db, 'shiftpattern') , (snapshot) => {
  
        if(snapshot.val() !==null){
          setShift({...snapshot.val()})
        }
      });
    }
  
     getShift();
        
        
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
            placeholder='Search Shift Pattern'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
     
            </div>
          
          <div className="text-end" >
            <h1>Shift Pattern List</h1>
            <NavLink to="add" className="btn-create">Create</NavLink>
            <DownloadTableExcel
                      filename="Shift Pattern table"
                      sheet="Shift Pattern"
                      
                      currentTableRef={tableRef.current}
                  >
  
                     <button className="btn-create"> Export Excel </button>
  
            </DownloadTableExcel>
            
          </div>
              <table className="styled-table" ref={tableRef}>
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}}>Shift</th>
                    <th style={{textAlign: "center"}}>Shift Pattern</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {Object.keys(shift).filter(
                      (id) => {
                        return search.toLowerCase() === ''
                          ? shift[id]
                          : shift[id].position.toLowerCase().includes(search);
                      }
                    ).sort((a,b) => shift[a].position > shift[b].position ? 1 : -1)
                    .map((id) => {
                      return (
                              <tr>
                                <td style={{textAlign: "center"}}>{shift[id].position}</td>
                                <td style={{textAlign: "center"}}>{shift[id].shiftpattern}</td>
                                <td style={{textAlign: "center"}}>
                                  <NavLink to={`update/${id}`}  className='btn-edit' >Edit</NavLink>
                                  <button className='btn-delete' onClick={() => {if(window.confirm("Are you sure that you wanted to delete that shift pattern?")){remove(ref(db, 'shiftpattern/' + id));window.location.reload(true);}}}>Delete</button>
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
            
    );
}

export default SP
