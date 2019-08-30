import React, { Component } from "./node_modules/react";
import { StyleSheet, Text, View } from "react-native";

import Input from "../../../component/UI/Input/Input";
import {
  ListOfHouseholdIncome,
  ListOfLiquidNetWroth,
  ListOfTotalNetWorth
} from "./Finance.const";

class Finance extends Component {
  state = {
    financeForm: {
      houseHoldIncome: {
        elementType: "picker",
        elementConfig: {
          options: { ...ListOfHouseholdIncome }
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      liquidNetWorth: {
        elementType: "picker",
        elementConfig: {
          options: { ...ListOfLiquidNetWroth }
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      totalNetWorth: {
        elementType: "picker",
        elementConfig: {
          options: { ...ListOfTotalNetWorth }
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: true
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
    const updatedFinanceForm = {
      ...this.state.financeForm
    };
    const updatedFormElement = {
      ...updatedFinanceForm[inputIdentifier]
    };
    updatedFormElement.value = event;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedFinanceForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedFinanceForm) {
      formIsValid = updatedFinanceForm[inputIdentifier].valid && formIsValid;
    }
    // this.setState({
    //   financeForm: updatedFinanceForm,
    //   formIsValid: formIsValid
    // });
    // this.props.getData(this.state);

    this.setState(prevState => {
      this.props.getData({
        financeForm: updatedFinanceForm,
        formIsValid: formIsValid
      });
      return { financeForm: updatedfinanceForm, formIsValid: formIsValid };
    });
  };

  componentDidMount() {
    this.props.getData(this.state);
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.financeForm) {
      formElementsArray.push({
        id: key,
        config: this.state.financeForm[key]
      });
    }
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.pageHeader}>Tell us about your finances</Text>
          <Text style={styles.para}>
            Financial regulations require that we ask for this information.
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

export default Finance;

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
