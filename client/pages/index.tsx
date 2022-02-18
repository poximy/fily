import { Box, Button, Flex, HStack, useColorMode } from '@chakra-ui/react';
import ProductCard from '@components/product/ProductCard';
import { NextPage } from 'next';
import MainLayout from 'app/layouts/Main';
import Chip from '@components/Chip';

interface Props {
	products: Product[] | null;
}

const Home: NextPage<Props> = ({ products }) => {
	const { toggleColorMode } = useColorMode();

	return (
		<MainLayout>
			<Flex
				gap={3}
				mt={1}
				overflow='auto'
				py={2}
				px={2}
			>
				<Chip onClick={toggleColorMode}>Change Color Mode</Chip>
				<Chip>CAtegory 2</Chip>
				<Chip>CAtegory 3</Chip>
				<Chip>CAtegory 3</Chip>
				<Chip>CAtegory 3</Chip>
				<Chip>CAtegory 3</Chip>
				<Chip>CAtegory 3</Chip>
			</Flex>
			<Flex direction='column' gap={3} padding={3}>
				{products &&
					products.map(product => (
						<ProductCard key={product.name} {...product} />
					))}
			</Flex>
		</MainLayout>
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
