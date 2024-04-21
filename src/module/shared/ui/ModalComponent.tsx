import { ReactNode } from "react";
import { Modal, View } from "react-native";
import TemplateConfig from "../../../core/config/TemplateConfig";
import RetirementComponent from "../RetirementComponent";
import ButtonComponent from "./ButtonComponent";

const ModalComponent = ({ open, onDismiss, children }: { open: boolean; onDismiss: any; children: ReactNode }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={open}
            onRequestClose={onDismiss}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: TemplateConfig.extraPadding,
                alignItems: 'center'
            }}>
                {children}
                <RetirementComponent />
                <ButtonComponent onPress={onDismiss}>
                    Закрыть
                </ButtonComponent>
            </View>
        </Modal>
    );
}

export default ModalComponent;