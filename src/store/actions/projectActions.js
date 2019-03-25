import { storage } from 'firebase';

export const createProject = project => {
  return (dispatch, getState, { getFirestore }) => {
    console.log(project, 'project');
    const fireStore = getFirestore();
    const uploadFile = storage()
      .ref(`images/${project.wordFile.name}`)
      .put(project.wordFile);
    uploadFile.on(
      'state_changed',
      snapShot => {},
      error => {
        console.log(error);
      },
      () => {
        storage()
          .ref('images')
          .child(project.wordFile.name)
          .getDownloadURL()
          .then(url => {
            fireStore
              .collection('posts')
              .add({
                title: project.title,
                fileURL: url,
                description: project.description,
                currentUpdatedNumber: 0,
                createdDateTime: new Date().toString(),
                updatedDateTime: ''
              })
              .then(() => {
                dispatch({ type: 'CREATE_PROJECT', project });
              })
              .catch(err => {
                alert(err);
              });
          });
      }
    );
  };
};
