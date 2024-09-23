import { StyleSheet, Text, View } from 'react-native'
import React, {useRef, useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from '../../components/general/HeaderMedium';
import {paystackProps, Paystack}  from "react-native-paystack-webview";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from '../../components/auth/CustomTextInput';
import CustomButton from '../../components/auth/CustomButton';

export default function TopUp({navigation}) {
    const [amount, setAmount] = useState("")
    const paystackWebViewRef = useRef(paystackProps.PayStackRef)
    const { userProfile } = useSelector((state) => state.user);
   

     // Function to format the input value as currency
     const formatCurrency = (value) => {
        // Remove non-numeric characters from the input
        const numericValue = value.replace(/[^0-9]/g, '');
        // Convert the numeric value to a formatted currency string
        const formattedValue = parseFloat(numericValue).toLocaleString('en-US', {
            style: 'currency',
            currency: 'NGN', // Change currency code as needed
        });
        return formattedValue;
    };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Top Up"} />
      <CustomTextInput
              value={amount}
              onChangeText={(text) => setAmount(text)}
              keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={"Enter amount to add"}
              
            /> 
       <CustomButton onPress={()=>paystackWebViewRef.current.startTransaction()} text={"Top Up Account"} fill={true}/>     

      <Paystack  
        paystackKey="pk_test_e52e42c107480e08fd0cd3aa5c19fee0a84e7330"
        amount={"25000.00"}
        billingEmail="abey4luv@gmail.com"
        billingName="Abiodun Adam"
        billingMobile="08022407013"
        activityIndicatorColor={COLORS.gray2}
        currency='NGN'
        onCancel={(e) => {
          // handle response here
          console.log(e)
        }}
        onSuccess={(res) => {
          // handle response here
          console.log(res)
        }}
        // autoStart={true}
        ref={paystackWebViewRef}
      />


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: SIZES.base2,
      paddingHorizontal: SIZES.base2,
      backgroundColor: COLORS.white,
      marginBottom: SIZES.base3,
    },
  });