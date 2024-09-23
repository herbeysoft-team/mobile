import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/authSlice'
import UserReducer from './features/userSlice'
import CategoryReducer from './features/categorySlice'
import ListingReducer from './features/listingSlice'
import VendorReducer from './features/vendorSlice'
import MessageReducer from './features/messageSlice'
import ReviewReducer from './features/reviewSlice'
import MapReducer from './features/mapSlice'
import CartReducer from './features/cartSlice'
import OrderReducer from './features/orderSlice'
import DeliveryReducer from './features/deliverySlice'
import TransactionReducer from './features/transactionSlice'
import SubscriptionReducer from './features/subscriptionSlice'
import NotificationReducer from './features/notificationSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    category: CategoryReducer,
    listing: ListingReducer,
    vendor: VendorReducer,
    message: MessageReducer,
    review: ReviewReducer,
    map: MapReducer,
    cart: CartReducer,
    order: OrderReducer,
    delivery: DeliveryReducer,
    transaction: TransactionReducer,
    subscription: SubscriptionReducer,
    notification: NotificationReducer
  }
});