import React from 'react'

import * as FaIcons from 'react-icons/fa'
// import * as AiIcons from 'react-icons/ai'
// import * as BiIcons from 'react-icons/bi'
// import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
// import * as SiIcons from 'react-icons/si'
// import * as MdIcons from 'react-icons/md'
// import * as GiIcons from 'react-icons/gi'
// import * as BsIcons from 'react-icons/bs'


const SidebarDataPublic = [
    {
        title: 'Financial Management',
        path: 'financial/invoice',
        icon: <FaIcons.FaCalculator/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav:[
                {
                    title:'Invoice',
                    path: 'financial/invoice',
                    icon: <FaIcons.FaFileInvoice />,
                },
                {
                    title:'Receipt',
                    path: 'financial/receipt',
                    icon: <FaIcons.FaFileInvoice />,
                },
                {
                    title:'Contract',
                    path: 'financial/contract',
                    icon: <FaIcons.FaFileInvoice />,
                },
               
            ]
    },
    
    
]

export default SidebarDataPublic;