import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeComponent from '../../module/home/ui/HomeComponent';
import WordComponent from '../../module/word/ui/WordComponent';
import ApplicationConfig from '../config/ApplicationConfig';
import { RootStackParamList } from './RouteParams';
import { Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import NotifyComponent from '../../module/word/ui/NotifyComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RouteConfig = () => {
    // reset
    const [reset, setReset] = useState(false);
    async function execReset() {
        await AsyncStorage.setItem('words', '0');
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
                    component={HomeComponent}
                    options={{
                        title: ApplicationConfig.applicationName,
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                execReset();
                                setReset(true);
                            }}>
                                <Image source={require('../../../assets/image/home/reset.png')} style={{
                                    width: 21,
                                    height: 21,
                                    resizeMode: 'cover'
                                }} />
                            </TouchableOpacity>
                        )
                    }}
                />
                <Stack.Screen
                    name="Word"
                    component={WordComponent}
                    options={{ title: "Изучить новое слово" }}
                />
            </Stack.Navigator>
            <NotifyComponent open={reset} onDismiss={() => setReset(false)} value="Успешно сброшено" />
        </NavigationContainer>
    );
}

export default RouteConfig;