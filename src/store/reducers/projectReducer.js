const initState = {
  isLoading: false
};
const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return { ...state, isLoading: true };
    case 'CREATE_PROJECT_SUCCESS':
      return { ...state, isLoading: false };
    case 'APPROVE_PROJECT_SUCCESS':
      return { ...state, isLoading: false };
    case 'APPROVE_PROJECT':
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default projectReducer;
