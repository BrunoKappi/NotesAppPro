import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { DefaultNota } from "../../GlobalVars";
import './css/Nota.css'
import { RiInboxArchiveFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { EditarNota, EditarNotaWithRedux, Notificar } from "../utils/Utilidades";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { CirclePicker } from 'react-color';
import { MaxLengthTitle, MaxLengthContent } from "../../GlobalVars";

const Nota = (props) => {

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [, setColor] = useState('#ffffff');
  const [ColorPicker, setColorPicker] = useState(false);
  const [ColorOptionsDefault,] = useState(['#F28B82', '#FBBC05', '#FFF475', '#CCFF90', '#A7FFEB', '#CBF0F8', '#AECBFA', '#D7AEFB', '#E6C9A8', '#E8EAED', '#FFFFFF']);
  const [ColorOptions, setColorOptions] = useState(ColorOptionsDefault);
  const [TituloPrevState, setTituloPrevState] = useState(props.Note.titulo);
  const [ConteudoPrevState, setConteudoPrevState] = useState(props.Note.conteudo);




  const toggleColorPicker = () => {
    setColorPicker(!ColorPicker)
  }


  function handleShow(breakpoint) {
    setFullscreen('md-down');
    setShow(true);
    setTimeout(() => {
      const boxes = document.querySelectorAll('.modal-content');
      boxes.forEach(box => {
        box.style.backgroundColor = Note.cor;
      });

    }, 10);
  }

  const [Note, setNote] = useState({
    ...DefaultNota,
    ...props.Note
  });


  const getColorNote = () => {
    if (Note.cor === "#FFFFFF" || Note.cor === "#ffffff" || !Note.cor) {
      return '#ccc'
    }
    else {
      return Note.cor
    }
  }

  const [NoteStyle, setNoteStyle] = useState({});

  const SetEstilos = () => {
    setNoteStyle({
      ...NoteStyle,
      border: '1px solid ' + getColorNote(),
      backgroundColor: Note.cor
    })
  }

  useEffect(() => {


    setNote({
      ...DefaultNota,
      ...props.Note
    })


    if (Note.cor !== NoteStyle.backgroundColor)

      SetEstilos()

    setColor(Note.cor)

  }, [props.Note, Note.cor,]);




  const handleDeleteNote = () => {
    const EditedNote = { ...Note, status: 'Deletada' }
    //console.log(EditedNote)
    EditarNotaWithRedux(EditedNote.docID, EditedNote)
    Notificar("Nota excluída")
  }
  const handleArchiveNote = () => {
    const EditedNote = { ...Note, status: 'Arquivada' }
    //console.log(EditedNote)
    EditarNotaWithRedux(EditedNote.docID, EditedNote)
    Notificar("Nota arquivada")
  }



  useEffect(() => {
    setColorOptions(ColorOptionsDefault.filter(color => { return color !== Note.cor.toUpperCase() }))
  }, [ColorOptionsDefault, Note.cor]);



  const NoteStyleHidden = {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'transparent'
  }


  const BodyStyleHidden = {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'transparent'
  }


  const handleChangeColor = (color) => {
    setColor(color.hex)
    //console.log(color.hex)
    setTimeout(() => {
      const boxes = document.querySelectorAll('.modal-content');
      boxes.forEach(box => {
        box.style.backgroundColor = color.hex;
      });

    }, 10);
    const EditedNote = { ...Note, cor: color.hex }
    setNote({ ...EditedNote })
    //console.log(EditedNote)
    EditarNotaWithRedux(EditedNote.docID, EditedNote)
    toggleColorPicker()
  }

  const [UpdateTimeout, setUpdateTimeout] = useState(null);




  useEffect(() => {
    clearTimeout(UpdateTimeout)
    if (TituloPrevState !== Note.titulo) {
      setUpdateTimeout(setTimeout(() => {
        const EditedNote = { ...Note, titulo: Note.titulo }
        ////console.log(EditedNote)
        EditarNota(EditedNote.docID, EditedNote)
        setTituloPrevState(Note.titulo)
      }, 1500))
    }

  }, [Note.titulo.TituloPrevState, Note, UpdateTimeout, TituloPrevState]);

  useEffect(() => {
    clearTimeout(UpdateTimeout)
    if (ConteudoPrevState !== Note.conteudo) {
      setUpdateTimeout(setTimeout(() => {
        const EditedNote = { ...Note, conteudo: Note.conteudo }
        ////console.log(EditedNote)
        EditarNota(EditedNote.docID, EditedNote)
        setConteudoPrevState(Note.conteudo)
      }, 1500))
    }
  }, [Note.conteudo, ConteudoPrevState, Note, UpdateTimeout]);




  return (
    <div className="Nota" style={show ? NoteStyleHidden : NoteStyle} onClick={e => { if (!show) handleShow() }}>

      <div className="NoteHeader" >
        <span>{Note.titulo}</span>
      </div>
      <div className="NoteBody">
        <pre style={show ? BodyStyleHidden : {}} >{Note.conteudo}</pre>
      </div>




      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)} >
        <Modal.Header closeButton>
          <Modal.Title className="ModalNoteTitulo">
            <input maxLength={MaxLengthTitle} placeholder="Titulo..." value={Note.titulo} onChange={e => setNote({ ...Note, titulo: e.target.value })}></input>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ModalNoteBodyContent">
            <textarea maxLength={MaxLengthContent} placeholder="Conteúdo da sua Nota..." value={Note.conteudo} onChange={e => setNote({ ...Note, conteudo: e.target.value })}></textarea>
          </div>

        </Modal.Body>
        <Modal.Footer className="NoteFooter">
          <Dropdown onClick={toggleColorPicker}>
            <Dropdown.Toggle id="dropdown-basic" >
              <FaPalette className="PaletaCores" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="CoresMenuDropdown">
              <Dropdown.Item eventKey="1">
                {ColorPicker && <CirclePicker colors={ColorOptions} onChange={handleChangeColor} />}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>



          <button onClick={handleDeleteNote}>
            <MdDelete />
          </button>
          <button onClick={handleArchiveNote}>
            <RiInboxArchiveFill />
          </button>

        </Modal.Footer>

      </Modal>



    </div>
  );
}

const ConnectedNota = connect((state) => {
  return {
    LoggedUser: state.LoggedUser
  }
})(Nota)

export default ConnectedNota

