import "react-native-gesture-handler";
import {
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EventRegister from "./EventRegister";
import About from "./About";

const MainMenu = () => {

  const Drawer = createDrawerNavigator();

  return (
    <ThemeProvider value={DefaultTheme}>
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="Registro de Incidencias">
          <Drawer.Screen name="Registro de Incidencias" component={EventRegister} />
          <Drawer.Screen name="Acerca de" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
 export default MainMenu;