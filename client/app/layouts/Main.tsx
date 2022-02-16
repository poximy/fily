import { Box, Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
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
				<Flex
					direction='column'
					pos='fixed'
					width='100vw'
					height='100vh'
					bg={styleBg}
				>
					<Box
						overflow='auto'
						height='100%'
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
				</Flex>
			) : (
				<>A</>
			)}
		</>
	);
};

export default MainLayout;
