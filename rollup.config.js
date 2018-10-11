import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

export default {
  input: 'esm5/index.js',
  output: [{
    file: 'fesm5/mif-runtime.js',
    format: 'es',
    sourcemap: true,
  }, {
    file: 'bundles/mif-runtime.umd.js',
    format: 'umd',
    name: 'mif.runtime',
    sourcemap: true,
  }],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    replace({
      'process': `undefined`
    }),
  ],
}
