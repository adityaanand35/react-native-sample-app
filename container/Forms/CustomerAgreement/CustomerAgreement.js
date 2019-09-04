import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";

import Input from "../../../Component/UI/Input/Input";
import Button from "../../../Component/UI/Button/button";
import { ScrollView } from "react-native-gesture-handler";

class CustomerAgreement extends Component {
  state = {
    signatureForm: {
      signaturePad: {
        elementType: "draw-signature",
        elementConfig: {
          label: "Signature*",
          keyboardType: "default"
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
    const updatedSignatureForm = {
      ...this.state.signatureForm
    };
    const updatedFormElement = {
      ...updatedSignatureForm[inputIdentifier]
    };
    updatedFormElement.value = event;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.valid = this.props.fullName === event;
    updatedFormElement.touched = true;
    updatedSignatureForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedSignatureForm) {
      formIsValid = updatedSignatureForm[inputIdentifier].valid && formIsValid;
    }

    this.setState(prevState => {
      this.props.getData({
        signatureForm: updatedSignatureForm,
        formIsValid: formIsValid
      });
      return { signatureForm: updatedSignatureForm, formIsValid: formIsValid };
    });
  };

  onError = error => {
    console.log("error", error);
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.signatureForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signatureForm[key]
      });
    }
    return (
      <React.Fragment>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.pageHeader}>Customer Agreement</Text>
            <Text style={styles.para}>
              By signing below, I, rty g jkhkjhjkh, certify under penalty of
              perjury that:
            </Text>
            <FlatList
              data={[
                { key: "1. I am the Primary Account Holder." },
                {
                  key:
                    "2. I am a U.S. Person, and the tax identification number provided is correct."
                },
                {
                  key:
                    "3. I am NOT subject to backup withholding as a result of my failure to report all interest and dividends, or the Internal Revenue Service (IRS) has notified me that I am no longer subject to backup withholding."
                },
                {
                  key:
                    "4. I acknowledge that I have received, read, and agree to the terms and conditions set forth in the Customer Agreement."
                },
                {
                  key:
                    "5. I agree that Folio First does not recommend any securities or investments."
                }
              ]}
              renderItem={({ item }) => (
                <Text style={styles.para}>{item.key}</Text>
              )}
            />
            <Text style={styles.para}>
              Part 2 of the Customer Agreement you agree to by signing below
              contains a predispute arbitration clause located at the
              Arbitration paragraph on page 7.
            </Text>
            <Text style={styles.para}>
              The Internal Revenue Service does not require consent to any
              provision of this document other than the certifications required
              to avoid backup withholding.
            </Text>
            <Text style={styles.subHeader}>Electronic Signature</Text>
            <Text>Use the keyboard to enter your full name:</Text>
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
                    SignaturePadError={this.onError}
                    changed={event =>
                      this.inputChangedHandler(event, formElement.id)
                    }
                  />
                </View>
              );
            })}
            <Text>{this.props.fullName} (type exactly)</Text>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default CustomerAgreement;

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
  subHeader: {
    fontWeight: "bold",
    marginTop: 10
  }
});
