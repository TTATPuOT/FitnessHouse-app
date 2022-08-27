module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				cwd: 'babelrc',
				extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
				alias: {
					'@src': './src',
					'@utils': './src/utils',
					'@screens': './src/screens',
					'@components': './src/components',
					'@slices': './src/slices',
					'@hooks': './src/hooks',
					'@selectors': './src/selectors',
				},
			},
		],
		'jest-hoist',
		'react-native-reanimated/plugin',
	],
}
