import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

import Input from "../../../component/UI/Input/Input";

class Basic extends Component {
  state = {
    basicForm: {
      firstName: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "First Name*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "Last Name*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          keyboardType: "email-address",
          label: "Email*"
        },
        value: "",
        validation: {
          required: true,
          regex: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$"
        },
        valid: false,
        touched: false
      },
      username: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "Username*"
        },
        value: "",
        validation: {
          required: true,
          minLength: 8,
          validationError: ""
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    httpCall: new Date()
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
      rules.validationError = `Minimum ${rules.minLength} characters are required`;
    }
    if (rules && rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules && rules.regex) {
      let exp = new RegExp(rules.regex);
      isValid = exp.test(value);
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedBasicForm = {
      ...this.state.basicForm
    };
    const updatedFormElement = {
      ...updatedBasicForm[inputIdentifier]
    };
    updatedFormElement.value = event;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedBasicForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedBasicForm) {
      formIsValid = updatedBasicForm[inputIdentifier].valid && formIsValid;
    }
    this.setState(prevState => {
      this.props.getData({
        basicForm: updatedBasicForm,
        formIsValid: formIsValid
      });
      return { basicForm: updatedBasicForm, formIsValid: formIsValid };
    });

    if (inputIdentifier === "username" && updatedFormElement.valid) {
      let url =
        "https://apifoliofirst.uataws.foliofn.com/bod/members/loginAvailable/";
      if (new Date().getTime() - this.state.httpCall.getTime() > 1000) {
        this.getUsernameValidity(updatedBasicForm, updatedFormElement, url);
        this.state.httpCall = new Date();
      }
    }
  };

  getUsernameValidity(updatedBasicForm, updatedFormElement, url) {
    axios
      .get(url + updatedFormElement.value)
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
        updatedFormElement.valid = false;
        updatedFormElement.validation.validationError =
          "Username already exists";
        updatedBasicForm[inputIdentifier] = updatedFormElement;
        this.setState({ basicForm: updatedBasicForm });
      });
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.basicForm) {
      formElementsArray.push({
        id: key,
        config: this.state.basicForm[key]
      });
    }
    return (
      <React.Fragment>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.pageHeader}>Let's get Started</Text>
            <Text style={styles.para}>
              Fill out the fields below to begin creating your account. It only
              takes a minute!
            </Text>
            {formElementsArray.map(formElement => {
              let fieldHeader = null;
              if (formElement.id === "username") {
                fieldHeader = (
                  <Text style={styles.para} key="usernameHelpText">
                    The username must be 8-32 characters long. It cannot contain
                    symbols or spaces and is not case sensitive.
                    <Text style={styles.makeBold}>
                      It is permanent and cannot be changed.
                    </Text>
                  </Text>
                );
              }
              return (
                <View key={formElement.id}>
                  {fieldHeader}
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

export default Basic;

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
    marginTop: 20
  }
});
