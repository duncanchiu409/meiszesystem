import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import './../sidebar/sidebar.css'

const SidebarLink = styled(NavLink)`
    display: flex;
    color: var(--sidebar-font-color);
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover{
        background: var(--hover-color);
        border-left: 4px solid var(--font-color);
        cursor: pointer;
    }
`;
    
const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(NavLink)`
    background: var(--drop-down-link-color);
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--sidebar-font-color);
    font-size: 18px;

    &:hover {
        background-color: var(--hover-color);
        border-left: 4px solid var(--font-color);
        cursor: pointer;
    }
`;

const Submenu = ({item}) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const { t } = useTranslation()

    return(
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{t(item.translation)}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subnav
                        ? item.iconClosed
                        : item.iconClosed}
                </div>    
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return(
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{t(item.translation)}</SidebarLabel>
                    </DropdownLink>
                )})}        
        </>
    )
}

export default Submenu;