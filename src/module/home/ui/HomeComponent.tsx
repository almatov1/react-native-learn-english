import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { View, Image, SafeAreaView, Animated } from 'react-native';
import storage from '../../../core/config/StorageConfig';
import TemplateConfig from '../../../core/config/TemplateConfig';
import { RootStackParamList } from '../../../core/route/RouteParams';
import ButtonComponent from '../../shared/ui/ButtonComponent';
import TextComponent from '../../shared/ui/TextComponent';
import WrapperComponent from '../../shared/ui/WrapperComponent';

type HomeComponentProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeComponent = ({ navigation }: HomeComponentProps) => {
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
                <Image source={require('../../../../assets/image/home/cat.jpg')} style={{
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
            { label: "Слова уровня Beginner", value: "650" },
            { label: "Слова уровня Intermediate", value: "340" },
            { label: "Слова уровня Advanced", value: "120" },
            { label: "Изучено", value: "0" }
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
            {/* <Button
                onPress={() => storage.save({
                    key: 'xyz',
                    data: {
                        text: 'hello'
                    }
                })}
                title="Save Store"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => storage
                    .load({
                        key: 'xyz'
                    })
                    .then(ret => {
                        alert(`${ret.text} TUPOI`)
                    })}
                title="Shoe Store"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            /> */}
        </WrapperComponent>
    )
};
export default HomeComponent;