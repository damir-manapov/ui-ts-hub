module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.(ts|js)'
  ],
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx'],
};
