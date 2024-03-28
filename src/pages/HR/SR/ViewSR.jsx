import React, {useState, useEffect} from 'react'
import {db} from "../../../firebase";

import{NavLink, useParams} from "react-router-dom"
import './AddEdit.css'
import {ref, onValue } from 'firebase/database'
import logo from "../../../images/meisze.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewSR = () => {
    const [loader, setLoader] = useState(false);


    const [staff, setStaff] = useState([]);
    
    const {id}=useParams();
    
    useEffect(() => {
        const getStaff = () => {
          onValue(ref(db, 'salaryreport/' + id ) , (snapshot) => {
      
           if(snapshot.val() !==null){
             setStaff({...(snapshot.val())})
             
           }
         });
       }
        getStaff();

          
    },[id]);
    
  
    const downloadPDF = () => {
      const capture = document.querySelector(".actual-receipt");
      setLoader(true);
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        setLoader(false);
        doc.save("salaryreceipt.pdf");
      });
    };

  
    return (
    <div className="main">
    <div className="App" style={{width:"100%", padding:"100px", height:"1000px"}}>
      <div className="wrapper">
        <div className="receipt-box">
          {/* actual receipt */}
          <div className="actual-receipt">
            {/* organization logo */}
  
            <div className="receipt-organization-logo">
              <img alt="logo" src={logo} />
            </div>
  
            
  
            {/* organization name */}
            <h5>Salary Receipt of {staff.month}</h5>
  
            <br />
  
            <div className="p-box">
            
            <div className="data-row first">
                <span>
                  <span className="font-weight">
                    Staff ID:
                  </span>
                  {' '}
                  
                  {staff.staffno}
                </span>
                
            </div>
  
            <div className="data-row">
                <span>
                  <span className="font-weight">
                    Staff:
                  </span>
                  {' '}
                  
                  {staff.name}
                </span>
                
              </div>
  
              <div className="data-row">
                <span>
                  <span className="font-weight">
                    Department:
                  </span>
                  {' '}
                  
                  {staff.department}
                </span>
                
              </div>
  
              <div className="data-row">
                <span>
                  <span className="font-weight">
                    Position:
                  </span>
                  {' '}
                  
                  {staff.position}
                </span>
                
              </div>
  
              <div className="data-row first">
                <span>
                  <span className="font-weight">
                    Salary:
                  </span>
                  {' '}
                  
                  ${staff.salary}
                </span>
  
                <span>
                  <span className="font-weight">
                    MPF:
                  </span>
                  {' '}
                  
                  ${staff.salary > 30000 ? 1500 :(staff.salary)*0.05}
                </span>
                
              </div>
  
              <div className="data-row">
                <span>
                  <span className="font-weight">
                    Salary After deduct MPF: 
                  </span>
                  {' '}
                  
                  ${staff.salary - (staff.salary > 30000 ? 1500 :(staff.salary)*0.05)}
                </span>
                
              </div>
  
            </div>
          </div>
          {/* end of actual receipt */}
  
          {/* receipt action */}
          <div className="receipt-actions-div">
            <div className="actions-right">
              <button
                className="btn-edit"
                onClick={downloadPDF}
                disabled={!(loader === false)}
              >
                {loader ? <span>Downloading</span> : <span>Download</span>}
              </button>
              <NavLink to="/mainmeun/hr/sr" className='btn-delete'>Cancel</NavLink>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
}

export default ViewSR
