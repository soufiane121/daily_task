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
    case 'currentOwner':
        return {...state, currentOwner: action.payload.currentOwner}
    case 'displaylogin': 
       return {...state, displaylogin: !state.displaylogin}
    case 'currentUserId':
        return {...state, currentUserId: action.playload.currentUserId}
    case 'tabvisible':
        return {...state, tabvisible: !state.actabvisible}
    case 'overLay': 
        return {...state, overLay: !state.overLay}
    case 'FeedContent':
        return {...state, FeedContent: action.playload.FeedContent}
    case 'feedFetch':
        return {...state, feedFetch: !state.feedFetch}
    case 'showButton':
        return {...state, showButton: action.playload.showButton}
    case 'showSwipeButtons':
        return {...state, showSwipeButtons: !state.showSwipeButtons}
    case 'Update': 
        return {...state, Update: !state.Update}
    case 'FeedCommentId':
        return {...state, FeedCommentId: action.playload.FeedCommentId}
    case 'createTask':
        return {...state, createTask: action.playload.createTask}
    case 'overLayTask':
        return {...state, overLayTask: !state.overLayTask}
    case 'loadingPg':
        return {...state, loadingPg: !state.loadingPg}
    case 'searching':
        return {...state, searching: action.payload.searching }
    case 'addIngredient':
        return {...state, addIngredient: action.payload.addIngredient}
    case 'displayDate':
        return {...state, displayDate: !state.displayDate}
    case 'dateTime':
        return {...state, dateTime: action.payload.dateTime}
    case 'status':
        return {...state, status: action.payload.status}
    case 'quantity':
        return {...state, quantity: action.payload.quantity}
    case 'currentUserObj':
        return {...state, currentUserObj: action.payload.currentUserObj}
    case 'tasksArray':
        return {...state, tasksArray: action.payload.tasksArray}
    case 'displayAdmin':
        return {...state, displayAdmin: !state.displayAdmin}
    default:
        return state
}
}

export default reducer;