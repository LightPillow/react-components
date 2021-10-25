import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'ReactDatafyComponents',
      exports: 'named',
      globals: { react: 'React' }
    }
  ],
  external: ['react', 'dayjs'],
  plugins: [
    typescript({
      tsconfig: `${process.cwd()}/tsconfig.json`,
      tsconfigOverride: { exclude: ['**/__tests__'] }
    })
  ]
}
