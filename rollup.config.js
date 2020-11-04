import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
    input: "src/bundle.js",
    output: {
        file: "dist/bundle.js",
        format: "umd",
        name: "UiModals",
        plugins: [terser()],
    },
    plugins: [
        postcss({
            extensions: [".scss"],
        }),
    ],
};
