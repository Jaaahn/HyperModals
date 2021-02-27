import postcss from "rollup-plugin-postcss";

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: "src/bundle.js",
    output: {
        file: "example/hyper-modals.dev.js",
        format: "umd",
        name: "HyperModals",
    },
    plugins: [
        postcss({
            extensions: [".scss"],
        }),
        nodeResolve(),
        serve({
            contentBase: ["./example"],
        }),
        livereload({
            watch: ["./example"],
            exts: ["html", "js", "scss"],
        }),
    ],
};
