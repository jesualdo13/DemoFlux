import alt from '../alt';
import ValidationActions from '../actions/validation';

class ValidationStore{
  constructor(){
    this.bindActions(ValidationActions);
    this.success = false; //Este es un valor local con valor inicial = false
    this.v1 = '';
    this.v2 = 5;
    this.numberValidated;
  }

  onValidateCode(result){
    console.log("4. El valor ya llegó a través de onValidateCode",result);
    //Modifico mi variable local con el resultado
    this.success = result.success;
    this.numberValidated = result.number;
  }
}

export default alt.createStore(ValidationStore);
