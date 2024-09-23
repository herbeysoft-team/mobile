import React, { useEffect, useRef } from 'react';
import { View, Modal, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SIZES, COLORS, FONTS } from '../../constant';
import CustomButton from '../auth/CustomButton';
import { EXPO_PUBLIC_GOOGLE_API_KEY } from "@env";
import { AntDesign } from '@expo/vector-icons'; 
import CustomGooglePlacesInput from '../auth/CustomGooglePlacesInput';

const GooglePlacesModal = ({ openGooglePlacesModal, setOpenGooglePlacesModal, setLocation, placeholder }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openGooglePlacesModal}
    >
      <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
        <View style={styles.modalView}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={placeholder}
            minLength={3}
            onPress={(data, details = null) => {
              console.log(data.description);
              setLocation(data.description); // Use the callback to set the location
              setOpenGooglePlacesModal(false); // Close modal on selection
            }}
            query={{
              key: EXPO_PUBLIC_GOOGLE_API_KEY,
              language: 'en',
              components: 'country:NG',
            }}
          //   renderLeftButton={() => (
          //     <AntDesign
          //     name="enviromento"
          //     size={SIZES.base3}
          //     color={COLORS.gray3}
           
          //   />
          // )}
            styles={{
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
            }}
          />
          
          <View style={{ width: "100%" }}>
            <CustomButton
              onPress={() => setOpenGooglePlacesModal(false)}
              text={"Close"}
              fill={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.base2,
    paddingHorizontal: SIZES.base3,
    paddingTop: SIZES.base4,
    paddingBottom: SIZES.base2,
    width: SIZES.wp(100),
    height: SIZES.hp(60),
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: SIZES.thickness,
    elevation: SIZES.thickness,
  },
  textInputContainer: {
    width: '100%',
    borderWidth: SIZES.thin,
    borderRadius: SIZES.base,
    borderColor: COLORS.accent2,
    marginBottom: SIZES.base2,
  },
  textInput: {
    height: SIZES.base6,
    color: COLORS.accent2,
    ...FONTS.body3,
  },
});

export default GooglePlacesModal;
