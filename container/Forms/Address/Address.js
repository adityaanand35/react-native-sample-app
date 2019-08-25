import React, { Component } from "react";
import { StyleSheet, Text, View, CheckBox, ScrollView } from "react-native";

import Input from "../../../component/UI/Input/Input";
import { ListOfStates } from "./Address.const";

class Address extends Component {
  state = {
    addressForm: {
      address1: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "Address 1*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address2: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "Address 2 (optional)"
        },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        touched: false
      },
      city: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "City*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      state: {
        elementType: "picker",
        elementConfig: {
          options: { ...ListOfStates }
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          keyboardType: "number-pad",
          label: "Zip code*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      primaryPhone: {
        elementType: "input",
        elementConfig: {
          keyboardType: "phone-pad",
          label: "Phone Number*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      secondaryPhone: {
        elementType: "input",
        elementConfig: {
          keyboardType: "phone-pad",
          label: "Secondary Phone Number (optional)"
        },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        touched: false
      }
    },
    mailingAddressForm: {
      mailAddress1: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "Address 1*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      mailAddress2: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "Address 2 (optional)"
        },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        touched: false
      },
      mailCity: {
        elementType: "input",
        elementConfig: {
          keyboardType: "default",
          label: "City*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      mailState: {
        elementType: "picker",
        elementConfig: {
          options: { ...ListOfStates }
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      mailZipcode: {
        elementType: "input",
        elementConfig: {
          keyboardType: "number-pad",
          label: "Zip code*"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    showMailingAddress: false
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

  inputChangedHandler = (event, inputIdentifier, isMailingForm) => {
    console.log("event", event, inputIdentifier);
    let updatedAddressForm = {};
    isMailingForm
      ? (updatedAddressForm = {
          ...this.state.mailingAddressForm
        })
      : (updatedAddressForm = {
          ...this.state.addressForm
        });
    const updatedFormElement = {
      ...updatedAddressForm[inputIdentifier]
    };
    // if (inputIdentifier === 'state' || inputIdentifier === 'mailState') {
    //   updatedFormElement.value = ListOfStates[event];
    // } else {
    updatedFormElement.value = event;
    // }

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAddressForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedAddressForm) {
      formIsValid = updatedAddressForm[inputIdentifier].valid && formIsValid;
    }
    isMailingForm
      ? this.setState({
          mailingAddressForm: updatedAddressForm,
          formIsValid: formIsValid
        })
      : this.setState({
          addressForm: updatedAddressForm,
          formIsValid: formIsValid
        });
    this.props.getData(this.state);
  };

  toggleMailingAddress = () => {
    this.setState(oldState => {
      return { showMailingAddress: !oldState.showMailingAddress };
    });
  };

  render() {
    const formElementsArray = [];
    const mailingAddressArray = [];
    for (let key in this.state.addressForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addressForm[key]
      });
    }
    if (this.state.showMailingAddress) {
      for (let key in this.state.mailingAddressForm) {
        mailingAddressArray.push({
          id: key,
          config: this.state.mailingAddressForm[key]
        });
      }
    }

    return (
      <React.Fragment>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.pageHeader}>Tell us more about yourself</Text>
            <Text style={styles.para}>
              You'll need a U.S. mailing address in order to open an account.
            </Text>
            <Text style={styles.pageHeader}>Primary Address (no P.O. Box)</Text>
            {formElementsArray.map(formElement => {
              let fieldHeader = null;
              if (formElement.id === "zipcode") {
                fieldHeader = (
                  <View key="mailingAddressToggle">
                    <View style={styles.mailAddressCheck}>
                      <CheckBox
                        value={this.state.showMailingAddress}
                        onValueChange={() => this.toggleMailingAddress()}
                      ></CheckBox>
                      <Text style={styles.mailingLabel}>
                        My mailing address is different from my primary address
                      </Text>
                    </View>

                    {mailingAddressArray.map(mailElement => {
                      return (
                        <View key={mailElement.id}>
                          <Input
                            elementType={mailElement.config.elementType}
                            elementConfig={mailElement.config.elementConfig}
                            value={mailElement.config.value}
                            invalid={!mailElement.config.valid}
                            shouldValidate={mailElement.config.validation}
                            touched={mailElement.config.touched}
                            changed={event =>
                              this.inputChangedHandler(
                                event,
                                mailElement.id,
                                true
                              )
                            }
                          />
                          {fieldHeader}
                        </View>
                      );
                    })}
                  </View>
                );
              }
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
                      this.inputChangedHandler(event, formElement.id, false)
                    }
                  />
                  {fieldHeader}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default Address;

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
  },
  mailAddressCheck: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10
  },
  mailingLabel: {
    marginTop: 5
  }
});
