


const SideEffects = (state = { sidebar: true}, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return {...action.sidebarState}  
        default:
            return state
    }
}

export default SideEffects
