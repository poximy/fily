import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/icon?family=Material+Icons'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone'
						rel='stylesheet'
					/>
				</Head>
				<body>
					{/* Make Color mode to persists when you refresh the page. */}
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
