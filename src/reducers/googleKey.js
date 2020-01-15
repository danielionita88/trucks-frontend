const googleKey = (state='', action)=>{
    switch(action.type){
        case 'SET_KEY':
            return action.key
        default: 
            return state
    }
}

export default googleKey