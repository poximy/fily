import {
	Box,
	Flex,
	Grid,
	GridItem,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
	name: string;
	currentBid: number;
}

const ProductCard: FC<Props> = ({ name, currentBid }) => {
	const styleBg = useColorModeValue('white', 'neutral.200');

	return (
		<Grid
			templateColumns='100px 1fr 150px'
			justifyItems='center'
			paddingX={3}
			paddingY={3}
			rounded='md'
			overflow='hidden'
			bg={styleBg}
			boxShadow={[
				'-2px -2px 20px -15px rgba(0, 0, 0, 0.25)',
				' 2px -2px 20px -15px rgba(0, 0, 0, 0.25)',
				'0 3px 2px -1px rgba(0, 0, 0, 0.25)',
			].join(', ')}
		>
			<GridItem alignSelf='center'>
				<Box rounded='md' overflow='hidden' width='100px' height='100px'>
					<Image
						src='/placeholder.jpeg'
						alt='placeholder'
						width='100%'
						height='100%'
					/>
				</Box>
			</GridItem>
			<GridItem
				display='flex'
				flexDirection='column'
				justifySelf='flex-start'
				paddingLeft={2}
				paddingY={1}
			>
				<Box>
					<Text as='h3' fontSize='lg' fontWeight='bold'>
						{name}
					</Text>
				</Box>
				<Flex direction='column' paddingLeft={4} width='max-content'>
					<Flex align='center' justify='space-between' gap='1ch'>
						<Text fontSize='sm'>Puja actual:</Text>
						<Text as='span' color='principal.green'>
							$ {currentBid}
						</Text>
					</Flex>
					<Flex align='center' justify='space-between' gap='1ch'>
						<Text fontSize='sm'>Compra:</Text>
						<Text as='span' color='principal.orange'>
							$ {currentBid}
						</Text>
					</Flex>
				</Flex>
			</GridItem>
			<GridItem>CHART</GridItem>
		</Grid>
	);
};

export default ProductCard;
