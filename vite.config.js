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
    sourcemap: true,
    rollupOptions: {
      plugins: [
        obfuscator({
          globalOptions: {
            optionsPreset: 'high-obfuscation',
            compact: true,
            simplify: true,
            target: 'browser',
            selfDefending: false,
            deadCodeInjection: false,
            domainLock: [],
            domainLockRedirectUrl: 'https://farid.cyou',
            stringArrayEncoding: ['base64'],
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
            numbersToExpressions: true,
            shuffleStringArray: true,
            splitStrings: true,
            stringArrayThreshold: 1,
            identifierNamesGenerator: 'hexadecimal',
            debugProtection: false,
            debugProtectionInterval: 0,
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
