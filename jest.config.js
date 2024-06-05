// module.exports = {
//     preset: 'ts-jest',
//     collectCoverage: true,
//     coverageDirectory: 'coverage',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'css', 'json'],
//     moduleNameMapper: {
//         '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
//     },
//     moduleDirectories: ['node_modules', 'src'],
//     transform: {
//         '^.+\\.(css)$': 'jest-css-modules',
//         '^.+\\.(ts|tsx)$': 'ts-jest',
//     },
// }

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
