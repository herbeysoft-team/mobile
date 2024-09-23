import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMedium from "../../components/general/HeaderMedium";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import { getItem } from "../../utils/asyncStorage.js";
import { useRoute } from "@react-navigation/native";
import CustomTextInput from "../../components/auth/CustomTextInput";
import CustomMultiLineInput from "../../components/auth/CustomMultiLineInput";
import CustomTextInputWithIcon from "../../components/auth/CustomTextInputWithIcon";
import LoadingOverlay from "../../components/general/LoadingOverlay";
import CustomButton from "../../components/auth/CustomButton";
import CustomTextInputWithPicker from "../../components/auth/CustomTextInputWithPicker";
import CustomDateInputWithIcon from "../../components/auth/CustomDateInputWithIcon";
import CustomInputTags from "../../components/auth/CustomInputTags";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategory,
  getEventCategory,
  getServiceCategory,
} from "../../context/features/categorySlice";
import { getVendorListings } from "../../context/features/vendorSlice";
import { updateListing, updateProductListing } from "../../context/features/listingSlice";
import Toast from "react-native-toast-message";

const EditListing = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const { productCategory, eventCategory, serviceCategory } = useSelector(
    (state) => state.category
  );

  const { loadingupdatelisting } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(getProductCategory("product"));
    dispatch(getEventCategory("event"));
    dispatch(getServiceCategory("service"));
  }, []);

  const memoizedProductCategory = useMemo(
    () => productCategory,
    [productCategory]
  );
  const memoizedEventCategory = useMemo(() => eventCategory, [eventCategory]);
  const memoizedServiceCategory = useMemo(
    () => serviceCategory,
    [serviceCategory]
  );

  const daysAvailableOptions = [
    { label: "Mon-Fri", value: "Mon-Fri" },
    { label: "Weekends", value: "Weekends" },
    { label: "Everyday", value: "Everyday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const productUnits = [
    { label: "Piece", value: "Piece" },
    { label: "Unit", value: "Unit" },
    { label: "Kilogram (kg)", value: "Kilogram" },
    { label: "Gram (g)", value: "Gram" },
    { label: "Liter (L)", value: "Liter" },
    { label: "Meter (m)", value: "Meter" },
    { label: "Dozen", value: "Dozen" },
    { label: "Carton", value: "Carton" },
    { label: "Bundle", value: "Bundle" },
  ];

  const serviceUnits = [
    { label: "Hour", value: "Hour" },
    { label: "Session", value: "Session" },
    { label: "Consultation", value: "Consultation" },
    { label: "Visit", value: "Visit" },
    { label: "Project", value: "Project" },
  ];

  const eventUnits = [
    { label: "Ticket", value: "Ticket" },
    { label: "Seat", value: "Seat" },
    { label: "Pass", value: "Pass" },
    { label: "Entry", value: "Entry" },
  ];

  const handleSelectedFromTime = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setFrom(formattedTime);
  };

  const handleSelectedToTime = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTo(formattedTime);
  };

  const handleSelectedTime = (time) => {
    console.log(time)
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(formattedTime)
    setTime(formattedTime);
  };

  const handleSelectedDate = (date) => {
    const selectedDate = new Date(date);

    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;

    setDate(formattedDate);
  };

  const handleDropdownChange = (value) => {
    setCategory(value);
  };

  const handleServiceAvailablity = (value) => {
    setAvailability(value);
  };

  const handleProductUnitChange = (value) => {
    setUnit(value);
  };

  const handleAddTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  function convertTimeRange(timeRange) {
    const [fromTime, toTime] = timeRange.split(" - ");

    // Remove AM/PM from time strings
    const cleanFromTime = fromTime.replace(/am|pm/gi, "");
    const cleanToTime = toTime.replace(/am|pm/gi, "");

    // Split the time strings into hours and minutes
    const [fromHours, fromMinutes] = cleanFromTime.split(":");
    const [toHours, toMinutes] = cleanToTime.split(":");

    // Format the time strings in 24-hour format
    const formattedFrom = `${fromHours.padStart(2, "0")}:${fromMinutes}`;
    const formattedTo = `${toHours.padStart(2, "0")}:${toMinutes}`;

    return { formattedFrom, formattedTo };
  }

  function convertTime(timeRange) {
    // Remove AM/PM from time strings
    const cleanTime = timeRange.replace(/am|pm/gi, "");

    // Split the time strings into hours and minutes
    const [hours, minutes] = cleanTime.split(":");

    // Format the time strings in 24-hour format
    const formattedTime = `${hours.padStart(2, "0")}:${minutes}`;

    return formattedTime;
  }
  const [productname, setProductName] = useState("");
  const [servicename, setServiceName] = useState("");
  const [eventname, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [from, setFrom] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [to, setTo] = useState(null);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    if (route.params[0]?.type === "service") {
      const { formattedFrom, formattedTo } = convertTimeRange(
        route.params[0]?.time
      );
      setFrom(formattedFrom);
      setTo(formattedTo);
    }

    if (route.params[0]?.type === "product") {
      setQuantity(route?.params[0]?.stock.quantity.toString());
    }

    if (route.params[0]?.type === "event") {
      const formattedTime = convertTime(route.params[0]?.time);

      setTime(formattedTime);
      setDate(route.params[0]?.date);
    }
    setItemType(route.params[0]?.type);
    setServiceName(route.params[0]?.name);
    setProductName(route.params[0]?.name);
    setEventName(route.params[0]?.name);
    setDescription(route.params[0]?.description);
    setPrice(route.params[0]?.price.toString());
    setUnit(route.params[0]?.unit);
    setLocation(route.params[0]?.location?.address);
    setAvailability(route.params[0]?.available);
    setTags(route.params[0]?.tags);
    setImages(route.params[0]?.image);
    setCategory(route.params[0]?.category);
  }, []);

  const handleUpdateProduct = async () => {
    if (
      !productname ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !location ||
      !tags ||
      !unit
    ) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      try {
        const formData = {
          type: "product",
          name: productname,
          description: description,
          price: price,
          category: category,
          location: location,
          tags: tags,
          quantity: quantity,
          unit: unit,
        };

        dispatch(
          updateProductListing({
            id: route?.params[0]._id,
            formData,
            Toast,
            navigation,
          })
        );
        
        setTimeout(async () => {
          const getId = await getItem("trowmartuserId");
          if (getId) {
            dispatch(getVendorListings(getId));
          }
        }, 2000);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error,
        });
        console.log(error);
      }
    }
  };

  const handleUpdateService = () => {
    if (
      !servicename ||
      !description ||
      !price ||
      !category ||
      !from ||
      !to ||
      !location ||
      !tags ||
      !unit ||
      !images
    ) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      try {
        const formData = {
          type: "service",
          name: servicename,
          description: description,
          price: price,
          category: category,
          location: location,
          tags: tags,
          quantity: quantity,
          unit: unit,
          available: availability,
          from: from,
          to: to,
        };

        dispatch(
          updateListing({
            id: route?.params[0]._id,
            formData,
            Toast,
            navigation,
          })
        );

        setTimeout(async () => {
          const getId = await getItem("trowmartuserId");
          if (getId) {
            dispatch(getVendorListings(getId));
          }
        }, 2000);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error,
        });
        console.log(error);
      }
    }
  };

  const handleUpdateEvent = () => {
    if (
      !eventname ||
      !description ||
      !price ||
      !category ||
      !time ||
      !date ||
      !location ||
      !tags ||
      !unit
    ) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      try {
        console.log(time)
        const formData = {
          type: "event",
          name: eventname,
          description: description,
          price: price,
          category: category,
          location: location,
          tags: tags,
          unit: unit,
          time: time,
          date: date,
        };

        dispatch(
          updateListing({
            id: route?.params[0]._id,
            formData,
            Toast,
            navigation,
          })
        );

        setTimeout(async () => {
          const getId = await getItem("trowmartuserId");
          if (getId) {
            dispatch(getVendorListings(getId));
          }
        }, 2000);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error,
        });
        console.log(error);
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMedium navigation={navigation} title={"Edit Listing"} />

        {itemType === "service" && (
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: SIZES.base16 }}
            >
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Service Name</Text>
                <CustomTextInput
                  value={servicename}
                  onChangeText={(text) => setServiceName(text)}
                  placeholder="Enter Service Name"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Description</Text>
                <CustomMultiLineInput
                  multiline={true}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  placeholder="Enter Item Description"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Category</Text>
                <CustomTextInputWithPicker
                  placeholder="Select Category"
                  items={memoizedServiceCategory}
                  onValueChange={handleDropdownChange}
                  value={category}
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Location</Text>
                <CustomTextInputWithIcon
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  placeholder="Enter Location"
                  icon="enviromento"
                  // textIcon="₦"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Price</Text>
                <CustomTextInputWithIcon
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                  placeholder="Enter Price"
                  textIcon="₦"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Days Available</Text>
                <CustomTextInputWithPicker
                  placeholder="Select Availability"
                  items={daysAvailableOptions}
                  onValueChange={handleServiceAvailablity}
                  value={availability}
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Unit</Text>
                <CustomTextInputWithPicker
                  placeholder="Select Unit"
                  items={serviceUnits}
                  onValueChange={handleProductUnitChange}
                  value={unit}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: SIZES.base,
                  flex: 1,
                }}
              >
                <View style={{ marginTop: SIZES.base, flex: 1 }}>
                  <Text style={styles.inputheading}>From</Text>
                  <CustomDateInputWithIcon
                    placeholder="09:00"
                    icon="time-outline"
                    onSelectedTimeChange={handleSelectedFromTime}
                    mode="time"
                    defaultTime={from}
                  />
                </View>
                <View style={{ marginTop: SIZES.base, flex: 1 }}>
                  <Text style={styles.inputheading}>To</Text>
                  <CustomDateInputWithIcon
                    placeholder="9:00"
                    icon="time-outline"
                    onSelectedTimeChange={handleSelectedToTime}
                    mode="time"
                    defaultTime={to}
                  />
                </View>
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Tags</Text>
                <CustomInputTags
                  addTag={handleAddTag}
                  removeTag={handleRemoveTag}
                  defaultTags={tags}
                />
                <Text style={styles.underheading}>
                  This helps your listing reach more people
                </Text>
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Service Images</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {images &&
                    images.map((image, index) => (
                      <View key={index} style={{ position: "relative" }}>
                        <Image
                          source={
                            image
                              ? { uri: `${URLBASE.imageBaseUrl}${image}` }
                              : placeholder
                          }
                          style={{
                            width: SIZES.base10,
                            height: SIZES.base10,
                            backgroundColor: COLORS.gray4,
                            borderRadius: SIZES.base,
                            alignItems: "center",
                            justifyContent: "center",
                            margin: SIZES.base,
                          }}
                        />
                        {/* <TouchableOpacity
                          onPress={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: SIZES.thickness,
                            right: SIZES.thickness,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.base,
                            padding: SIZES.base / 2,
                          }}
                        >
                          <AntDesign
                            name="close"
                            size={SIZES.base}
                            color={COLORS.gray3}
                          />
                        </TouchableOpacity> */}
                      </View>
                    ))}
                  {/* <TouchableOpacity onPress={uploadImages}>
                    <View
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: COLORS.gray4,
                        borderWidth: SIZES.thin,
                        margin: SIZES.base,
                      }}
                    >
                      <AntDesign
                        name="picture"
                        size={SIZES.base3}
                        color={COLORS.gray4}
                      />
                    </View>
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity onPress={uploadImages}>
                    <View
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: COLORS.gray4,
                        borderWidth: SIZES.thin,
                        margin: SIZES.base,
                      }}
                    >
                      <AntDesign
                        name="picture"
                        size={SIZES.base3}
                        color={COLORS.gray4}
                      />
                    </View>
                  </TouchableOpacity> */}
                </View>
              </View>

              <LoadingOverlay visible={loadingupdatelisting} />

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: SIZES.base,
                  marginTop: SIZES.base3,
                }}
              >
                <CustomButton
                  text={"Update Listing"}
                  onPress={handleUpdateService}
                  fill={true}
                />
                <CustomButton
                  text={"Back"}
                  onPress={handleGoBack}
                  fill={false}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}

        {itemType === "product" && (
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: SIZES.base16 }}
            >
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Product Name</Text>
                <CustomTextInput
                  value={productname}
                  onChangeText={(text) => setProductName(text)}
                  placeholder="Enter Product Name"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Description</Text>
                <CustomMultiLineInput
                  multiline={true}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  placeholder="Enter Item Description"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Category</Text>
                <CustomTextInputWithPicker
                  placeholder="Select Category"
                  items={memoizedProductCategory}
                  onValueChange={handleDropdownChange}
                  value={category}
                />
              </View>

              {/* <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Location</Text>
                <CustomTextInputWithIcon
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  placeholder="Enter Location"
                  icon="enviromento"
                  // textIcon="₦"
                />
              </View> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: SIZES.base,
                  flex: 1,
                }}
              >
                <View style={{ marginTop: SIZES.base, flex: 1.5 }}>
                  <Text style={styles.inputheading}>Price</Text>
                  <CustomTextInputWithIcon
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    placeholder="3500"
                    textIcon="₦"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ marginTop: SIZES.base, flex: 1 }}>
                  <Text style={styles.inputheading}>Quantity</Text>
                  <CustomTextInput
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                    placeholder="100"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Unit</Text>
                <CustomTextInputWithPicker
                  placeholder="Select Unit"
                  items={productUnits}
                  onValueChange={handleProductUnitChange}
                  value={unit}
                />
              </View>

              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Tags</Text>
                <CustomInputTags
                  addTag={handleAddTag}
                  removeTag={handleRemoveTag}
                  defaultTags={tags}
                />
                <Text style={styles.underheading}>
                  This helps your listing reach more people
                </Text>
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Product Images</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {images &&
                    images.map((image, index) => (
                      <View key={index} style={{ position: "relative" }}>
                        <Image
                          source={
                            image
                              ? { uri: `${URLBASE.imageBaseUrl}${image}` }
                              : placeholder
                          }
                          style={{
                            width: SIZES.base10,
                            height: SIZES.base10,
                            backgroundColor: COLORS.gray4,
                            borderRadius: SIZES.base,
                            alignItems: "center",
                            justifyContent: "center",
                            margin: SIZES.base,
                          }}
                        />
                        {/* <TouchableOpacity
                          onPress={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: SIZES.thickness,
                            right: SIZES.thickness,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.base,
                            padding: SIZES.base / 2,
                          }}
                        >
                          <AntDesign
                            name="close"
                            size={SIZES.base}
                            color={COLORS.gray3}
                          />
                        </TouchableOpacity> */}
                      </View>
                    ))}
                  {/* <TouchableOpacity onPress={uploadImages}>
                    <View
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: COLORS.gray4,
                        borderWidth: SIZES.thin,
                        margin: SIZES.base,
                      }}
                    >
                      <AntDesign
                        name="picture"
                        size={SIZES.base3}
                        color={COLORS.gray4}
                      />
                    </View>
                  </TouchableOpacity> */}
                </View>
              </View>

              <LoadingOverlay visible={loadingupdatelisting} />

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: SIZES.base,
                  marginTop: SIZES.base3,
                }}
              >
                <CustomButton
                  text={"Update Listing"}
                  onPress={handleUpdateProduct}
                  fill={true}
                />
                <CustomButton
                  text={"Back"}
                  onPress={handleGoBack}
                  fill={false}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}

        {itemType === "event" && (
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: SIZES.base16 }}
            >
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Event Name</Text>
                <CustomTextInput
                  value={eventname}
                  onChangeText={(text) => setEventName(text)}
                  placeholder="Enter Event Name"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Description</Text>
                <CustomMultiLineInput
                  multiline={true}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  placeholder="Enter Item Description"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Category</Text>
                <CustomTextInputWithPicker
                  placeholder="Select Category"
                  items={memoizedEventCategory}
                  onValueChange={handleDropdownChange}
                  value={category}
                />
              </View>

              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Location</Text>
                <CustomTextInputWithIcon
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  placeholder="Enter Location"
                  icon="enviromento"
                  // textIcon="₦"
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Unit</Text>
                <CustomTextInputWithPicker
                  placeholder="Select Unit"
                  items={eventUnits}
                  onValueChange={handleProductUnitChange}
                  value={unit}
                />
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Price</Text>
                <CustomTextInputWithIcon
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                  placeholder="Price"
                  textIcon="₦"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: SIZES.base,
                  flex: 1,
                }}
              >
                <View style={{ marginTop: SIZES.base, flex: 1 }}>
                  <Text style={styles.inputheading}>Date</Text>
                  <CustomDateInputWithIcon
                    placeholder="DD/MM/YYYY"
                    icon="ios-calendar-outline"
                    onSelectedTimeChange={handleSelectedDate}
                    mode="date"
                    defaultTime={date}
                  />
                </View>
                <View style={{ marginTop: SIZES.base, flex: 1 }}>
                  <Text style={styles.inputheading}>Time</Text>
                  <CustomDateInputWithIcon
                    placeholder="09:00"
                    icon="time-outline"
                    onSelectedTimeChange={handleSelectedTime}
                    mode="time"
                    defaultTime={time}
                  />
                </View>
              </View>

              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Tags</Text>
                <CustomInputTags
                  addTag={handleAddTag}
                  removeTag={handleRemoveTag}
                  defaultTags={tags}
                />
                <Text style={styles.underheading}>
                  This helps your listing reach more people
                </Text>
              </View>
              <View style={{ marginTop: SIZES.base }}>
                <Text style={styles.inputheading}>Event Images</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {images &&
                    images.map((image, index) => (
                      <View key={index} style={{ position: "relative" }}>
                        <Image
                          source={
                            image
                              ? { uri: `${URLBASE.imageBaseUrl}${image}` }
                              : placeholder
                          }
                          style={{
                            width: SIZES.base10,
                            height: SIZES.base10,
                            backgroundColor: COLORS.gray4,
                            borderRadius: SIZES.base,
                            alignItems: "center",
                            justifyContent: "center",
                            margin: SIZES.base,
                          }}
                        />
                        {/* <TouchableOpacity
                          onPress={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: SIZES.thickness,
                            right: SIZES.thickness,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.base,
                            padding: SIZES.base / 2,
                          }}
                        >
                          <AntDesign
                            name="close"
                            size={SIZES.base}
                            color={COLORS.gray3}
                          />
                        </TouchableOpacity> */}
                      </View>
                    ))}
                  {/* <TouchableOpacity onPress={uploadImages}>
                    <View
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: COLORS.gray4,
                        borderWidth: SIZES.thin,
                        margin: SIZES.base,
                      }}
                    >
                      <AntDesign
                        name="picture"
                        size={SIZES.base3}
                        color={COLORS.gray4}
                      />
                    </View>
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity onPress={uploadImages}>
                    <View
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: COLORS.gray4,
                        borderWidth: SIZES.thin,
                        margin: SIZES.base,
                      }}
                    >
                      <AntDesign
                        name="picture"
                        size={SIZES.base3}
                        color={COLORS.gray4}
                      />
                    </View>
                  </TouchableOpacity> */}
                </View>
              </View>

              <LoadingOverlay visible={loadingupdatelisting} />

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: SIZES.base,
                  marginTop: SIZES.base3,
                }}
              >
                <CustomButton
                  text={"Update Listing"}
                  onPress={handleUpdateEvent}
                  fill={true}
                />
                <CustomButton
                  text={"Back"}
                  onPress={handleGoBack}
                  fill={false}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base8,
  },
  header: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
  subheading: {
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  inputheading: {
    color: COLORS.gray3,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  underheading: {
    color: COLORS.gray3,
    ...FONTS.body4,
    marginTop: SIZES.thickness,
    lineHeight: SIZES.base2,
  },
});
