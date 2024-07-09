import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'node', // Set test environment to node
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['./jest.setup.ts'], // Add setup file for Prisma
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Include TypeScript extensions
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
};

export default config;
