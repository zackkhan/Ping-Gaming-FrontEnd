/* 
  src/reducers/simpleReducer.js
*/
export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return Object.assign({}, state,{
        result: action.payload
      })
    case 'FETCH':
      var response_obj = {}
      response_obj[action.title] = action.payload
      return Object.assign({}, state, response_obj)
    default:
      return state
  }
}