import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Keyboard, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../../core/route/RouteParams';
import { CodeField } from 'react-native-confirmation-code-field';
import * as Speech from 'expo-speech';
import WrapperComponent from '../../shared/ui/WrapperComponent';
import TemplateConfig from '../../../core/config/TemplateConfig';
import TextComponent from '../../shared/ui/TextComponent';
import RetirementComponent from '../../shared/RetirementComponent';
import ButtonComponent from '../../shared/ui/ButtonComponent';
import { Audio } from 'expo-av';
import NotifyComponent from './NotifyComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApplicationConfig from '../../../core/config/ApplicationConfig';

type WordComponentProps = NativeStackScreenProps<RootStackParamList, 'Word'>;
const WordComponent = ({ navigation }: WordComponentProps) => {
    // init
    const [hidedWord, setHidedWord] = useState(ApplicationConfig.beginnerWords[0]);
    useEffect(() => {
        findNewWord();
    }, []);
    async function findNewWord() {
        const value = await AsyncStorage.getItem('words');
        if (ApplicationConfig.allWords[Number(value)]) setHidedWord(ApplicationConfig.allWords[Number(value)]);
    }

    // input
    const [word, setWord] = useState('');
    useEffect(() => {
        async function saveItem() {
            const value = await AsyncStorage.getItem('words') ?? '0';
            await AsyncStorage.setItem('words', (Number(value) + 1).toString());
            await findNewWord();
            setWord('');
            setSuccessModal(true);
        }

        if (word.length === hidedWord.word.length)
            if (word.toLowerCase() !== hidedWord.word.toLowerCase()) {
                playError();
                setWord('');
            }
            else {
                Keyboard.dismiss();
                saveItem();
                playCorrent();
            }
    }, [word]);

    // sound
    const speak = () => {
        Speech.speak(hidedWord.word, {
            language: "en-GB"
        });
    };

    // modal
    const [modal, setModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

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
            <TouchableOpacity onPress={speak}>
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
            </TouchableOpacity>
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
                    <TextComponent size={TemplateConfig.largeFontSize} >{hidedWord.translate}</TextComponent>
                </View>
            </View>
        );
    }
    const BottomBlock = () => {
        return (
            <View>
                <ButtonComponent backgroundColor={TemplateConfig.pinkColor} onPress={() => navigation.navigate("Home")}>
                    Вернуться домой
                </ButtonComponent>
                <NotifyComponent open={modal} onDismiss={() => setModal(false)} value={hidedWord.word} />
                <NotifyComponent open={successModal} onDismiss={() => setSuccessModal(false)} value="Верно! +1" />
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
                        cellCount={hidedWord.word.length}
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