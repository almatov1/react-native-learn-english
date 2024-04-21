import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WrapperComponent = ({ children }: { children: ReactNode[] }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    );
}

export default WrapperComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 10
    },
});