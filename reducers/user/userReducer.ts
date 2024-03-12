interface userState {
    username: string | null;
  }
  
  const initialState: userState = {
    username: null,
  };
  
  const userReducer = (state: userState = initialState, action: any) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  