const login = (user)=>{
    return{type: 'LOGIN', user}
}


export const signup=(body)=>{
    return function(dispatch){
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
            else
                dispatch(login(data.user))
            }
        )

    }
}