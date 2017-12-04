// root_reducer.js
import merge from 'lodash/merge';

const reducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch(action.type){
    default:
    return state;
  }
};

export default reducer;
