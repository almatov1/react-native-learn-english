import { View } from 'react-native';

const RetirementComponent = ({ size = 20 }: { size?: number }) => {
    return <View style={{ width: size, height: size }} />
}

export default RetirementComponent;