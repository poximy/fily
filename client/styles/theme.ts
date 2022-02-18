import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		principal: {
			orange: '#F68B0A',
			blue: '#266DD3',
			green: '#BAD858',
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
});

export default theme;
