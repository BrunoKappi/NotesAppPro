import React, { useState, useEffect, useCallback } from 'react'
import './css/navBar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsFillPersonFill, BsSearch } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import User from '../images/User.png'
import { FaUserAlt } from "react-icons/fa";
import Logo from '../images/Logo.png'
import { Oval } from 'react-loader-spinner'
import { SetTab, ToggleSidebar, Sair, GetUserUrlImage, SetSearchRedux, ClearSearchRedux, GetCurrentLoggedUser } from './utils/Utilidades';



const NavBar = (props) => {

    const [isActive, setisActive] = useState(true);
    const [Loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState();
    const [Search, setSearch] = useState('');


    const toggleSidebarEvent = () => {
        setisActive(!isActive)
        ToggleSidebar(isActive)
    }
  
    useEffect(() => {
        setLoading(true)
        GetUserUrlImage(`images/notesApp/${props.Usuario.uid}`).then((url) => {
            setImageUrls(url);
            setLoading(false)
        }).catch((error) => {
            console.log("Retorno Erro", error)
            setImageUrls('');
            setLoading(false)
        })
    }, [props.Usuario.uid]);



    const handleSearchChange = (search) => {
        setSearch(search)
        //SetSearchRedux(search)
    }

    const handleSearchClear = () => {
        setSearch('')
        ClearSearchRedux()
    }

    return (
        <div>

            <Navbar expand={'md'} id='navBarResponsive' bg="dark" variant="dark">
                <Container fluid bg='dark'>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Brand>
                        <div className='LogoAndCollpse'>
                            <div onClick={toggleSidebarEvent} className='Hamburguer'>
                                <div className='part'></div>
                                <div className='part'></div>
                                <div className='part'></div>
                            </div>
                            <Link to="/App/Notas">
                                <img className="LogoNavBar" src={Logo} alt="" />
                            </Link>
                        </div>
                    </Navbar.Brand>

                    <Navbar.Offcanvas id="sidebarOffCanvas" backdrop={true}>
                        <Offcanvas.Header closeButton closeVariant='white'>
                            <Offcanvas.Title>
                                <h1>
                                    <Link className='offCanvasBrand' to="/App/Notas">
                                        <img className="LogoNavBar" src={Logo} alt="" />
                                    </Link>
                                </h1>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body >
                            <Nav className="justify-content-end flex-grow-1 navBody ">

                                <div className='navDiv barraDePesquisa'>
                                    <BsSearch />
                                    <input type="text" placeholder='Pesquisar (Em Desenvolvimento)' value={Search} onChange={e => handleSearchChange(e.target.value)} />
                                    {Search && <GiCancel onClick={e => handleSearchClear()} />}
                                </div>

                                <div className='navDiv'>
                                    <Nav.Link>Pesquisa de Satisfação</Nav.Link>
                                </div>

                                <div className='navDiv'>
                                    <NavDropdown title={
                                        <span className='ProfileNavLinkTitle' >{`${props.Usuario.nome} ${props.Usuario.sobrenome}`}  </span>}>
                                        <Link onClick={e => SetTab('Profile')} className="dropDownLink" to="/App/Profile">
                                            <BsFillPersonFill className='IconeEscuro' />  Meu Perfil
                                        </Link>
                                        <NavDropdown.Divider />
                                        <span href='/' className="dropDownLink" onClick={Sair}>
                                            <MdOutlineLogout className='IconeEscuro' /> Sair
                                        </span>
                                    </NavDropdown>
                                </div>

                                <div className='navDiv'>
                                    {!Loading && <img src={imageUrls || User} alt="" />}
                                    {Loading && <Oval></Oval>}
                                </div>



                                <div id="SmDivNavBarID" className='SmDivNavBar'>

                                    <div className="SmSidebar">
                                        <ul className='SmUl'>

                                            <li>
                                                <Link className='smNavLink ' to="/App/Profile" onClick={e => SetTab('Profile')}>
                                                    <FaUserAlt />
                                                    <span className="TextoLink">Meu Pefil</span>
                                                </Link>
                                            </li>

                                            <li className='LogouButtonNavSm'>
                                                <a href='/' id='LogouButtonNavSm' className="LogouButtonNavSm" onClick={Sair}>
                                                    <MdOutlineLogout /> Sair
                                                </a>
                                            </li>



                                        </ul>
                                    </div>
                                </div>
                            </Nav>





                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>



        </div>
    )
}
 



const ConnectedNavBar = connect((state) => {
    return {
        Usuario: state.Usuarios.find(Usuario => {
            return Usuario.email === state.LoggedUser.email
        })

    }
})(NavBar)

export default ConnectedNavBar

