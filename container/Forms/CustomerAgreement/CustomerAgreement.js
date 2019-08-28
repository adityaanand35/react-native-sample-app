import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";

import Input from "../../../component/UI/Input/Input";
import Button from "../component/UI/Button/button";

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

  inputChangedHandler = ({ event }, inputIdentifier) => {
    const updatedSignatureForm = {
      ...this.state.SignatureForm
    };
    const updatedFormElement = {
      ...updatedSignatureForm[inputIdentifier]
    };
    updatedFormElement.value = event;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedSignatureForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedSignatureForm) {
      formIsValid = updatedSignatureForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      SignatureForm: updatedSignatureForm,
      formIsValid: formIsValid
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
            contains a predispute arbitration clause located at the Arbitration
            paragraph on page 7.
          </Text>
          <Text style={styles.para}>
            The Internal Revenue Service does not require consent to any
            provision of this document other than the certifications required to
            avoid backup withholding.
          </Text>
          <Text style={styles.subHeader}>Electronic Signature</Text>
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
                  fullName={this.props.fullName}
                  changed={event =>
                    this.inputChangedHandler(event, formElement.id)
                  }
                />
              </View>
            );
          })}
          <Button
            type="solid"
            touched={() => {
              axios
                .post(
                  "https://apifoliofirst.uataws.foliofn.com/bod/accounts/signature/create",
                  {
                    accountNumber: "RJ7180400H",
                    loginId: "hfghgfhfghgf",
                    signatureData:
                      "data:image/png;base64,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",
                    signatureImageEncoding: "PNG",
                    signatureMethod: "SIGNATURE_IMAGE",
                    w9Withold: false
                  }
                )
                .then(response => {
                  console.log(response.data);
                })
                .catch(err => {
                  console.log(err);
                });
            }}
          >
            Submit Signature
          </Button>
        </View>
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
