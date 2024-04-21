import { Button, Pressable } from "react-native";
import TemplateConfig from "../../../core/config/TemplateConfig";
import TextComponent from "./TextComponent";

const ButtonComponent = ({ children, onPress, size, weight = TemplateConfig.heavyText, color = TemplateConfig.whiteColor, backgroundColor }: { children: string; onPress: any; size?: number; weight?: number; color?: string; backgroundColor?: string }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: backgroundColor ?? TemplateConfig.blueColor,
                paddingVertical: TemplateConfig.padding,
                borderRadius: TemplateConfig.radius,
                alignItems: 'center',
                width: '100%'
            }}
        >
            <TextComponent
                size={size}
                weight={weight}
                color={color}
            >
                {children}
            </TextComponent>
        </Pressable>
    );
}

export default ButtonComponent;