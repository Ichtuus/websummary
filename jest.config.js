export default {
	transform: {
		'^.+\\.svelte$': [
			'svelte-jester',
			{
				preprocess: true
			}
		],
		'^.+\\.ts$': [
			'ts-jest',
			{
				useESM: true
				// optional: seperate tsconfig for tests
				//"tsconfig": "tsconfig.spec.json",
			}
		]
	},
	moduleFileExtensions: ['js', 'ts', 'svelte'],
	extensionsToTreatAsEsm: ['.svelte', '.ts'],
	transformIgnorePatterns: ['/node_modules/(?!@testing-library/svelte/)'],
	moduleFileExtensions: ['js', 'svelte'],
	extensionsToTreatAsEsm: ['.svelte'],
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
};
