import history from '../history'

const currentUser = (user)=>{
    return{type: 'LOGIN', user}
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
        .then(data=>{console.log(data)
            if(data.error)
            { history.push('/login')}
        else {
            dispatch(currentUser(data))
        }})
    }
}