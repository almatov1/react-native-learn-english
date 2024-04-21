import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Keyboard, View, Image, Pressable } from 'react-native';
import { RootStackParamList } from '../../../core/route/RouteParams';
import { CodeField } from 'react-native-confirmation-code-field';
import * as Speech from 'expo-speech';
import WrapperComponent from '../../shared/ui/WrapperComponent';
import TemplateConfig from '../../../core/config/TemplateConfig';
import TextComponent from '../../shared/ui/TextComponent';
import RetirementComponent from '../../shared/RetirementComponent';
import ButtonComponent from '../../shared/ui/ButtonComponent';
import ViewComponent from './ViewComponent';
import { Audio } from 'expo-av';

type WordComponentProps = NativeStackScreenProps<RootStackParamList, 'Word'>;
const WordComponent = ({ navigation }: WordComponentProps) => {
    // input
    const [word, setWord] = useState('');
    useEffect(() => {
        if (word.length === 5)
            if (word.toLowerCase() !== 'apple') {
                playError();
                setWord('');
            }
            else {
                playCorrent();
                Keyboard.dismiss();
            }
    }, [word]);

    // sound
    const speak = () => {
        Speech.speak("apple", {
            language: "en-GB"
        });
    };

    // modal
    const [modal, setModal] = useState(false);

    // sound
    async function playCorrent() {
        const { sound } = await Audio.Sound.createAsync(require('../../../../assets/sound/word/correct.mp3'));
        await sound.playAsync();
    }
    async function playError() {
        const { sound } = await Audio.Sound.createAsync(require('../../../../assets/sound/word/error.mp3'));
        await sound.playAsync();
    }

    // widgets
    const SpeakBlock = () => {
        return (
            <Pressable onPress={speak}>
                <View style={{
                    backgroundColor: TemplateConfig.blueColor,
                    borderRadius: TemplateConfig.radius,
                    paddingVertical: TemplateConfig.padding,
                    alignItems: 'center'
                }}>
                    <TextComponent color={TemplateConfig.whiteColor} weight={TemplateConfig.semiboldText}>
                        Нажмите, чтобы прослушать новое слово
                    </TextComponent>
                    <RetirementComponent />
                    <Image source={require('../../../../assets/image/word/sound.png')} style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'cover'
                    }} />
                </View>
            </Pressable>
        )
    }
    const InfoBlock = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <Pressable onPress={() => setModal(true)}>
                    <Image source={require('../../../../assets/image/word/info.png')} style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'cover'
                    }} />
                </Pressable>
                <View style={{ alignItems: 'center' }}>
                    <TextComponent size={TemplateConfig.extraLargeFontSize} weight={TemplateConfig.semiboldText}>Перевод слова:</TextComponent>
                    <RetirementComponent />
                    <TextComponent size={TemplateConfig.largeFontSize} >Яблоко</TextComponent>
                </View>
            </View>
        );
    }
    const BottomBlock = () => {
        return (
            <View>
                <ButtonComponent backgroundColor={TemplateConfig.pinkColor} onPress={() => console.log("next")}>
                    Пропустить слово
                </ButtonComponent>
                <ViewComponent open={modal} onDismiss={() => setModal(false)} word="apple" />
            </View>
        );
    }

    return (
        <WrapperComponent>
            <SpeakBlock />
            <InfoBlock />
            <View style={{
                alignItems: 'center'
            }}>
                <TextComponent size={TemplateConfig.largeFontSize}>
                    Введите изученное слово
                </TextComponent>
                <RetirementComponent />
                <View style={{
                    width: '100%'
                }}>
                    <CodeField
                        rootStyle={{
                            marginHorizontal: 10
                        }}
                        value={word}
                        onChangeText={setWord}
                        textContentType="name"
                        cellCount={5}
                        keyboardType="default"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                key={index}
                                style={{
                                    borderColor: isFocused ? TemplateConfig.blueColor : symbol.length === 0 ? TemplateConfig.redColor : TemplateConfig.greenColor,
                                    borderBottomWidth: 2,
                                    paddingBottom: 10,
                                    width: 250 / 5,
                                    alignItems: 'center'
                                }}
                            >
                                <TextComponent>
                                    {symbol}
                                </TextComponent>
                            </View>
                        )}
                    />
                </View>
            </View>
            <RetirementComponent />
            <BottomBlock />
        </WrapperComponent >
    );
}

export default WordComponent;