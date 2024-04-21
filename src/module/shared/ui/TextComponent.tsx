import { Text } from "react-native";
import TemplateConfig from "../../../core/config/TemplateConfig";

const TextComponent = ({ children, size, weight, color }: { children: string; size?: number; weight?: number; color?: string }) => {
    return (
        <Text
            style={{
                fontSize: size ?? TemplateConfig.mediumFontSize,
                fontWeight: (weight ?? TemplateConfig.regularText.toString()) as "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined,
                color: color ?? TemplateConfig.blackColor
            }}
        >
            {children}
        </Text>
    );
}

export default TextComponent;