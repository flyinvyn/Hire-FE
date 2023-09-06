const initialState = {
    worker: [],
    workerUser: [],
  };
  
  const workerReducer = (state = initialState, action) => {
    if (action.type === "GET_ALL_WORKER") {
      return {
        ...state,
        worker: action.payload,
      };
    } else if (action.type === "GET_ALL_WORKER_USER") {
      return {
        ...state,
        workerUser: action.payload,
      };
    } else if (action.type === "CREATE_WORKER") {
      return state;
    } else if (action.type === "EDIT_WORKER") {
      return state;
    } else if (action.type === "EDIT_WORKER_PHOTO") {
      return state;
    } else if (action.type === "DELETE_WORKER") {
      return state;
    } else {
      return state;
    }
  };
  
  export default workerReducer;