import "react-native-gesture-handler";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EventRegister from "./(tabs)/EventRegister";
import About from "./(tabs)/About";
import Login from "./(tabs)/Login";
import { useState } from "react";
import IncidentViewing from "./(tabs)/IncidentViewing";
import Emergency from "./(tabs)/Emergency";
import CollegeById from "./(tabs)/CollegeById";
import LogVisit from "./(tabs)/LogVisit";
import RegisteredVisits from "./(tabs)/RegisteredVisits";
import CollegeVisitsMap from "./(tabs)/CollegeVisits";
import NewsScreen from "./(tabs)/News";
import HoroscopeScreen from "./(tabs)/HoroscopeScreen";
import WeatherScreen from "./(tabs)/WeatherScreen";
import SignOutScreen from "./(tabs)/SignOutScreen";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Drawer = createDrawerNavigator();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider value={DefaultTheme}>
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="Login">
          {!isAuthenticated && (
            <Drawer.Screen
              name="Login"
              component={() => <Login onLogin={handleLogin} />}
              options={{ headerShown: false }}
            />
          )}
          {isAuthenticated && (
            <>
              <Drawer.Screen name="Registrar incidentes" component={EventRegister} />
              <Drawer.Screen name="Sobre mi" component={About} />
              <Drawer.Screen name="Ver incidente" component={IncidentViewing} />
              <Drawer.Screen name="SEGURIDAD" component={Emergency} />
              <Drawer.Screen name="Colegio por ID" component={CollegeById} />
              <Drawer.Screen name="Registrar visita" component={LogVisit} />
              <Drawer.Screen name="Mis visitas" component={RegisteredVisits} />
              <Drawer.Screen name="Mapa de mis visitas" component={CollegeVisitsMap} />
              <Drawer.Screen name="Noticias MINERD" component={NewsScreen} />
              <Drawer.Screen name="Clima" component={WeatherScreen} />
              <Drawer.Screen name="Horoscopo" component={HoroscopeScreen} />
              <Drawer.Screen
                name="Sign Out"
                component={() => <SignOutScreen onSignOut={handleSignOut} />}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
