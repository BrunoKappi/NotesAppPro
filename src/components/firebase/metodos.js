
import { db } from '../../components/firebase/index'
import { collection } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, where, query } from "firebase/firestore";
import { SetUsuarios, SetNotas } from '../utils/Utilidades';
import { DefaultNota } from '../../GlobalVars';


export var notasCollectionRef = collection(db, "tarefas")
var colecao = "tarefas"

export const setCollection = (name, uid) => {
  colecao = name + uid
  notasCollectionRef = collection(db, colecao)
}

export const setUsuariosCollection = () => {
  colecao = "usuariosNotas"
  notasCollectionRef = collection(db, colecao)
}

export const createUsuario = async (UsuarioNovo) => {
  colecao = "usuariosNotas"
  notasCollectionRef = collection(db, colecao)
  await addDoc(notasCollectionRef, UsuarioNovo);
};

export const CreateChamado = async (NovoChamado) => {
  colecao = "chamados"
  notasCollectionRef = collection(db, colecao)
  await addDoc(notasCollectionRef, NovoChamado);
};

//// DADOS PORTAL

export const SetDadosPortal = async (Dados) => {
  colecao = "dadosportal"
  notasCollectionRef = collection(db, colecao)
  await addDoc(notasCollectionRef, Dados);
};


export const getDadosPortal = async () => {
  colecao = "dadosportal"
  notasCollectionRef = collection(db, colecao)
  const data = await getDocs(notasCollectionRef);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

//// DADOS PORTAL

export const getUsuarios = async () => {
  colecao = "usuariosNotas"
  notasCollectionRef = collection(db, colecao)
  const data = await getDocs(notasCollectionRef);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  SetUsuarios(dados)
  return dados
}


export const createNota = (novaNota) => {
  colecao = "notas"
  notasCollectionRef = collection(db, colecao)
  return addDoc(notasCollectionRef, novaNota);
};

export const updateUser = async (EditedUser) => {
  colecao = "usuariosNotas"
  notasCollectionRef = collection(db, colecao)
  const usuaioDoc = doc(db, colecao, EditedUser.docID);
  const newFields = { ...EditedUser };
  await updateDoc(usuaioDoc, newFields);
};


export const updateNota = async (EditedNota) => {
  colecao = "notas"
  notasCollectionRef = collection(db, colecao)
  const notaDoc = doc(db, colecao, EditedNota.docID);
  const newFields = { ...EditedNota };
  await updateDoc(notaDoc, newFields);
};








export const stopListening = () => {
}


export const UpdateDadosPortal = async (Dados) => {
  colecao = "dadosportal"
  notasCollectionRef = collection(db, colecao)
  const DadosDoc = doc(db, colecao, Dados.docID);
  const newFields = { ...Dados };
  await updateDoc(DadosDoc, newFields);
  //getDadosPortal().then(DATA => {  SetDados(DATA[0])})
};



export const getNotas = async (email) => {
  colecao = "notas"
  notasCollectionRef = collection(db, colecao)
  //const data = await getDocs(notasCollectionRef)
  //const dados = data.docs.map((doc) => ({ ...DefaultNota, ...doc.data(), docID: doc.id }))

  const q = query(notasCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const dados2 = querySnapshot.docs.map((doc) => ({ ...DefaultNota, ...doc.data(), docID: doc.id }));
  //console.log("DADOS", dados2)
  SetNotas(dados2)
  return dados2

}






export const updateChamado = async (EditedChamado) => {
  colecao = "chamados"
  notasCollectionRef = collection(db, colecao)
  const usuaioDoc = doc(db, colecao, EditedChamado.docID);
  const newFields = { ...EditedChamado };
  await updateDoc(usuaioDoc, newFields);
};

export const deleteAllTarefasFirebase = (tarefas, uid) => {
  colecao = "tarefas" + uid
  notasCollectionRef = collection(db, colecao)
  tarefas.map((tarefa) => {
    const tarefaDoc = doc(db, colecao, tarefa.id);
    deleteDoc(tarefaDoc);
    return true
  })
  SetUsuarios([])
}

export const deleteTarefasConcluidasFirebase = (apenasCompletas, uid) => {
  colecao = "tarefas" + uid
  notasCollectionRef = collection(db, colecao)
  apenasCompletas.map((tarefa) => {
    const tarefaDoc = doc(db, colecao, tarefa.id);
    deleteDoc(tarefaDoc);
    return true
  })
}