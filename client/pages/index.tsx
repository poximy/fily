import { Box, Button, Flex } from '@chakra-ui/react';
import ProductCard from '@components/product/ProductCard';
import Nav from '@components/Nav'
import { NextPage } from 'next';

interface Props {
	products: Product[] | null;
}

const Home: NextPage<Props> = ({ products }) => {
	return (
		<Box pos='fixed' w='100vw' h='100vh' bg='#EEE'>
			<Nav />
			<Flex
				gap={3}
				overflow='auto'
				css={{
					'::-webkit-scrollbar': { display: 'none' },
				}}
			>
				{products &&
					products.map(product => (
						<ProductCard {...product}/>
					))}
			</Flex>
		</Box>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const products: Product[] = [
		{
			name: 'PS5 Spiderman edition',
			currentBid: 1400,
		},
		{
			name: 'Tickets BadBunny',
			currentBid: 800,
		},
		{
			name: 'Tenis Yeeze 300 Boost',
			currentBid: 400,
		},
		{
			name: 'Xbox Series S',
			currentBid: 720,
		},
		{
			name: 'RTX 3080ti',
			currentBid: 1320,
		},
		{
			name: 'Charizard Pokemon Card',
			currentBid: 22000,
		},
	];

	return {
		props: {
			products,
		},
	};
};
