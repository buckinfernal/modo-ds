import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['src/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'modo',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      prefix: 'modo',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
          options: { outputReferences: true }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'index.mjs',
          format: 'javascript/es6'
        },
        {
          destination: 'index.js',
          format: 'javascript/module-flat'
        }
      ]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    }
  }
});

await sd.buildAllPlatforms();
console.log('✅ Tokens built successfully');
