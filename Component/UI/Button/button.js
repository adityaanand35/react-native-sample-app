import React from 'react';
import { Button } from 'react-native-elements';

const ButtonElement = (props) => {
    return (
        <Button
            type={props.type}
            raised={true}
            onPress={props.touched}
            title={props.children}
            disabled={props.disabled}></Button>
    )
}

export default ButtonElement;
