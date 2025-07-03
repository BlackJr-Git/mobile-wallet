/* eslint-disable import/namespace */
import { icons } from "lucide-react-native";

interface IconProps {
  name: keyof typeof icons; // restricts to valid icon names
  color?: string;
  fill?: string;
  size?: number;
}

const Icon = ({ name, color, fill = undefined, size }: IconProps) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    return null; // or render a default icon
  }
  return <LucideIcon color={color} size={size} />;
};

export default Icon;
