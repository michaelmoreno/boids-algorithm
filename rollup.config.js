import copy from 'rollup-plugin-copy'
import { uglify } from "rollup-plugin-uglify";
import scss from 'rollup-plugin-scss';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist/' },
      ]
    }),
    uglify(),
    scss(),
  ]
};