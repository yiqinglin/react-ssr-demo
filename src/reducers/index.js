const initialState = {
  coffeeDrinks: [],
  favorite: -1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COFFEE_DRINKS':
      return {
        ...state,
        coffeeDrinks: []
      };
    case 'SELECT_FAVORITE':
      return {
        ...state,
        favorite: action.id
      };
    default:
      return state;
  }
};
