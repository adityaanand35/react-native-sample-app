import React from "react";
import { StyleSheet, View, Picker, Text, TouchableHighlight } from "react-native";
import { TextField } from "react-native-material-textfield";

const input = props => {
  let inputElement = null;
  // const inputClasses = [classes.InputElement];
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    // inputClasses.push(classes.Invalid);
    validationError = "Please enter a valid value!";
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
            itemStyle={{color: '#c4c4c4'}}
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
        <View style={styles.radio} onPress={props.changed}>
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
          <Text>{props.elementConfig.label}</Text>
        </View>
      );
      break;
    default:
      inputElement = (
        <TextField
          style={styles.inputField}
          onChangeText={props.changed}
          value={props.value}
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
    alignItems: "flex-start",
  }
});
