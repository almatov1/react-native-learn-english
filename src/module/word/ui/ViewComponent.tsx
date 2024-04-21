import TemplateConfig from "../../../core/config/TemplateConfig";
import ModalComponent from "../../shared/ui/ModalComponent";
import TextComponent from "../../shared/ui/TextComponent";

const ViewComponent = ({ open, onDismiss, word }: { open: boolean; onDismiss: any; word: string }) => {
    return (
        <ModalComponent open={open} onDismiss={onDismiss}>
            <TextComponent
                size={TemplateConfig.extraLargeFontSize}
                weight={TemplateConfig.heavyText}
            >
                {word}
            </TextComponent>
        </ModalComponent>
    );
}

export default ViewComponent;