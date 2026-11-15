import { SvgXml } from "react-native-svg";
import { ILLUSTRATIONS } from "../illustrations";

export default function Illustration({ name, size = 240 }) {
  return <SvgXml xml={ILLUSTRATIONS[name]} width={size} height={size} />;
}
