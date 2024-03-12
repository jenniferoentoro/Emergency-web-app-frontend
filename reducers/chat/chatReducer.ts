interface ChatState {
    selectedChat: string | null;
  }
  
  const initialState: ChatState = {
    selectedChat: null,
  };
  
  const chatReducer = (state: ChatState = initialState, action: any) => {
    switch (action.type) {
      case 'SET_SELECTED_CHAT':
        return { ...state, selectedChat: action.payload };
      default:
        return state;
    }
  };
  
  export default chatReducer;
  