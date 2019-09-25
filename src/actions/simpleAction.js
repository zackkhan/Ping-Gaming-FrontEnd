/* 
  src/actions/simpleAction.js
*/
import { server_url } from "../server_url"
const axios = require('axios')
export function fetchData(endpoint, params ) {
  return function(dispatch) {
    return axios.get(server_url + endpoint + "/", {
      params: params
    }).then(({ data }) => {
      dispatch(getData(data, endpoint));
    });
  };
}

function getData(data, endpoint) {
  return {
    type: 'FETCH',
    payload: data,
    title: endpoint
  };
}