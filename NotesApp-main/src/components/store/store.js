import { combineReducers, createStore } from 'redux'
import Usuarios from './reducers/Usuarios'
import LoggedUser from './reducers/LoggedUser'
import Notification from './reducers/Notification'
import Notas from './reducers/Notas'

const store = createStore(
    combineReducers({
        Usuarios: Usuarios,
        LoggedUser,
        Notification,
        Notas

    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    localStorage.setItem("NotesApp", JSON.stringify(store.getState()))
    //console.log("Store Changed", store.getState())
})


export default store





