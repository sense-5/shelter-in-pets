import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./client/screens/loginScreen";
import DashboardScreen from "./client/screens/dashboardScreen";
import AuthLoadingScreen from "./client/screens/authLoadingScreen";

const BeforeSignin = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Login"
  }
);

const AfterSignin = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Dashboard"
  }
);

const AppNavigator = createStackNavigator(
  {
    Auth: BeforeSignin,
    App: AfterSignin,
    AuthLoadingScreen: AuthLoadingScreen
  },
  {
    headerMode: "none",
    initialRouteName: "Auth"
  }
);

export default createAppContainer(AppNavigator);
