const initState = {
  projects: [{ name: 'asduahsduih' }]
};
const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('create_project', action.project);
      return state;
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default projectReducer;
