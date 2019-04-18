const initState = {
  isLoading: false
};
const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return { ...state, isLoading: true };
    case 'CREATE_PROJECT_SUCCESS':
      return { ...state, isLoading: false };
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default projectReducer;
