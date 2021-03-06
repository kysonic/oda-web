module.exports = {
    preset: 'ts-jest',
    roots: [
        '<rootDir>/src',
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '@components/(.*)$': '<rootDir>/src/components/$1',
        '@config/(.*)$': '<rootDir>/src/config/$1',
        '@pages/(.*)$': '<rootDir>/src/pages/$1',
        '@services/(.*)$': '<rootDir>/src/services/$1',
        '@styles/(.*)$': '<rootDir>/src/styles/$1',
        '@utils/(.*)$': '<rootDir>/src/utils/$1',
        '@types/(.*)$': '<rootDir>/src/types/$1',
        '@svg/(.*)$': '<rootDir>/public/svg/$1',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json',
    ],
};
