
const user = (state={}, action)=>{
    switch(action.type){
        case 'LOGIN':
            return action.user
        case 'SIGNOUT':
            return state=''
        default: 
            return state
    }
}

export default user