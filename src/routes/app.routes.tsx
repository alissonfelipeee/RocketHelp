import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { RegisterOrder } from "../screens/RegisterOrder";
import { Profile } from "../screens/Profile";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Details" component={Details} />
      <Screen name="RegisterOrder" component={RegisterOrder} />
    </Navigator>
  );
}
