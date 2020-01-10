const posts = (state={allPosts: [],likedPosts: []}, action)=>{
    switch(action.type){
        case 'FETCH_ALL_POSTS':
            return {...state,
                allPosts: action.posts}
        case 'SET_LIKED_POSTS':
            return {...state,
            likedPosts: action.posts}
        default: 
            return state
    }
}

export default posts