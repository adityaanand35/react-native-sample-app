import React from 'react';
import { Text, Image } from 'react-native';
import Button from '../UI/Button/button';

const input = (props) => {
    return (
        <React.Fragment>
            <Image
                source={require('./assets/ff-hero-image.png')}
            />
            <Text>
                Welcome to FolioFirst!
    From the brokerage that's been revolutionizing online investing since 2000
        </Text>
            <Button>Create an account</Button>

            <Text>
                Who is FolioFirst?
    FolioFirst was created to help make investing easy, accessible, and affordable for everyone.
    FolioFirst gives you virtually unlimited commission-free trading1 among more than 200 stocks and three exchange-traded funds (ETFs), enhanced investing tools, and protection for cash in your account—for just $5 per month.2
    That’s less than some other brokerages charge for just a single trade!
        </Text>
        </React.Fragment>
    )
}

export default input;