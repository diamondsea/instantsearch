import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const clear = (x) => x.filter(Boolean);

const version = process.env.VERSION || 'UNRELEASED';
const algolia = '© Algolia, inc.';
const link = 'https://github.com/algolia/instantsearch.js';
const createBanner = (name) =>
  `/*! React InstantSearch${name} ${version} | ${algolia} | ${link} */`;

const plugins = [
  babel({
    exclude: ['../../node_modules/**', 'node_modules/**'],
    extensions: ['.js', '.ts', '.tsx'],
    rootMode: 'upward',
    runtimeHelpers: true,
  }),
  resolve({
    browser: true,
    preferBuiltins: false,
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  }),
  commonjs({
    namedExports: {
      '../../node_modules/use-sync-external-store/shim/index.js': [
        'useSyncExternalStore',
      ],
    },
  }),
  globals(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  filesize({
    showMinifiedSize: false,
    showGzippedSize: true,
  }),
];

const createConfiguration = ({ name, minify = false } = {}) => ({
  input: 'src/index.ts',
  external: ['react'],
  output: {
    file: `dist/umd/ReactInstantSearch${name}${minify ? '.min' : ''}.js`,
    name: `ReactInstantSearch${name}`,
    format: 'umd',
    globals: {
      react: 'React',
    },
    banner: createBanner(name),
    sourcemap: true,
  },
  plugins: plugins.concat(
    clear([
      minify &&
        uglify({
          output: {
            preamble: createBanner(name),
          },
        }),
    ])
  ),
});

export default [
  createConfiguration({
    name: 'HooksDOM',
  }),

  createConfiguration({
    name: 'HooksDOM',
    minify: true,
  }),
];
