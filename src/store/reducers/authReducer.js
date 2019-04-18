const initState = {
  authError: null,
  isLoading: false
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authError: null,
        isLoading: true
      };
    case 'LOGIN_ERROR':
      console.log(action.err.code, 'asdiahsd');
      if (action.err.code === 'auth/user-not-found') {
        return {
          ...state,
          authError: 'User Name not found. Please try again',
          isLoading: false
        };
      }
      if (action.err.code === 'auth/wrong-password') {
        return {
          ...state,
          authError: 'Wrong Password. Please try again',
          isLoading: false
        };
      }
      return {
        ...state,
        authError: 'Login failed',
        isLoading: false
      };
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
        isLoading: false
      };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        authError: null
      };
    case 'SIGNUP_ERROR':
      console.log('signup error');
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
