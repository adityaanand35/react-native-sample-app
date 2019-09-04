import React from "react";
import { StyleSheet, View, Picker, Text, TouchableOpacity } from "react-native";
import { TextField } from "react-native-material-textfield";

const input = props => {
  let inputElement = null;
  // const inputClasses = [classes.InputElement];
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    // inputClasses.push(classes.Invalid);
    if (props.shouldValidate.validationError) {
      validationError = props.shouldValidate.validationError;
    } else {
      validationError = "Please enter a valid value!";
    }
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <TextField
          style={styles.inputField}
          onChangeText={props.changed}
          inputContainerPadding={12}
          value={props.value}
          tintColor="rgb(255, 0, 136)"
          error={validationError}
          {...props.elementConfig}
        />
      );
      break;
    case "picker":
      inputElement = (
        <View>
          <Picker
            selectedValue={props.value}
            style={styles.picker}
            onValueChange={props.changed}
            itemStyle={{ color: "#c4c4c4" }}
          >
            {Object.keys(props.elementConfig.options).map(option => {
              return (
                <Picker.Item
                  key={option}
                  label={props.elementConfig.options[option]}
                  value={option}
                />
              );
            })}
          </Picker>
          <View
            style={{
              borderBottomColor: "#c4c4c4",
              borderBottomWidth: 0.7
            }}
          />
        </View>
      );
      break;
    case "radio":
      inputElement = (
        <TouchableOpacity onPress={props.changed}>
          <View style={styles.radio}>
            <View
              style={[
                {
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: "#000",
                  alignItems: "center",
                  justifyContent: "center"
                },
                props.style
              ]}
            >
              {props.selected ? (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: "#000"
                  }}
                />
              ) : null}
            </View>
            <Text style={styles.accountType}>{props.elementConfig.label}</Text>
          </View>
        </TouchableOpacity>
      );
      break;
    case "draw-signature":
      inputElement = (
        <View>
          <TextField
            style={styles.inputField}
            onChangeText={props.changed}
            inputContainerPadding={12}
            value={props.value}
            tintColor="rgb(255, 0, 136)"
            error={validationError}
            {...props.elementConfig}
          />
        </View>
      );
      break;
    default:
      inputElement = (
        <TextField
          style={styles.inputField}
          onChangeText={props.changed}
          value={props.value}
          inputContainerPadding={12}
          tintColor="rgb(255, 0, 136)"
          error={validationError}
          {...props.elementConfig}
        />
      );
  }
  return <View>{inputElement}</View>;
};

export default input;

const styles = StyleSheet.create({
  inputField: {
    margin: 10
  },
  picker: {
    marginTop: 10
  },
  radio: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  accountType: {
    marginLeft: 10
  }

});
