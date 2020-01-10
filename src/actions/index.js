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
                history.push('/home')
            }
        })
    }
}

export const getAllPosts=()=>{

    return(dispatch)=>{
        fetch('http://localhost:3000/api/v1/posts')
        .then(resp => resp.json())
        .then(posts=> dispatch(setAllPosts(posts)))
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
                history.push('/home')
            }
        })
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
        }})
    }
}