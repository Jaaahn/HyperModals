import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
    input: "src/bundle.js",
    output: [
        {
            file: "dist/bundle.min.js",
            format: "umd",
            name: "UiModals",
            plugins: [terser()],
        },
        {
            file: "dist/bundle.es.js",
            format: "es",
            name: "UiModals",
        },
    ],
    plugins: [
        postcss({
            extensions: [".scss"],
        }),
    ],
};
