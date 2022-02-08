import React, { useContext, useState } from 'react';
import SidebarLayout from './SidebarLayout';
import '../../Css/Sidebar.css'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

function Sidebar() {
    
    const {user, logout} = useContext(AuthContext)

    const history = useHistory()
    

    const types = ['Home', 'Saved', 'Logout', `${user.username}`]
    const [activeMenuItem, setActiveMenuItem] = useState('Home')
    var keySidebar = 0

    return (
        <div className="SidebarContainer">
            <div className="Sidebar">
                <h4 className="logoHead" onClick={()=>{history.push('/home')}}>LOGO</h4>
                <div className="RightSide">

                {

                    types.map(type => {

                        keySidebar = keySidebar + 1
                        
                        return(

                            <SidebarLayout 
                                text={type} 
                                key={keySidebar}
                                onClick={
                                    ()=>{

                                        
                                        if(type==='Home'){
                                            setActiveMenuItem(type)
                                            history.push('/home')
                                        }
                                        if(type===`${user.username}`){
                                            setActiveMenuItem(`${user.username}`)
                                            history.push(`/profile/${user.username}`) 
                                        }
                                        if(type==='Logout'){
                                            logout()
                                            history.push('/')
                                        }
                                        if(type!=='Logout'&&type!=='Profile'&&type!==`${user.username}`){
                                            setActiveMenuItem(type)
                                            history.push(`/${type}`)
                                            
                                        }
                                        
                                        
                                        
                                        
                                    }
                                }
                                isActive={activeMenuItem === type}
                            />
                        )
                        
                    })
                }
                </div>
                
            </div>
        </div>
    );
}

export default Sidebar