import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      SignIn: undefined;
      SignUp: undefined;
      RegisterOrder: undefined;
      Profile: { user: FirebaseAuthTypes.User };
      Details: { orderId: string };
    }
  }
}
