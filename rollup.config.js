import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/bundle.js",
    output: {
        file: "dist/bundle.js",
        format: "umd",
        name: "UiModals",
        plugins: [terser()],
    },
    plugins: [scss()],
};
