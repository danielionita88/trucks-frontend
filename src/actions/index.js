import history from '../history'

const currentUser = (user)=>{
    return{type: 'LOGIN', user}
}

export const signout=()=>{
    return{type: 'SIGNOUT'}
}

const setAllPosts=posts=>{
    return{type:'FETCH_ALL_POSTS', posts}
}

const setLikedPosts=posts=>{
    return{type: 'SET_LIKED_POSTS', posts}
}

const addPost=post=>{
    return{type: 'ADD_POST', post}
}

const removePost=id=>{
    return{type: 'REMOVE_POST',id}
}
const setKey=key=>{
    return{type: 'SET_KEY', key}
}
const deleteLike=postId=>{
    return{type:'REMOVE_LIKE', postId}
}
const addLike=post=>{
    return{type: 'LIKE_POST', post}
}

export const setPost=post=>{
    return (dispatch)=>{
        dispatch({type: 'SET_POST',post})
    }
}
const finishUpload=()=>{
    return{type: 'FINISHED_UPLOADING'}
}

const uploadPost=()=>{
    return{type: 'UPLOAD_POST'}
}

export const deletePost=id=>{
    return(dispatch)=>{
        fetch(`http://localhost:3000/api/v1/posts/${id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            dispatch(removePost(id))
            }
        )
        .catch(err=> console.log(err))
    }
}

export const getPost=id=>{
    return (dispatch)=>{
        fetch(`http://localhost:3000/api/v1/posts/${id}`)
        .then(resp =>resp.json())
        .then(data=>dispatch(setPost(data)))
        .catch(err=> console.log(err))
    }
}

export const getKey=()=>{
    return(dispatch)=>{
        fetch("http://localhost:3000/api/v1/google_maps")
        .then(resp => resp.json())
        .then(data => dispatch(setKey(data.key)))
        .catch(err=> console.log(err))
    }
}
export const createPost= data=>{

    let formData= new FormData()
    formData.append('title', data.title)
    formData.append('make', data.make)
    formData.append('model', data.model)
    formData.append('model_year', data.model_year)
    formData.append('price', data.price)
    formData.append('odometer', data.odometer)
    formData.append('title_status', data.title_status)
    formData.append('description', data.description)
    formData.append('user_id', data.user_id)
    formData.append('address', data.address)
    formData.append('lat', data.lat)
    formData.append('lng', data.lng)
    for(let i=0; i< data.photos.length; i++){
        formData.append(`photos[]`, data.photos[i])
    }
 
    return (dispatch)=>{
        dispatch(uploadPost())
        const reqObj={
            method: 'POST',
            body: formData
        }
        fetch('http://localhost:3000/api/v1/posts', reqObj)
        .then(resp => resp.json())
        .then(data=> {
            dispatch(addPost(data))
            dispatch(finishUpload())
            history.push(`/used-trucks`)
        })
        .catch(err=> console.log(err))
    }
}

export const signup=(body)=>{
    return (dispatch) =>{
        const reqObj={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user: body})
        }
        fetch('http://localhost:3000/api/v1/signup', reqObj)
        .then(resp => resp.json())
        .then(data=> {
            if (data.error) {
                alert(data.error)
            }
            else{
                dispatch(currentUser(data ))
                localStorage.setItem('token', data.token)
                history.push('/')
            }
        })
        .catch(err=> console.log(err))
    }
}

export const getAllPosts=()=>{

    return(dispatch)=>{
        fetch('http://localhost:3000/api/v1/posts')
        .then(resp => resp.json())
        .then(posts=> dispatch(setAllPosts(posts)))
        .catch(err=> console.log(err))
    }
}

export const login=body=>{
    return (dispatch) => {
        const reqObj={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }
        fetch('http://localhost:3000/api/v1/login', reqObj)
        .then(resp => resp.json())
        .then(data=>{
            if(data.error)
                { alert(data.error)}
            else {
                dispatch(currentUser(data))
                localStorage.setItem('token', data.token)
                fetch(`http://localhost:3000/api/v1/users/${data.id}/liked_posts`)
                .then(resp => resp.json())
                .then(posts => dispatch(setLikedPosts(posts)))
                history.push('/')
            }
        })
        .catch(err=> console.log(err))
    }
}

export const removeLike=(userId,postId)=>{
    return (dispatch)=>{
        fetch(`http://localhost:3000/api/v1/likes/${userId}/${postId}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data=>dispatch(deleteLike(postId)))
        .catch(err=> console.log(err))
    }
}

export const likePost=(userId,post) =>{
    return (dispatch) =>{
        const reqObj={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                post_id: post.id
            })
        }
        fetch('http://localhost:3000/api/v1/likes', reqObj)
        .then(resp => resp.json())
        .then(data=>dispatch(addLike(post)))
        .catch(err=> console.log(err))
    }
}

export const checkUser=token=>{

    return dispatch=>{
        const reqObj={
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        fetch('http://localhost:3000/api/v1/current_user', reqObj)
        .then(resp => resp.json())
        .then(data=>{
            if(data.error)
            { history.push('/login')}
        else {
            dispatch(currentUser(data))
            localStorage.setItem('token', data.token)
            fetch(`http://localhost:3000/api/v1/users/${data.id}/liked_posts`)
            .then(resp => resp.json())
            .then(posts => dispatch(setLikedPosts(posts)))
        }})
        .catch(err=> console.log(err))
    }
}