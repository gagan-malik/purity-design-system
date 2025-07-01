import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from "rollup-plugin-copy";
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');


const rollupConfig = [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: false,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: false,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss({
                config: {
                    path: './postcss.config.js',
                },
                extensions: ['.css'],
                minimize: true,
                inject: {
                    insertAt: 'top',
                },
            }),
            copy({
                targets: [
                    {
                        src: "./tailwind.config.js",
                        dest: "dist",
                    },
                    {
                        src: "src/assets",
                        dest: "dist",
                    }
                ]
            }),
            image({ exclude: 'node_modules' })

        ],
        external: ['react', 'react-dom'],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'ems' }],
        plugins: [dts()],
        external: [/\.css$/],
    }
];

export default rollupConfig