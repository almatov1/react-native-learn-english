import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { View, Image, Animated } from 'react-native';
import ApplicationConfig from '../../../core/config/ApplicationConfig';
import TemplateConfig from '../../../core/config/TemplateConfig';
import { RootStackParamList } from '../../../core/route/RouteParams';
import ButtonComponent from '../../shared/ui/ButtonComponent';
import TextComponent from '../../shared/ui/TextComponent';
import WrapperComponent from '../../shared/ui/WrapperComponent';

type HomeComponentProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeComponent = ({ navigation }: HomeComponentProps) => {
    // learned words
    const [learned, setLearned] = useState('0');
    useFocusEffect(() => {
        async function loadStorage() {
            const value = await AsyncStorage.getItem('words');
            if (value) { setLearned(value); }
        }

        loadStorage();
    });

    // animate
    const value = useRef(new Animated.Value(0)).current;
    const animate = () => {
        Animated.sequence([
            Animated.timing(value, { toValue: -20, duration: 500, useNativeDriver: true }),
            Animated.timing(value, { toValue: 0, duration: 500, useNativeDriver: true })
        ]).start(animate);
    };
    useEffect(() => {
        animate();
    }, []);

    // widgets
    const HeaderBlock = () => {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <Image source={require('../../../../assets/image/home/cat.png')} style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'cover'
                }} />
                <TextComponent
                    size={TemplateConfig.extraLargeFontSize}
                    weight={TemplateConfig.mediumText}
                >
                    Изучай с нами английский!
                </TextComponent>
            </View>
        );
    }
    const InfoBlock = () => {
        const words = [
            { label: "Слова уровня Beginner", value: ApplicationConfig.beginnerWords.length.toString() },
            { label: "Слова уровня Intermediate", value: ApplicationConfig.intermediateWords.length.toString() },
            { label: "Слова уровня Advanced", value: ApplicationConfig.advancedWords.length.toString() },
            { label: "Изучено", value: learned }
        ]
        return (
            <View>
                {
                    words.map((field, index) =>
                        <View
                            key={index}
                            style={{
                                backgroundColor: index === words.length - 1 ? TemplateConfig.redColor : TemplateConfig.pinkColor,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: TemplateConfig.padding,
                                borderRadius: TemplateConfig.radius,
                                marginBottom: index !== words.length - 1 ? 10 : 0
                            }}
                        >
                            <TextComponent color={TemplateConfig.whiteColor}>{field.label}</TextComponent>
                            <TextComponent color={TemplateConfig.whiteColor} weight={TemplateConfig.heavyText}>{field.value}</TextComponent>
                        </View>
                    )
                }
            </View>
        );
    }
    const StartBlock = () => {
        return (
            <Animated.View style={{ transform: [{ translateY: value }] }}>
                <ButtonComponent onPress={() => navigation.navigate("Word")}>
                    Изучить новое слово
                </ButtonComponent>
            </Animated.View>
        );
    }

    return (
        <WrapperComponent>
            <HeaderBlock />
            <InfoBlock />
            <StartBlock />
        </WrapperComponent>
    )
};
export default HomeComponent;