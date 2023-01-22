import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import obfuscator from 'rollup-plugin-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  publicDir: '../public',
  envDir: '../',
  build: {
    minify: 'terser',
    outDir: '../dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      plugins: [
        obfuscator({
          globalOptions: {
            compact: true,
            simplify: true,
            target: 'browser',
            controlFlowFlattening: false,
            deadCodeInjection: false,
            debugProtection: false,
            debugProtectionInterval: 0,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: false,
            renameGlobals: false,
            selfDefending: false,
            splitStrings: false,
            stringArray: true,
            stringArrayCallsTransform: false,
            stringArrayEncoding: ['base64'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 2,
            stringArrayWrappersType: 'variable',
            stringArrayThreshold: 0.75,
            unicodeEscapeSequence: false,
          },
        }),
      ],
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
