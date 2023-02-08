import React from "react";
import './css/Sidebar.css'
import { Link } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { connect } from 'react-redux'
import { SetTab } from "./utils/Utilidades";


const Sidebar = (props) => {


  return (
    <div className={`Sidebar  ${props.LoggedUser.SidebarActive ? 'Active' : 'UnActive'} `}>
      <nav>
        <ul>
          <li onClick={e => SetTab('Notas')} >
            <Link to="/App/Notas" className={`${props.LoggedUser.CurrentSidebarTab === 'Notas' ? 'SidebarLink SidebarLinkActive' : ' SidebarLink SidebarLinkUnActive'} `}>
              <BsFillPencilFill />
              <span className="TextoLink">Notas</span>
            </Link>
          </li>
          <li onClick={e => SetTab('Profile')}   >
            <Link to="/App/Profile" className={`${props.LoggedUser.CurrentSidebarTab === 'Profile' ? 'SidebarLink SidebarLinkActive' : 'SidebarLink SidebarLinkUnActive'} `} >
              <FaUserAlt />
              <span className="TextoLink">Perfil</span>
            </Link> 
          </li>
        </ul>



      </nav>
    </div>



  );
}


const ConnectedSidebar = connect((state) => {
  return {
    LoggedUser: state.LoggedUser,
    Usuario: state.Usuarios.find(Usuario => {
      return Usuario.email === state.LoggedUser.email
    })

  }
})(Sidebar)

export default ConnectedSidebar

