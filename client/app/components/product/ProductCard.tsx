import { Stack, Flex, Box, Text }  from '@chakra-ui/react'
import Image from 'next/image';
import { FC } from 'react';

interface Props {
	name: string;
	currentBid: number;
}

const ProductCard: FC<Props> = ({ name, currentBid }) => {
	return (
						<Stack
							key={name}
							shadow='md'
							rounded='md'
							padding={2}
							margin={2}
							width='min-content'
							gap={2}
							bg='white'
							justify='space-between'
						>
							<Flex direction='column'>
								<Box
									mx='auto'
									w='200px'
									h='200px'
									overflow='hidden'
									rounded='sm'
									mb={3}
								>
									<Image
										src='/placeholder.jpeg'
										alt={name}
										width={200}
										height={200}
										layout='fixed'
									/>
								</Box>

								<Text mt={0} fontWeight='bold' fontSize='xl'>
									{name}
								</Text>
							</Flex>
							<Flex direction='column'>
								<Text color='GrayText'>Puja actual</Text>
								<Text fontWeight='bold' fontSize='lg'>
									$ {currentBid}
								</Text>
							</Flex>
						</Stack>
	);
};

export default ProductCard;
