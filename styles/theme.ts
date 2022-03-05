import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		brand: {
			orange: '#F68B0A',
			blue: '#266DD3',
			green: '#BAD858',
		},

		brandBlue: {
			100: '#bed4f3',
			200: '#93b7ec',
			300: '#689be4',
			400: '#3d7edc',
			500: '#266DD3',
			600: '#1b4e97',
			700: '#13386c',
			800: '#13386c',
			900: '#040b16',
		},

		principal: {
			100: '#fef3e6',
			200: '#fcdcb5',
			300: '#fac584',
			400: '#f9ad53',
			500: '#BAD858',
			600: '#ac6106',
			700: '#7b4505',
			800: '#190e01',
			900: '#190e01',
		},

		brandGreen: {
			100: '#f6faea',
			200: '#e5f1c1',
			300: '#d4e798',
			400: '#c3dd6e',
			500: '#BAD858',
			600: '#779122',
			700: '#556718',
			800: '#333e0e',
			900: '#111505',
		},

		neutral: {
			100: '#191919',
			200: '#212121',
			300: '#39393A',
			400: '#6B6B6B',
			500: '#C4C4C4',
		},
	},
	fonts: {
		heading: 'Inter',
		body: 'Inter',
	},
	components: {
		Button: {
			baseStyle: {
				boxShadow: 'none',
				'&:focus': {
					boxShadow: 'none',
				},
			},
		},
	},
});

export default theme;
