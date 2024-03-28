import React, { useState, useEffect, useRef } from "react";
import{NavLink} from "react-router-dom"
import { DownloadTableExcel } from "react-export-table-to-excel";
import {db} from "../../../firebase";
import {onValue, ref, remove} from 'firebase/database'
import { FaSearch } from "react-icons/fa";
import "../../../App.css";

const User = () => {
    const [search, setSearch] = useState("");
    const [User, setUser] = useState([]);
  
    
  
    useEffect(() => {
  const getUser = () => {
       onValue(ref(db, 'User') , (snapshot) => {
  
        if(snapshot.val() !==null){
          setUser({...snapshot.val()})
        }
      });
    }
  
     getUser();
        
        
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
            placeholder='Search User'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
     
            </div>
          
          <div className="text-end" >
            <h1>User List</h1>
            <NavLink to="add" className="btn-create">Create</NavLink>
            <DownloadTableExcel
                      filename="User table"
                      sheet="User"
                      
                      currentTableRef={tableRef.current}
                  >
  
                     <button className="btn-create"> Export Excel </button>
  
            </DownloadTableExcel>
            
          </div>
              <table className="styled-table" ref={tableRef}>
                <thead>
                  <tr>
                    <th style={{textAlign: "center"}}>User Name</th>
                    <th style={{textAlign: "center"}}>Permission</th>
                    <th style={{textAlign: "center"}}>Date of Join</th>
                    <th style={{textAlign: "center"}}>Mobile</th>
                    <th style={{textAlign: "center"}}>Email</th>
                    <th style={{textAlign: "center"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {Object.keys(User).filter(
                      (id) => {
                        return search.toLowerCase() === ''
                          ? User[id]
                          : User[id].name.toLowerCase().includes(search);
                      }
                    ).sort((a,b) => User[a].name > User[b].code ? 1 : -1)
                    .map((id) => {
                      return (
                              <tr>
                                <td style={{textAlign: "center"}}>{User[id].name}</td>
                                <td style={{textAlign: "center"}}>{User[id].permission}</td>
                                <td style={{textAlign: "center"}}>{User[id].doj}</td>
                                <td style={{textAlign: "center"}}>{User[id].mobile}</td>
                                <td style={{textAlign: "center"}}>{User[id].email}</td>
                                <td style={{textAlign: "center"}}>
                                  <NavLink to={`update/${id}`}  className='btn-edit' >Edit</NavLink>
                                  <button className='btn-delete' onClick={() => {if(window.confirm("Are you sure that you wanted to delete that staff?")){remove(ref(db, 'staff/' + id)); window.location.reload(true);}}}>Delete</button>
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

export default User
