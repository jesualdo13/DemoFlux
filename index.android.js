/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import ValidationActions from './actions/validation';
import ValidationStore from './stores/validation';

export default class demoFlux extends Component {
  constructor(props){
    super(props);
		this.state = {
			number: '0',
      resultado: false,
      resultadoTexto: '',
      numeroValidado: ''
		};
		this.onValidation = this.onValidation.bind(this);
  }

  next(){
    ValidationActions.validateCode(this.state.number);
    console.log("2. Solicitar validación");
  }

  componentDidMount(){
    ValidationStore.listen(this.onValidation);
    console.log("El escuchador está activado");
  }

  componentWillUnmount(){
    ValidationStore.unlisten(this.onValidation);
    console.log("El escuchador será desactivado");
  }

  onValidation(datosEnStore){
    console.log("5. los datos que hay en el store fueron recogidos: ", datosEnStore);
    if(datosEnStore.success === true){
      this.setState({
        resultado: true,
        resultadoTexto: 'NÚMERO VÁLIDO',
        numeroValidado: datosEnStore.numberValidated
      });
    }
    else{
      this.setState({
        resultado: false,
        resultadoTexto: 'NUMERO INVÁLIDO',
        numeroValidado: datosEnStore.numberValidated
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Número:</Text>
        <TextInput
        style={styles.input}
        placeholder="Introduce un número"
  			keyboardType = 'numeric'
  			value={this.state.number}
  			onChangeText={value => this.setState({number: value})} />
        <TouchableOpacity onPress={() => this.next()}>
          <Text style={styles.button}>Validar</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 10}}>Número validado: {this.state.numeroValidado}</Text>
        <Text style={{marginTop: 10}}>Resultado de validación: </Text>
        <Text style={[{marginTop: 5}, (this.state.resultado) ? styles.green : styles.red ]}>{this.state.resultadoTexto}</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  container: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  },
  red:{
    color: 'red'
  },
  green:{
    color: 'green'
  }
});

AppRegistry.registerComponent('demoFlux', () => demoFlux);
