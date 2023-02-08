import React from "react";
import { connect } from 'react-redux'
import './css/Notas.css'
import Masonry from "react-masonry-css";
import CriarNotaForm from './CriarNotaForm'
import Nota from './Nota'


const Notas = (props) => {




  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    500: 2,
    300: 1
  };



  return (
    <div className="Notas">

      <CriarNotaForm />

      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >
        {props.Notas.map((Note) => {
          return (
            <Nota

              key={Note.ID}
              Note={Note}
            />
          );
        })}
      </Masonry>

     
    </div>
  );
}

const ConnectedNotas = connect((state) => {
  return {
    LoggedUser: state.LoggedUser,
    Notas: state.Notas.filter(Nota => {
      return Nota.status === 'Ativa'
    })
  }
})(Notas)

export default ConnectedNotas

