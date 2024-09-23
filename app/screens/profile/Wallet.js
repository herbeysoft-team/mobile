import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import CustomButton from "../../components/auth/CustomButton";
import TransactionCard from "../../components/profile/TransactionCard";
import { paystackProps, Paystack } from "react-native-paystack-webview";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountBalance,
  getTransactionsByUser,
  depositFund,
} from "../../context/features/transactionSlice.js";
import moment from "moment";
import Toast from "react-native-toast-message";
import WalletInputModel from "../../components/profile/WalletInputModel";
import { getItem } from "../../utils/asyncStorage.js";
import { RefreshControl } from "react-native-gesture-handler";


export default function Wallet({ navigation }) {
  const dispatch = useDispatch();
  const [openWalletInputModal, setOpenWalletInputModal] = useState(false);
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  const [amount, setAmount] = useState("");
  const { userProfile } = useSelector((state) => state.user);
  const { balance, transaction } = useSelector((state) => state.transaction);
  const [refreshing, setRefreshing] = useState(false);

  const gotoWalletInputModel = () => {
    setOpenWalletInputModal(true);
  };
 
  const handleRefresh = () => {
    setRefreshing(true);
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        
        if (getId) {
          dispatch(getAccountBalance(getId));
          dispatch(getTransactionsByUser(getId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for refresh, remove this in your actual implementation
  };

  const handlePay = () => {
    if (amount && parseFloat(amount) > 0) {
      paystackWebViewRef.current.startTransaction();
    } else {
      Toast.show({
        type: "error",
        text1: "Please input amount",
      });
    }
  };

  // Format the balance
  const formattedBalance = (balance) =>
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(balance);

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        
        if (getId) {
          dispatch(getAccountBalance(getId));
          dispatch(getTransactionsByUser(getId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Wallet"} />
      <ScrollView 
          contentContainerStyle={{ flexGrow: 1 , marginBottom: SIZES.base10}}
          showsVerticalScrollIndicator={false} 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          >
      {/* Wallet Head */}
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,
          borderWidth: SIZES.thin,
          borderColor: COLORS.gray3,
          borderRadius: SIZES.base,
          paddingHorizontal: SIZES.base2,
          paddingVertical: SIZES.base4,
          backgroundColor: COLORS.secondary,
        }}
      >
        <Text style={{ ...FONTS.body4, color: COLORS.white }}>
          Trowmart Wallet Balance
        </Text>
        <Text
          style={{ ...FONTS.header, color: COLORS.white }}
        >{`₦${formattedBalance(balance)}`}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: SIZES.base,
          marginTop: SIZES.base3,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomButton
            text={"Top Up"}
            onPress={gotoWalletInputModel}
            fill={true}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton text={"Send Money"} onPress={()=>{}} fill={false} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: SIZES.base3 }}
      >
        <Text style={{ ...FONTS.h4, color: COLORS.black }}>
          Recent Transactions
        </Text>
        <View style={{ paddingVertical: SIZES.base3 }}>
          {transaction.length > 0 &&
            transaction.map((transact, index) => {
              return (
                <TransactionCard
                  key={transact.reference}
                  navigation={navigation}
                  date={transact.createdAt}
                  type={transact.type == "Deposit" ? "Top Up" : transact.type}
                  amount={transact.amount}
                  to={
                    transact.vendorBuyer == "null"
                      ? "Wallet"
                      : transact.vendorBuyer
                  }
                  status={transact.status}
                  reference={transact.reference}
                />
              );
            })}
        </View>
      </ScrollView>
      <Paystack
        paystackKey="pk_test_e52e42c107480e08fd0cd3aa5c19fee0a84e7330"
        amount={amount}
        billingEmail={userProfile?.email}
        billingName={
          userProfile?.userType == "business"
            ? userProfile?.businessName
            : userProfile?.fullName
        }
        billingMobile={userProfile?.phoneNumber}
        activityIndicatorColor={COLORS.gray2}
        currency="NGN"
        onCancel={(e) => {
          // handle response here
          console.log(e);
          setOpenWalletInputModal(false);
          setAmount("");
        }}
        onSuccess={(res) => {
          // handle response here
          console.log(res);
          dispatch(
            depositFund({
              formData: {
                message: res?.transactionRef?.message,
                redirecturl: res?.transactionRef?.redirecturl,
                reference: res?.transactionRef?.reference,
                status: res?.transactionRef?.status,
                transaction: res?.transactionRef?.trans,
                type: "Deposit",
                amount: amount,
              },
            })
          );
          setOpenWalletInputModal(false);
          setAmount("");
          if(userProfile){
            dispatch(getAccountBalance(userProfile?._id));
            dispatch(getTransactionsByUser(userProfile?._id));
          } 
          setTimeout(() => {
            handleRefresh();
          }, 1000);       
        }}
        // autoStart={true}
        ref={paystackWebViewRef}
      />
      <WalletInputModel
        openWalletInputModal={openWalletInputModal}
        setOpenWalletInputModal={setOpenWalletInputModal}
        gotoWalletInputModel={gotoWalletInputModel}
        setAmount={setAmount}
        amount={amount}
        ButtonName={"Confirm Amount"}
        Heading={"Wallet Topup"}
        InputHeading={"Amount"}
        handlePay={handlePay}
      />
      </ScrollView>
    </SafeAreaView>
  );
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
