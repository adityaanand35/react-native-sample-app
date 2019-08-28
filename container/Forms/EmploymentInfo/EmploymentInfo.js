import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../../../component/UI/Input/Input";

class EmploymentInfo extends Component {
  state = {
    employmentInfoForm: {
      firstName: {
        elementType: "input",
        elementConfig: {
          keyboardType: "number-pad",
          label: "Select Employment Status*"
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
    const updatedEmploymentInfoForm = {
      ...this.state.EmploymentInfoForm
    };
    const updatedFormElement = {
      ...updatedEmploymentInfoForm[inputIdentifier]
    };
    updatedFormElement.value = event;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedEmploymentInfoForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedEmploymentInfoForm) {
      formIsValid =
        updatedEmploymentInfoForm[inputIdentifier].valid && formIsValid;
    }

    this.setState(prevState => {
      this.props.getData({
        employmentInfoForm: updatedEmploymentInfoForm,
        formIsValid: formIsValid
      });
      return {
        financeForm: updatedEmploymentInfoForm,
        formIsValid: formIsValid
      };
    });

    // this.setState({ EmploymentInfoForm: updatedEmploymentInfoForm, formIsValid: formIsValid });
    // this.props.getData(this.state);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.EmploymentInfoForm) {
      formElementsArray.push({
        id: key,
        config: this.state.EmploymentInfoForm[key]
      });
    }
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.pageHeader}>Verify your identity</Text>
          <Text style={styles.para}>
            Financial regulations require that we verify your identity in order
            to open an account.
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
      </React.Fragment>
    );
  }
}

export default EmploymentInfo;

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
