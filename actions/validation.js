import alt from '../alt';

class ValidationActions{

  validateCode(numberReceived){
    return dispatch => {
      let random = Math.random() >= 0.5;
      setTimeout(() => {
        console.log("3. Se despachó un resultado")
        dispatch({success: random, number: numberReceived});
  		}, 2500);
    }
  }
}

export default alt.createActions(ValidationActions);
