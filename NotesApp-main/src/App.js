import './App.css';
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from './components/Paths/Login';
import Notas from './components/Paths/Notas';
import NotFound from './components/Paths/NotFound';
import Layout from './components/Layout';
import Registrar from './components/Paths/Registrar'
import Forget from './components/Paths/Forget'
import { connect } from 'react-redux'
import Profile from './components/Paths/Profile'
import Cadastro from './components/Paths/Cadastro';
import { getUsuarios } from './components/firebase/metodos'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetNotesFromFirebase } from './components/utils/Utilidades';


const App = (props) => {

  const [loaded, setloaded] = useState(false);


  const navigate = useNavigate();



  if (props.Usuario) {
    GetNotesFromFirebase(props.Usuario.email)
  }


  useEffect(() => {
    if (props.LoggedUser.email === 'Vazio' && window.location.pathname !== '/App/Cadastro'
      && !window.location.pathname.includes('Forget')
      && !window.location.pathname.includes("Registrar")
    ) {
      //console.log("APP", window.location.pathname)
      navigate('../')
    }
    getUsuarios().then(e => {
      setloaded(true)
    })
  }, [props.LoggedUser.uid, props.LoggedUser.email])



  const RequireAuth = ({ children }) => {
    if (loaded) {
      if (props.LoggedUser.email !== 'Vazio' && props.Usuario) {
        return children
      }
      else if (props.LoggedUser.email !== 'Vazio' && !props.Usuario) {
        return <Navigate to="/Cadastro" />
      } else {
        <Navigate to="/" />
      }
    } else {
      <Navigate to="/" />
    }

  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Login />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Registrar" element={<Registrar />} >
          <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
        </Route>
        <Route path="/App" element={<RequireAuth><Layout /></RequireAuth>} >
          <Route path="/App/Notas" element={<RequireAuth><Notas /></RequireAuth>} />
          <Route path="/App/Profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
        </Route>
        <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
      </Routes>
    </div>
  );
}


const ConnectedApp = connect((state) => {
  return {
    LoggedUser: state.LoggedUser,
    Usuario: state.Usuarios.find(Usuario => {
      return Usuario.email === state.LoggedUser.email
    })
  }
})(App)

export default ConnectedApp

