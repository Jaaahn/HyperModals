import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: "src/bundle.js",
    output: {
        file: "dist/bundle.min.js",
        format: "umd",
        name: "UiModals",
        plugins: [terser()],
    },
    plugins: [
        postcss({
            extensions: [".scss"],
        }),
        nodeResolve(),
    ],
};
