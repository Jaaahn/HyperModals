import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: "src/bundle.js",
    output: [
        {
            file: "dist/hyper-modals.min.js",
            format: "umd",
            name: "HyperModals",
            plugins: [terser()],
        },
        {
            file: "dist/hyper-modals.es.js",
            format: "es",
            name: "HyperModals",
        },
    ],
    plugins: [
        postcss({
            extensions: [".scss"],
        }),
        nodeResolve(),
    ],
};
