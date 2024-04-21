import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeComponent from '../../module/home/ui/HomeComponent';
import WordComponent from '../../module/word/ui/WordComponent';
import ApplicationConfig from '../config/ApplicationConfig';
import { RootStackParamList } from './RouteParams';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RouteConfig = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
                    component={HomeComponent}
                    options={{ title: ApplicationConfig.applicationName }}
                />
                <Stack.Screen
                    name="Word"
                    component={WordComponent}
                    options={{ title: "Изучить новое слово" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RouteConfig;