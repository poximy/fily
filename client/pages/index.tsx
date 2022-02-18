import { Button, Collapse, Fade, Flex, useColorMode } from '@chakra-ui/react';
import ProductCard from '@components/product/ProductCard';
import { NextPage } from 'next';
import MainLayout from '@layouts/Main';
import Chip from '@components/Chip';
import { CategoriesString, IProduct } from '@typings/product';
import { useEffect, useMemo, useState } from 'react';

interface IProductWithRenderData extends IProduct {
	isDisappearing: boolean;
	isAppearing: boolean;
	dontRender: boolean;
}
interface Props {
	products: IProduct[] | null;
}

const Home: NextPage<Props> = ({ products }) => {
	const { toggleColorMode } = useColorMode();

	// Take all categories from every product,
	// make a unique list of them and sort them alphabetically
	const categories = useMemo(
		() =>
			products &&
			products
				.map(product => product.category)
				.filter((v, i, a) => a.indexOf(v) === i)
				.sort((a, b) =>
					a === 'other' || b === 'other' ? 1 : a.localeCompare(b),
				),
		[products],
	);

	const [selectedCategory, setSelectedCategory] =
		useState<CategoriesString | null>(null);

	const [productsToRender, setProductsToRender] = useState<IProduct[]>([]);
	const [productsToRenderWithData, setProductsToRenderWithData] = useState<
		IProductWithRenderData[]
	>([]);

	useEffect(() => {
		if (products === null) return;

		const oldProductsToRender = productsToRender;
		const newProductsToRender = products.filter(
			product =>
				product.category === selectedCategory || selectedCategory === null,
		);

		// Check if the products have changed to avoid a update loop
		if (
			newProductsToRender.length < oldProductsToRender.length
				? oldProductsToRender.every(
						(product, index) => newProductsToRender[index] === product,
				  )
				: newProductsToRender.every(
						(product, index) => oldProductsToRender[index] === product,
				  )
		)
			return;

		const productsToRenderWithData: IProductWithRenderData[] = products.map(
			product => {
				const isInOld =
					oldProductsToRender.find(
						oldProduct => oldProduct.id === product.id,
					) !== undefined;
				const isInNew =
					newProductsToRender.find(
						newProduct => newProduct.id === product.id,
					) !== undefined;

				return {
					...product,
					isDisappearing: isInOld && !isInNew,
					isAppearing: !isInOld && isInNew,
					dontRender: !isInOld && !isInNew,
				};
			},
		);

		// Update states
		setProductsToRender(newProductsToRender);
		setProductsToRenderWithData(productsToRenderWithData);
	}, [selectedCategory, products, productsToRender]);

	return (
		<MainLayout>
			<Button colorScheme='blue' onClick={toggleColorMode}>
				Toggle Color Mode
			</Button>
			<Flex gap={3} mt={1} overflow='auto' py={2} px={2}>
				{categories &&
					categories.map(category => (
						<Chip
							key={category}
							{...(category === selectedCategory
								? {
										colorScheme: 'blue',
										size: 'lg',
								  }
								: {
										colorScheme: 'gray',
										size: selectedCategory === null ? 'lg' : 'md',
								  })}
							transition='all 0.2s'
							onClick={() => {
								if (selectedCategory === category) {
									setSelectedCategory(null);
								} else {
									setSelectedCategory(category);
								}
							}}
						>
							{category}
						</Chip>
					))}
			</Flex>
			<Flex direction='column' gap={3} padding={3}>
				{productsToRenderWithData.map(
					product =>
						!product.dontRender &&
						(product.isDisappearing || product.isAppearing ? (
							<Collapse key={product.id} in={product.isAppearing}>
								<ProductCard {...product} />
							</Collapse>
						) : (
							<ProductCard key={product.id} {...product} />
						)),
				)}
			</Flex>
		</MainLayout>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const products: IProduct[] = [
		{
			id: 1,
			name: 'PS5 Spiderman edition',
			currentBid: 1400,
			category: 'videogames',
		},
		{
			id: 2,
			name: 'Tickets BadBunny',
			currentBid: 800,
			category: 'tickets',
		},
		{
			id: 3,
			name: 'Tenis Yeeze 300 Boost',
			currentBid: 400,
			category: 'other',
		},
		{
			id: 4,
			name: 'Xbox Series S',
			currentBid: 720,
			category: 'videogames',
		},
		{
			id: 5,
			name: 'RTX 3080ti',
			currentBid: 1320,
			category: 'tech',
		},
		{
			id: 6,
			name: 'Charizard Pokemon Card',
			currentBid: 22000,
			category: 'other',
		},
	];

	return {
		props: {
			products,
		},
	};
};
