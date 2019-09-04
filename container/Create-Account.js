import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";

import Basic from "./Forms/Basic/Basic";
import Address from "./Forms/Address/Address";
import VerifyIdentity from "./Forms/VerifyIdentity/VerifyIdentity";
import Finance from "./Forms/Finance/Finance";
import AccountType from "./Forms/AccountType/AccountType";
import Button from "../Component/UI/Button/button";
import AccountCreateConfig from "./AccountCreateConfig/AccountCreateConfig";
import CustomerAgreement from "./Forms/CustomerAgreement/CustomerAgreement";

const CreateAccount = props => {
  const [getFormStep, setFormStep] = useState(0);
  const [isNextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [getBasicForm, setBasicForm] = useState({});
  const [getAddressForm, setAddressForm] = useState({});
  const [getVerifyIdentityForm, setVerifyIdentityForm] = useState({});
  const [getFinanceForm, setFinanceForm] = useState({});
  const [getAccountNumber, setAccountNumber] = useState("");
  const [getNextBtnText, setNextBtnText] = useState("Next");
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
      break;
    case AccountCreateConfig.Forms.getSignatureForm:
      formToRender = (
        <CustomerAgreement
          getData={data => getSignatureFormData(data)}
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

  memberFormData = () => {
    const dob = new Date(
      getVerifyIdentityForm.verifyIdentityForm.birthDate.value
    ).toISOString();

    return {
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
  };

  getAccountData = () => {
    const accName = "Individual" + Math.floor(100 + Math.random() * 900);
    return {
      accountName: accName,
      accountType: "I",
      billingPlanOid: "7133701811888608864",
      primaryAccountOwner: getBasicForm.basicForm.username.value,
      w9BackupWithholding: "N"
    };
  };

  createMember = () => {
    axios
      .post(AccountCreateConfig.memberCreateURL, memberFormData())
      .then(response => {
        console.log(response.data);
        axios
          .post(AccountCreateConfig.accountCreateURL, getAccountData())
          .then(response => {
            setAccountNumber(response.headers.location.split("/")[response.headers.location.split("/").length - 1])
            console.log(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitSignature = () => {
    axios
      .post(AccountCreateConfig.submitSignatureURL, {
        accountNumber: getAccountNumber,
        loginId: getBasicForm.basicForm.username.value,
        signatureData:
          "data:image/png;base64,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",
        signatureImageEncoding: "PNG",
        signatureMethod: "SIGNATURE_IMAGE",
        w9Withold: false
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePrevButton = () => {
    setNextBtnDisabled(false);
    getFormStep > 0 ? setFormStep(getFormStep - 1) : props.history.push("/");

    if (
      AccountCreateConfig.FormSequence[getFormStep + 1] !==
      AccountCreateConfig.Forms.getSignatureForm
    ) {
      setNextBtnText("Next");
    }
  };

  handleNextButton = () => {
    setNextBtnDisabled(true);
    getFormStep < AccountCreateConfig.FormSequence.length - 1
      ? setFormStep(getFormStep + 1)
      : null;

    if (
      AccountCreateConfig.FormSequence[getFormStep] ===
      AccountCreateConfig.Forms.accountTypeSelectionForm
    ) {
      createMember();
    }

    if (
      AccountCreateConfig.FormSequence[getFormStep + 1] ===
      AccountCreateConfig.Forms.getSignatureForm
    ) {
      setNextBtnText("Submit Signature");
    } else {
      setNextBtnText("Next");
    }

    if (
      AccountCreateConfig.FormSequence[getFormStep] ===
      AccountCreateConfig.Forms.getSignatureForm
    ) {
      submitSignature();
    }
  };

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

  getSignatureFormData = form => {
    form.formIsValid ? setNextBtnDisabled(false) : setNextBtnDisabled(true);
  };

  return (
    <React.Fragment>
      {formToRender}
      <View style={styles.buttons}>
        <Button type="outline" touched={handlePrevButton}>
          Previous
        </Button>

        <Button
          type="solid"
          disabled={isNextBtnDisabled}
          touched={handleNextButton}
        >
          {getNextBtnText}
        </Button>
      </View>
    </React.Fragment>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    alignItems: "flex-start"
  }
});
