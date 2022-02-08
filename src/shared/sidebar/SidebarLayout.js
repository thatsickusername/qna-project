import React from 'react';
import '../../Css/Sidebar.css'

function SidebarLayout({text, onClick, isActive}) {
    return (
        <div className={isActive ? 'SidebarLayout ActiveMenu' : 'SidebarLayout'} onClick={onClick} >
            <h4 className="H4text">{text}</h4>
        </div>
    );
}

export default SidebarLayout;