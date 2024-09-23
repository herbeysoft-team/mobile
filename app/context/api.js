import axios from "axios";
import { getItem } from "../utils/asyncStorage.js";


const API = axios.create({
  //baseURL: "http://192.168.1.197:8002/",
  //baseURL: "http://172.20.10.3:8002/",
  baseURL: "https://herbeysoft.com/"
 
});

API.interceptors.request.use(async (req) => {
  const token = await getItem("trowmarttoken")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  // Set Content-Type for FormData requests
  if (req.data instanceof FormData) {
    req.headers['Content-Type'] = 'multipart/form-data';
  }
  return req;
});

/**AUTHENTICATION API */
export const login = (user) => API.post("/api/v1/auth/login", user); //sign in for all users
export const register = (user) => API.post("/api/v1/auth/signup", user); //register users
export const logout = () => API.post("/api/v1/auth/logout"); //logout the user
export const resendOTP = (user) =>
  API.post("/api/v1/auth/emailotp", user); //request for new OTP
export const verifyOTP = (user) =>
  API.post("/api/v1/auth/verifyemailotp", user); //verify email with OTP
export const resetPasswordOTP = (user) =>
  API.post("/api/v1/auth/passwordreset", user); //request for OTP to reset passowrd
export const resetPassword = (user) =>
  API.post("/api/v1/auth/reset", user); //reset passowrd
export const completeReg = (formData) =>
  API.post("/api/v1/auth/completeregbusiness", formData); //complete Reg
export const completeRegIndividual = (formData) =>
  API.post("/api/v1/auth/completeregindividual", formData); //complete Reg


/**USER API */
export const getUserProfile = (userId) => API.get(`/api/v1/user/getuserprofile/${userId}`); //get user profile
export const updateProfile = (formData) => API.put(`/api/v1/user/updateuserprofile`,formData); //update profile
export const updateProfileLocation = (formData) => API.put(`/api/v1/user/updateuserlocation`,formData); //update profile location
export const updateProfilePic = (formData) => API.post(`api/v1/user/changeprofilepic`,formData); //update profile Pic
export const submitVerification = (formData) => API.post(`api/v1/user/submitverification`, formData); //submit verification
export const increaseprofileviews = (id) => API.post(`/api/v1/user/incrementprofileviews/${id}`); //increase profile views
export const getuseranalytics = (period) => API.get(`/api/v1/user/getuseranalytics/${period}`); //Get user analytics


/** LISTING API */
export const uploadPhotos = (formData) => API.post(`/api/v1/listing/uploadimages/`, formData); //upload Photos
export const addListing = (formData) => API.post(`/api/v1/listing/addlisting/`, formData); //Add A Listing
export const addProductListing = (formData) => API.post(`/api/v1/listing/addproductlisting/`, formData); //Add A Product Listing
export const getListingsByLocation = (longitude, latitude, listingSelectedDistance) => API.get(`/api/v1/listing/getlistingbylocation/${longitude}/${latitude}/${listingSelectedDistance}`) //Get listing by location
export const updateListing = (id, formData) => API.put(`/api/v1/listing/updatelisting/${id}`, formData); //Update A Listing
export const updateProductListing = (id, formData) => API.put(`/api/v1/listing/updateproductlisting/${id}`, formData); //Update A Product Listing
export const getSimilarListings= (id, longitude, latitude, listingSelectedDistance) => API.get(`/api/v1/listing/getsimilarlisting/${id}/${longitude}/${latitude}/${listingSelectedDistance}`) //Get Similar listing By Location
export const increaselistingviews = (id) => API.post(`/api/v1/listing/incrementlistingviews/${id}`); //increase listing views

/** CATEGORY API */
export const getCategory = (type) => API.get(`/api/v1/category/getallcategories/${type}`); //get subcategories

