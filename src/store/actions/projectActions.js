export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const fireStore = getFirestore();
    console.log(fireStore, 'fireStore');
    fireStore
      .collection('projects')
      .add({
        ...project
      })
      .then(() => {
        dispatch({ type: 'CREATE_PROJECT', project });
      })
      .catch(err => {
        alert(err);
      });
  };
};
