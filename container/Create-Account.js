import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Basic from "./Forms/Basic/Basic";
import Address from "./Forms/Address/Address";
import VerifyIdentity from "./Forms/VerifyIdentity/VerifyIdentity";
import Finance from "./Forms/Finance/Finance";
import AccountType from "./Forms/AccountType/AccountType";
import Button from "../component/UI/Button/button";
import AccountCreateConfig from "./AccountCreateConfig/AccountCreateConfig";

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
      formToRender = <Basic getData={data => getBasicFormData(data)} initialState={getBasicForm} />;
      break;
    case AccountCreateConfig.Forms.addressInfoForm:
      formToRender = <Address getData={data => getAddressFormData(data)} initialState={getAddressForm} />;
      break;
    case AccountCreateConfig.Forms.verifyIdentityInfoForm:
      formToRender = <VerifyIdentity getData={data => getVerifyIdentityFormData(data)} initialState={getVerifyIdentityForm} />;
      break;
    case AccountCreateConfig.Forms.financeInfoForm:
      formToRender = <Finance getData={data => getFinanceFormData(data)} initialState={getFinanceForm} />;
      break;
    case AccountCreateConfig.Forms.accountTypeSelectionForm:
      formToRender = <AccountType />;
      break;
    default:
      formToRender = null;
  }

  getBasicFormData = form => {
    if(form.formIsValid) {
      setNextBtnDisabled(false);
    }
    setBasicForm(form);
  };

  getAddressFormData = form => {
    if(form.formIsValid) {
      setNextBtnDisabled(false);
    }
    setAddressForm(form);
  };

  getVerifyIdentityFormData = form => {
    if(form.formIsValid) {
      setNextBtnDisabled(false);
    }
    setVerifyIdentityForm(form);
  };

  getFinanceFormData = form => {
    if(form.formIsValid) {
      setNextBtnDisabled(false);
    }
    setFinanceForm(form);
  };

  return (
    <React.Fragment>
      {formToRender}
      <View style={styles.buttons}>
      {getFormStep > 0 ? <Button
          style={styles.prevButton}
          type="outline"
          touched={() => {
            setNextBtnDisabled(false);
            getFormStep > 0 ? setFormStep(getFormStep - 1) : null;
          }}>
          Previous
        </Button> : <View></View>}
        <Button
          style={styles.nextButton}
          type="solid"
          disabled={isNextBtnDisabled}
          touched={() => {
            setNextBtnDisabled(true);
            getFormStep < AccountCreateConfig.FormSequence.length - 1
              ? setFormStep(getFormStep + 1)
              : null;
          }}>
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
