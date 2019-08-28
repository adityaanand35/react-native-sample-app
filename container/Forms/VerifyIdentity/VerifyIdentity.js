import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Input from "../../../component/UI/Input/Input";
import { ListOfCitizenship } from "./VerifyIdentity.const";

class VerifyIdentity extends Component {
  state = {
    verifyIdentityForm: {
      birthDate: {
        elementType: "input",
        elementConfig: {
          keyboardType: "number-pad",
          label: "Birth Date MM/DD/YYYY*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      ssn: {
        elementType: "input",
        elementConfig: {
          keyboardType: "number-pad",
          secureTextEntry: true,
          label: "Social Security Number*"
        },
        value: "",
        validation: {
          required: true,
          minLength: 9,
          maxLength: 9
        },
        valid: false,
        touched: false
      },
      confirmSSN: {
        elementType: "input",
        elementConfig: {
          keyboardType: "number-pad",
          secureTextEntry: true,
          label: "Confirm Social Security Number*",
          validationError: ""
        },
        value: "",
        validation: {
          required: true,
          minLength: 9,
          maxLength: 9
        },
        valid: false,
        touched: false
      },
      citizenship: {
        elementType: "picker",
        elementConfig: {
          options: { ...ListOfCitizenship }
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };
  constructor(props) {
    super(props);
    if (Object.keys(props.initialState).length) {
      this.state = props.initialState;
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules && rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules && rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    console.log("event", event, inputIdentifier);
    const updatedVerifyIdentityForm = {
      ...this.state.verifyIdentityForm
    };
    const updatedFormElement = {
      ...updatedVerifyIdentityForm[inputIdentifier]
    };
    if(inputIdentifier === 'birthDate') {
      if(event !== '/' && event.length === 2) {
        event += '/';
      }
      if(event !== '/' && event.length === 5) {
        event += '/';
      }
    }
    updatedFormElement.value = event;
    

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    if (inputIdentifier === "confirmSSN") {
      if (updatedFormElement.value !== updatedVerifyIdentityForm["ssn"].value) {
        updatedFormElement.valid = false;
        updatedFormElement.validation.validationError = "Social Security Numbers do not match";
      }
    }
    updatedFormElement.touched = true;
    updatedVerifyIdentityForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedVerifyIdentityForm) {
      formIsValid =
        updatedVerifyIdentityForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      verifyIdentityForm: updatedVerifyIdentityForm,
      formIsValid: formIsValid
    });
    this.props.getData(this.state);

    this.setState(prevState => {
      this.props.getData({
        verifyIdentityForm: updatedVerifyIdentityForm,
        formIsValid: formIsValid
      });
      return {
        financeForm: updatedVerifyIdentityForm,
        formIsValid: formIsValid
      };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.verifyIdentityForm) {
      formElementsArray.push({
        id: key,
        config: this.state.verifyIdentityForm[key]
      });
    }
    return (
      <React.Fragment>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.pageHeader}>Verify your identity</Text>
            <Text style={styles.para}>
              Financial regulations require that we verify your identity in
              order to open an account.
            </Text>
            {formElementsArray.map(formElement => {
              return (
                <View key={formElement.id}>
                  <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={event =>
                      this.inputChangedHandler(event, formElement.id)
                    }
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default VerifyIdentity;

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  pageHeader: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 5
  },
  makeBold: {
    fontWeight: "bold"
  },
  para: {
    marginTop: 10
  }
});
