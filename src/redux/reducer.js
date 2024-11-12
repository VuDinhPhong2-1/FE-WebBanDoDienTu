const initialState = {
  activeTab: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE_TOGGLE_ADMIN":
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
