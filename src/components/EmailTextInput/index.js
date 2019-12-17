import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
const EmailTextInput = () => {
    const [textValue, setTextValue] = useState('');

    return (
        <View>
			<TextInput
	          label="Email"
	          value={textValue}
	          onChangeText={value => setTextValue(value)}
	          style={{backgroundColor: 'transparent'}}
	        />
	        {textValue != '' ? <HelperText
	          type="error"
	          visible={!textValue.includes('@')}
	        >
	          Email address is invalid!
	        </HelperText> : <Text></Text>}
		</View>
    )
}

export default EmailTextInput;