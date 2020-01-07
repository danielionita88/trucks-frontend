export const thunkActions = ()=>{
    return function(dispatch){
        dispatch({type: "START_FETCH"})
        fetch(url)
        .then()
        .then(data => {
           dispatch({type: 'FETCH_SUCCESS'})
        })
    }
}