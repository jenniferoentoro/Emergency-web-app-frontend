const sidebarReducer = (state: { isSidebarOpen: any; }, action: { type: string; }) => {
    if(action.type === "TOGGLE_SIDEBAR"){
        return { ...state, isSidebarOpen: !state.isSidebarOpen}
    }
    throw new Error(`No matching "${action.type} action type`);
}

export default sidebarReducer;