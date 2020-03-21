
import defaultState from './state'

function reducer(state=defaultState, action){
switch (action.type) {
    case 'first_name':
        return{...state, first_name: action.payload.first_name}
    case "last_name":
        return {...state, last_name: action.payload.last_name}
    case "user_name":
        return {...state, user_name: action.payload.user_name}
    case "password":
        return {...state, password: action.payload.password}
    case "company":
        return {...state, company: action.payload.company}
    case "email":
        return {...state, email: action.payload.email}
    case 'current': 
       return {...state, currentUser: action.payload.currentUser}
    case 'displaylogin': 
       return {...state, displaylogin: !state.displaylogin}
    default:
        return state
}
}

export default reducer;