const posts = (state={allPosts: [],likedPosts: [], selectedPost:''}, action)=>{
    switch(action.type){
        case 'FETCH_ALL_POSTS':
            return {...state,
                allPosts: action.posts}
        case 'SET_LIKED_POSTS':
            return {...state,
            likedPosts: action.posts}
        case 'SET_POST':
            return {...state,
                selectedPost: action.post
            }
        default: 
            return state
    }
}

export default posts