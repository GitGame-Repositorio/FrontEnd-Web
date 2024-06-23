// import tailwindTheme from "tailwindcss/defaultTheme";
import tailwindTheme from "../../tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindTheme);

export default fullConfig.theme;
