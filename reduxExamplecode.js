const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
}

const reducer = (state=initialState, action) => {
  switch (action.type){
    case "FETCH_USERS_START": {
      return {...state, fetching: true}
      break;
    }
    case "RECIEVE_USERS":{
      return {
        ...state,
         fetching: false,
          fetched: true,
           users: action.payload
         }
      break;
    }
    case "FETCH_USERS_ERROR":{
      return {...state, fetching: false, error: action.payload}
      break;
    }
  }
  return state
}
const middleware = applyMiddleware(logger, thunk)
const store = createStore(reducer, middleware)

//thunk, single argument dispatcher function
// to handle async actions, we dispatch them all together like this so we can handle errors and promises
store.dispatch((dispatch) =>{
  dispatch({type: "FETCH_USERS_START"})
  axios.get("http://rest.learncode.academy/api/wstern/users")
  .then((res)=>{
    dispatch({type: "RECIEVE_USERS", payload: res.data})
  })
  .catch((err)=>{
    dispatch({type: "FETCH_USERS_ERROR", payload: err})
  })
})


/*
// this is how you modify with immutability
/// return {...state, fetching: true}
const reducer = function(initialState=0, action){
  if(action.type === "INC"){
    return initialState + 1;
  }
  if (action.type === "DEC"){
    return initialState -1;
  } else if (action.type === "E"){
    throw new Error("AHHHHHH!")
  }
}
//middleware
//////////////////////////////////////////////
const logger = (store) => (next) => (action) => {
  console.log("action fired: ", action)
  next(action);
}
const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e){
    console.log("AHHHH!", e)
  }
}
//////////////////////////////////////////////

const middleware = applyMiddleware(logger, error);

const store = createStore(reducer, 1, middleware);

store.subscribe(()=> {
  console.log("store changed: ", store.getState())
})

// payload not a keyword... pass payload an object
//type is a keyword
store.dispatch({type: "INC", payload: 12})
store.dispatch({type: "DEC", payload: 11})
store.dispatch({type: "INC", payload: 100})
store.dispatch({type: "E", payload: 100})

*/