/** CART API */
export const addItemToCart= (formData) => API.post(`/api/v1/cart/addcart/`, formData); //add to cart
export const incrementCartItemQuantity= (formData) => API.post(`/api/v1/cart/incrementcartitem/`, formData); //increment cart  item
export const decrementCartItemQuantity= (formData) => API.post(`/api/v1/cart/decrementcartitem/`, formData); //decrement cart item
export const getUserCartItemsGroupedByVendor = (userId) => API.get(`/api/v1/vendor/getcartitems//${userId}`); //get user cart Item

/** VENDOR API */
export const getVendorHeader = (id) => API.get(`/api/v1/vendor/getvendorheader/${id}`); //get vendor header
export const getVendorDetails = (id, longitude, latitude) => API.get(`/api/v1/vendor/getvendordetails/${id}/${longitude}/${latitude}`); //get vendor details
export const getVendorListings = (id) => API.get(`/api/v1/vendor/getvendorlisting/${id}`); //get vendor listings
export const deleteVendorListing = (id) => API.delete(`/api/v1/listing/deletelisting/${id}`); //delete a listing
export const getVendorsByLocation = (longitude, latitude, selectedDistance) => API.get(`/api/v1/vendor/getvendorsbylocation/${longitude}/${latitude}/${selectedDistance}`) //Get Vendor by Location

/** MESSAGE API */
export const getChatList = (id) => API.get(`/api/v1/message/getchatlist/${id}`) //get user chatlist
export const getChatUser = (id) => API.get(`/api/v1/message/${id}`) //get chat user
export const getMessages = (senderId, recepientId) => API.get(`api/v1/message/getmessages/${senderId}/${recepientId}`) //get chat between two users
export const sendMessage = (content) => API.post(`api/v1/message/sendmessage`, content) //send message

/**REVIEW API */
export const addReview = (formData) => API.post(`/api/v1/review/addreview`, formData); //Add Review
export const getMyReviews = (userId) => API.get(`/api/v1/review/getuserreview/${userId}`); //Get all user review
export const getVendorReviews = (vendorId) => API.get(`/api/v1/review/getvendorreview/${vendorId}`); //Get vendor id
export const updateReview = (formData) => API.post(`/api/v1/review/editreview/`, formData); //Update A Review
export const deleteReview = (reviewId) => API.delete(`/api/v1/review/deletereview/${reviewId}`); //Delete A Review

// ORDER API
export const createOrder= (formData) => API.post(`/api/v1/order/createorder/`, formData); //create order
export const getOrderMade= (userId) => API.get(`/api/v1/order/getordermade/${userId}`); //get order made
export const getOrderDetails= (id) => API.get(`/api/v1/order/getorderdetails/${id}`); //get order details
export const getOrderRecieved= (userId) => API.get(`/api/v1/order/getorderreceived/${userId}`); //get order recieved
export const updateOrderStatus= (formData) => API.post(`/api/v1/order/updateorderstatus/`, formData); //update order status

// DELIVERY API
export const createDelivery= (formData) => API.post(`/api/v1/delivery/createdelivery`, formData); //create delivery
export const getDeliveryMade= (userId) => API.get(`/api/v1/delivery/getdeliverymade/${userId}`); //get delivery made


// TRANSACTION API
export const getAccountBalance = (id) => API.get(`/api/v1/transaction/getbalance/${id}`); //Get my balance
export const getTransactionsByUser = (id) => API.get(`/api/v1/transaction/gettransaction/${id}`); //Get my transaction
export const depositFund = (formData) => API.post(`/api/v1/transaction/createtransaction`, formData); //Deposit fund


// SUBSCRIPTION API
export const subscriptionPlan = (formData) => API.post(`/api/v1/subscription/subscribeplan`, formData); //Subscribe Plan
export const getSubscriptionPlan = () => API.get(`/api/v1/subscription/getsubscriptionplan`); //Get Subscription Plan

// NOTIFICATION API
export const getMyNotifications = (id) => API.get(`/api/v1/notification/getmynotification/${id}`); //Get my notiifcations