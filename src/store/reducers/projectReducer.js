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
    case 'COMMENT_PROJECT':
      return { ...state, isLoading: true };
    case 'COMMENT_PROJECT_SUCCESS':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default projectReducer;
