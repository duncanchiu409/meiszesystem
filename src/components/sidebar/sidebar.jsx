import React from 'react'
import styled from 'styled-components'
import{Outlet, useNavigate} from "react-router-dom"
import SidebarData from './sidebardata'
import SidebarDataPublic from './sidebardatepublic'
import Submenu from './SubMenu'
import  "../sidebar/sidebar.css"
import { 
  // getAuth,
   signOut } from "firebase/auth";
import {auth} from "../../firebase"
import logo from "../../images/meisze.png";


const Nav = styled.div`
  background: #181b3a;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: fixed;
`;



const LogoutButton = styled.div`
  margin-right: 2rem;
  height: 80px;
  display: flex;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #181b3a;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  transition: 350ms;
  z-index: 10; 
  flex-direction: colum;

  overflow-y: auto;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {

  // const vauth = getAuth();
  // const user = vauth.currentUser;
  // window.localStorage.setItem("User", user.email)

  const navigate = useNavigate()
  const handleClick = () =>{
    signOut(auth).then(val=>{
      if(window.confirm("Do you want to log out?")){
        window.localStorage.removeItem("User")
        navigate('/')
      }
      
  }).catch((error) => {

});
  }

  return (
    <>
      <Nav>
          <LogoutButton>
            <button className='btn btn-success' onClick={(e) => handleClick(e)}>Logout</button>
          </LogoutButton>
             

            
          
      </Nav>
      <SidebarNav>

          { window.localStorage.getItem("User")==="admin@gmail.com"  ?

          <SidebarWrap>
            <img style={{height: "80px",
              color: "#e1e9fc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }} 
              alt="logo" src={logo} />
            {SidebarData.map((item, index) => {
              return <Submenu item={item} key={index}/>;
            })}
          </SidebarWrap> 
          
          :
          
          <SidebarWrap>
            <img style={{height: "80px",
              color: "#e1e9fc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              }} 
              alt="logo" src={logo} />
            {SidebarDataPublic.map((item, index) => {
              return <Submenu item={item} key={index}/>;
            })}
          </SidebarWrap>

          }
        </SidebarNav>
        <Outlet />
    </>
      
  )
}

export default Sidebar