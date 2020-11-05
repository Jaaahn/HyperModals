import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
    input: "src/bundle.js",
    output: {
        file: "dist/bundle.js",
        format: "umd",
        name: "UiModals",
    },
    plugins: [
        postcss({
            extensions: [".scss"],
        }),
        nodeResolve(),
        serve({
            contentBase: ["./example", "./dist"],
        }),
        livereload({
            watch: ["./dist", "./example"],
            exts: ["html", "js", "scss"],
        }),
    ],
};
