import TemplateConfig from "../../../core/config/TemplateConfig";
import ModalComponent from "../../shared/ui/ModalComponent";
import TextComponent from "../../shared/ui/TextComponent";

const NotifyComponent = ({ open, onDismiss, value, color = TemplateConfig.blackColor }: { open: boolean; onDismiss: any; value: string; color?: string }) => {
    return (
        <ModalComponent open={open} onDismiss={onDismiss}>
            <TextComponent
                size={TemplateConfig.extraLargeFontSize}
                weight={TemplateConfig.heavyText}
                color={color}
            >
                {value}
            </TextComponent>
        </ModalComponent>
    );
}

export default NotifyComponent;