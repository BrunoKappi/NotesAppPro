


import { DefaultLoggedUser } from "../../../GlobalVars"



const LoggedUser = (state = DefaultLoggedUser, action) => {
    switch (action.type) {
        case 'CLEAR_LOGGED':
            return {
                email: 'Vazio',
                uid: 'Vazio'
            }
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                SidebarActive: !state.SidebarActive
            }
        case 'SET_SIDEBAR_TAB':
            return {
                ...state,
                CurrentSidebarTab: action.tab
            }

        case 'SET_SEARCH':
            return {
                ...state,
                Search: action.search
            }
        case 'CLAER_SEARCH':
            return {
                ...state,
                Search: '' 
            }
        case 'SET_LOGGED':
            return action.user
        default:
            return state
    }
}

export default LoggedUser
