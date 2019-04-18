import { storage } from 'firebase';

export const createProject = project => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch({ type: 'CREATE_PROJECT', project });
    const fireStore = getFirestore();
    const profile = getState().firebase.profile;
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
                updatedDateTime: '',
                faculty: profile.faculty,
                studentId: profile.studentId,
                userId: profile.userId,
                studentName: `${profile.lastName} ${profile.firstName}`
              })
              .then(() => {
                dispatch({ type: 'CREATE_PROJECT_SUCCESS', project });
              })
              .catch(err => {
                alert(err);
              });
          });
      }
    );
  };
};
