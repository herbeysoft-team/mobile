import React, { useState } from "react";
import { View, Button, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { addListing, uploadPhotos } from "../../context/features/listingSlice";
import { useDispatch, useSelector } from "react-redux";

const ImageUpload = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };


  const uploadImages = async () => {
    const formData = new FormData();
    console.log(images)
    images.forEach((image, index) => {
      formData.append(`files`, {
        uri: image,
        name: `image_${index}.jpg`,
        type: "image/jpeg",
      });
    });
    formData.append("name", "Abiodun Adam")
    try {
        dispatch(uploadPhotos(formData));
    //   const response = await axios.post("http://172.20.10.4:8002/api/v1/listing/uploadimages/", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("Upload response:", response.data);
    //   // Handle success
    } catch (error) {
      console.error("Upload error:", error);
      // Handle error
    }
  };

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={{alignItems:"center", justifyContent:"center", flexDirection:"column"}}> 
        {images.map((image, index) => (
          <Image
            key={index*23}
            source={{ uri: image }}
            style={{ width: 200, height: 200 }}
          />
        ))}
        <Button title="Pick Images" onPress={pickImage} />
        <Button title="Upload Images" onPress={uploadImages} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageUpload;
