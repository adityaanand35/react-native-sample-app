import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../../../component/UI/Input/Input";

class AccountType extends Component {
  state = {
    accountTypeForm: {
      individual: {
        elementType: "radio",
        elementConfig: {
          label: "Individual"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        selected: true
      },
      joint: {
        elementType: "radio",
        elementConfig: {
          label: "Joint"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        selected: false
      },
      custodial: {
        elementType: "radio",
        elementConfig: {
          label: "Custodial"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        selected: false
      },
      traditional: {
        elementType: "radio",
        elementConfig: {
          label: "Traditional"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        selected: false
      },
      rothIra: {
        elementType: "radio",
        elementConfig: {
          label: "Roth Ira"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        selected: false
      }
    },
    formIsValid: false
  };

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
    console.log('event', event, inputIdentifier);
    const updatedAccountTypeForm = {
      ...this.state.accountTypeForm
    };
    const updatedFormElement = {
      ...updatedAccountTypeForm[inputIdentifier]
    };
    updatedFormElement.value = event;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAccountTypeForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedAccountTypeForm) {
      formIsValid = updatedAccountTypeForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ accountTypeForm: updatedAccountTypeForm, formIsValid: formIsValid });
    this.props.getData(this.state);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.accountTypeForm) {
      formElementsArray.push({
        id: key,
        config: this.state.accountTypeForm[key]
      });
    }
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.pageHeader}>Personal Accounts</Text>
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
                  selected={formElement.config.selected}
                  changed={event =>
                    this.inputChangedHandler(event, formElement.id)
                  }
                />
              </View>
            );
          })}
        </View>
      </React.Fragment>
    );
  }
}

export default AccountType;

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
