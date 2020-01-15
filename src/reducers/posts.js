const posts = (state={allPosts: [],likedPosts: [], selectedPost:{photos_urls: []}}, action)=>{
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
        case 'ADD_POST':
            return {...state,
            allPosts: [...state.allPosts, action.post]}
        case 'REMOVE_POST':
            const newPosts= state.allPosts.filter(post => post.id !== action.id)
            return {...state,
            allPosts: newPosts }
        default: 
            return state
    }
}

export default posts