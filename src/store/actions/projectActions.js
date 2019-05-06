import { storage } from 'firebase';
import { find, get } from 'lodash';
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
                studentName: `${profile.lastName} ${profile.firstName}`,
                status: 'pending'
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

export const approveProject = (project_ids, status) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log(project_ids, 'project_ids');
    project_ids.map(item => {
      dispatch({ type: 'APPROVE_PROJECT' });
      return firestore
        .collection('posts')
        .doc(item)
        .set(
          {
            status: status
          },
          { merge: true }
        )
        .then(() => {
          dispatch({ type: 'APPROVE_PROJECT_SUCCESS' });
        })
        .catch(err => {
          console.log(err, 'errrr');
        });
    });
  };
};

export const commentOrReplyProject = (
  project_id,
  commentOrReplyData,
  status
) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    console.log(state.firestore.ordered.posts, 'asdajosd');
    const post = find(state.firestore.ordered.posts, item => {
      return item.id === project_id;
    });
    const comment = get(post, status, []);
    dispatch({ type: 'COMMENT_PROJECT' });
    return firestore
      .collection('posts')
      .doc(project_id)
      .set(
        {
          updatedDateTime: new Date().toString(),
          [status]: [...comment, commentOrReplyData]
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: 'COMMENT_PROJECT_SUCCESS' });
      })
      .catch(err => {
        console.log(err, 'errrr');
      });
  };
};
