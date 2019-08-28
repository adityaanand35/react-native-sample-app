import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";

import Basic from "./Forms/Basic/Basic";
import Address from "./Forms/Address/Address";
import VerifyIdentity from "./Forms/VerifyIdentity/VerifyIdentity";
import Finance from "./Forms/Finance/Finance";
import AccountType from "./Forms/AccountType/AccountType";
import Button from "../component/UI/Button/button";
import AccountCreateConfig from "./AccountCreateConfig/AccountCreateConfig";
import CustomerAgreement from "./Forms/CustomerAgreement/CustomerAgreement";

export default function CreateAccount() {
  const [getFormStep, setFormStep] = useState(0);
  const [isNextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [getBasicForm, setBasicForm] = useState({});
  const [getAddressForm, setAddressForm] = useState({});
  const [getVerifyIdentityForm, setVerifyIdentityForm] = useState({});
  const [getFinanceForm, setFinanceForm] = useState({});
  let formToRender = null;
  switch (AccountCreateConfig.FormSequence[getFormStep]) {
    case AccountCreateConfig.Forms.basicInfoForm:
      formToRender = (
        <Basic
          getData={data => getBasicFormData(data)}
          initialState={getBasicForm}
        />
      );
      break;
    case AccountCreateConfig.Forms.addressInfoForm:
      formToRender = (
        <Address
          getData={data => getAddressFormData(data)}
          initialState={getAddressForm}
        />
      );
      break;
    case AccountCreateConfig.Forms.verifyIdentityInfoForm:
      formToRender = (
        <VerifyIdentity
          getData={data => getVerifyIdentityFormData(data)}
          initialState={getVerifyIdentityForm}
        />
      );
      break;
    case AccountCreateConfig.Forms.financeInfoForm:
      formToRender = (
        <Finance
          getData={data => getFinanceFormData(data)}
          initialState={getFinanceForm}
        />
      );
      break;
    case AccountCreateConfig.Forms.accountTypeSelectionForm:
      formToRender = (
        <AccountType getData={data => getAccountTypeFormData(data)} />
      );
      // useEffect(() => {
      //   setNextBtnDisabled(false);
      // });
      break;
    case AccountCreateConfig.Forms.getSignatureForm:
      formToRender = (
        <CustomerAgreement
          fullName={
            getBasicForm.basicForm.firstName.value +
            " " +
            getBasicForm.basicForm.lastName.value
          }
        />
      );
      break;
    default:
      formToRender = null;
  }

  getBasicFormData = form => {
    form.formIsValid ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
    setBasicForm(form);
  };

  getAddressFormData = form => {
    form.formIsValid ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
    setAddressForm(form);
  };

  getVerifyIdentityFormData = form => {
    form.formIsValid ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
    setVerifyIdentityForm(form);
  };

  getFinanceFormData = form => {
    form.formIsValid ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
    setFinanceForm(form);
  };

  getAccountTypeFormData = form => {
    form.formIsValid ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
  };

  return (
    <React.Fragment>
      {formToRender}
      <View style={styles.buttons}>
        {getFormStep > 0 ? (
          <Button
            type="outline"
            touched={() => {
              setNextBtnDisabled(false);
              getFormStep > 0 ? setFormStep(getFormStep - 1) : null;
            }}
          >
            Previous
          </Button>
        ) : (
          <View></View>
        )}
        <Button
          type="solid"
          disabled={isNextBtnDisabled}
          touched={() => {
            setNextBtnDisabled(true);
            getFormStep < AccountCreateConfig.FormSequence.length - 1
              ? setFormStep(getFormStep + 1)
              : null;

            if (
              AccountCreateConfig.FormSequence[getFormStep] ===
              AccountCreateConfig.Forms.accountTypeSelectionForm
            ) {
              const dob = new Date(
                getVerifyIdentityForm.verifyIdentityForm.birthDate.value
              ).toISOString();
              const formData = {
                loginId: getBasicForm.basicForm.username.value,
                firstName: getBasicForm.basicForm.firstName.value,
                middleName: "",
                lastName: getBasicForm.basicForm.lastName.value,
                suffix: null,
                tid: getVerifyIdentityForm.verifyIdentityForm.ssn.value,
                dateOfBirth: dob,
                email1: getBasicForm.basicForm.email.value,
                primaryAddress: {
                  line1: getAddressForm.addressForm.address1.value,
                  line2: getAddressForm.addressForm.address2.value,
                  city: getAddressForm.addressForm.city.value,
                  state: getAddressForm.addressForm.state.value,
                  zipcode: getAddressForm.addressForm.zipcode.value,
                  country: "US"
                },
                eveningTelephone: getAddressForm.addressForm.primaryPhone.value,
                dayTelephone: getAddressForm.addressForm.secondaryPhone.value,
                employmentStatus: "Unemployed",
                employerAddress: null,
                employerName: null,
                occupationType: null,
                finraAffiliated: false,
                directorOrTenPercentShareholder: false,
                directorOrTenPercentShareholderCompany: [],
                netWorth: 2,
                liquidNetWorth: 2,
                annualIncome: 2,
                citizenship: "C",
                residenceCountry: "US",
                accountType: "Individual",
                memberAttributes: {},
                mailingAddress: null
              };
              axios
                .post(
                  "https://apifoliofirst.uataws.foliofn.com/bod/member/create",
                  formData
                )
                .then(response => {
                  console.log(response.data);
                  const accName =
                    "Individual" + Math.floor(100 + Math.random() * 900);
                  axios
                    .post(
                      "https://apifoliofirst.uataws.foliofn.com/bod/accounts/create",
                      {
                        accountName: accName,
                        accountType: "I",
                        billingPlanOid: "7133701811888608864",
                        primaryAccountOwner:
                          getBasicForm.basicForm.username.value,
                        w9BackupWithholding: "N"
                      }
                    )
                    .then(response => {
                      console.log(response.data);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }}
        >
          Next
        </Button>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    alignItems: "flex-start"
  }
});
