import path from "path";
import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    resolve: {
        alias: {
            "$lib": path.resolve(__dirname, "./src/lib"),
        },
    },
    plugins: [glsl()],
});