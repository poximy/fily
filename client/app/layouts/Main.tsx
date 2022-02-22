import { Box, Grid, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import Nav from '@components/Nav';
import * as React from 'react';

interface IMainLayoutProps {
	children: React.ReactNode | React.ReactNode[];
}

const MainLayout: React.FunctionComponent<IMainLayoutProps> = ({
	children,
	...props
}) => {
	const [isMobile] = useMediaQuery('(max-width: 768px)');
	const styleBg = useColorModeValue('#FEFEFE', 'neutral.100');

	return (
		<>
			{isMobile ? (
				<Grid
					templateColumns='1fr'
					templateRows='1fr auto'
					pos='fixed'
					inset={0}
					bg={styleBg}
				>
					<Box
						overflow='auto'
						// height='100%'
						maxHeight='100%'
						mb='1px'
						css={{
							'::-webkit-scrollbar': { display: 'none' },
							'& ::-webkit-scrollbar': {
								width: '0px',
								height: '0px',
								backgroundColor: 'transparent',
							},
							'& ::-webkit-scrollbar-thumb': {
								backgroundColor: 'gray',
								borderRadius: '50px',
							},
						}}
					>
						{children}
					</Box>
					<Nav activeTab='trending' />
				</Grid>
			) : (
				<>A</>
			)}
		</>
	);
};

export default MainLayout;
