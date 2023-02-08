import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux'
import './css/CriarNotaForm.css'
import { DefaultNota } from '../../GlobalVars'
import { v4 } from 'uuid';
import { CirclePicker } from 'react-color';
import { FaPalette } from "react-icons/fa";
import { CreateNota } from "../utils/Utilidades";
import { MaxLengthTitle, MaxLengthContent } from "../../GlobalVars";

const CriarNotaForm = (props) => {


  const [Titulo, setTitulo] = useState('');
  const [Conteudo, setConteudo] = useState('');
  const [Color, setColor] = useState('#ffffff');
  const [CreatingNote, setCreatingNote] = useState(false);
  const [ColorPicker, setColorPicker] = useState(false);
  const InputTitulo = useRef()
  const InputConteudo = useRef()
  const [ColorOptionsDefault,] = useState(['#F28B82', '#FBBC05', '#FFF475', '#CCFF90', '#A7FFEB', '#CBF0F8', '#AECBFA', '#D7AEFB', '#E6C9A8', '#E8EAED', '#FFFFFF']);
  const [ColorOptions, setColorOptions] = useState(ColorOptionsDefault);

  useEffect(() => {
    setColorOptions(ColorOptionsDefault.filter(color => { return color !== Color.toUpperCase() }))
  }, [Color, ColorOptionsDefault]);


  const NotEditingInput = {
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
    backgroundColor: Color

  }

  const EditingInput = {
    boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.75)'
  }

  const HiddenTextArea = {
    width: '0',
    height: '0',
    padding: '0'
  }


  const ShowTextArea = {
    width: '100%',
    height: 'auto',
    padding: '7px 20px',
    backgroundColor: Color
  }


  const NotShowingForm = {
    padding: '0'
  }

  const ShowingForm = {
    padding: '0',
    backgroundColor: Color
  }

  const NotShowingWrapper = {
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
    padding: '0'
  }

  const ShowingWrapper = {
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    padding: '0',
    backgroundColor: Color
  }


  const HiddenFooter = {
    display: 'none'
  }

  const ShowFooter = {
    display: 'flex',
    backgroundColor: Color
  }


  const Salvar = () => {
    if (Titulo.trim() || Conteudo.trim()) {
      const NovaNota = {
        ...DefaultNota,
        email: props.LoggedUser.email,
        titulo: Titulo,
        conteudo: Conteudo,
        ID: v4(),
        cor: Color || '#ffffff'
      }

      //console.log(NovaNota)
      CreateNota(NovaNota)
      setCreatingNote(false)
      LimparCampos()
      InputTitulo.current.blur()
    }
  }

  const handleChangeColor = (color) => {
    setColor(color.hex)
    toggleColorPicker()
  }

  const handleSubmitAddNote = (e) => {
    e.preventDefault()

    if (Titulo.trim() || Conteudo.trim()) {
      const NovaNota = {
        ...DefaultNota,
        email: props.LoggedUser.email,
        titulo: Titulo,
        conteudo: Conteudo,
        ID: v4(),
        cor: Color || '#ffffff'
      }

      //console.log(NovaNota)
      setCreatingNote(false)
      CreateNota(NovaNota)
      LimparCampos()
      InputTitulo.current.blur()
    }
  }


  const LimparCampos = () => {
    setTitulo('')
    setConteudo('')
    setColor('')
    setColorPicker(false)
  }

  const cancelCreatingNote = () => {
    //console.log("Cancelandof")
    setCreatingNote(false)
  }

  const initCreatingNote = () => {
    if (!CreatingNote) {
      setCreatingNote(true);
      LimparCampos();
      InputConteudo.current.focus()
    }
  }

  const toggleColorPicker = () => {
    setColorPicker(!ColorPicker)
  }

  return (
    <div className="CriarNotaForm">


      <div className="AddNote" style={CreatingNote ? ShowingWrapper : NotShowingWrapper}>
        <form
          id="clickbox"
          onSubmit={handleSubmitAddNote}
          className="AddNoteForm"
          style={CreatingNote ? ShowingForm : NotShowingForm}
        >
          <input
            maxLength={MaxLengthTitle}
            ref={InputTitulo}
            value={Titulo}
            type="text"
            className="addNoteInput"
            placeholder={CreatingNote ? 'Titulo' : 'Criar Nota'}
            onFocus={e => { initCreatingNote() }}
            onChange={e => setTitulo(e.target.value)}
            style={CreatingNote ? NotEditingInput : EditingInput}
          />

          <textarea
            maxLength={MaxLengthContent}
            ref={InputConteudo}
            value={Conteudo}
            placeholder="Conteudo da sua nota..."
            onChange={e => setConteudo(e.target.value)}
            style={CreatingNote ? ShowTextArea : HiddenTextArea}
          >
          </textarea>


        </form>
        <div className="AddNoteFormFooter" style={CreatingNote ? ShowFooter : HiddenFooter}>

          <button onClick={toggleColorPicker}>
            <FaPalette />
          </button>
          <button onClick={cancelCreatingNote}>Fechar</button>
          <button onClick={Salvar}>Salvar</button>
        </div>
      </div>


      {ColorPicker && <CirclePicker
        onChange={handleChangeColor}
        colors={ColorOptions}
      />}
    </div>
  )
}

const ConnectedCriarNotaForm = connect((state) => {
  return {
    LoggedUser: state.LoggedUser
  }
})(CriarNotaForm)

export default ConnectedCriarNotaForm

