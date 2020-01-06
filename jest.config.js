module.exports = {
    preset: 'ts-jest',
    roots: [
        '<rootDir>/src'
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '@components/(.*)$': '<rootDir>/src/components/$1',
        '@config/(.*)$': '<rootDir>/src/config/$1',
        '@pages/(.*)$': '<rootDir>/src/pages/$1',
        '@services/(.*)$': '<rootDir>/src/services/$1',
        '@stores/(.*)$': '<rootDir>/src/stores/$1',
        '@themes/(.*)$': '<rootDir>/src/themes/$1',
        '@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json'
    ],
};
