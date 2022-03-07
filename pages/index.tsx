import { Button, Collapse, Fade, Flex, useColorMode } from '@chakra-ui/react';
import ProductCard from '@components/product/ProductCard';
import { NextPage } from 'next';
import MainLayout from '@layouts/Main';
import Chip from '@components/Chip';
import { useEffect, useMemo, useState } from 'react';
import prisma from '@lib/prisma';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';
import { sanityRoute } from '@app/utils/route';
import { page, withPageSSP } from '@app/utils/Page';

interface IProductWithRenderData extends Product {
	isDisappearing: boolean;
	isAppearing: boolean;
	dontRender: boolean;
}
interface Props {
	products: Product[] | null;
}

export default page<Props>(
	{
		title: 'Home',
	},
	({ products }) => {
		const { toggleColorMode } = useColorMode();
		const router = useRouter();

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

		const [selectedCategory, setSelectedCategory] = useState<string | null>(
			null,
		);
		const [productsToRender, setProductsToRender] = useState<Product[]>([]);
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
								<Collapse
									key={product.id}
									unmountOnExit
									in={product.isAppearing}
								>
									<ProductCard
										onClick={() => {
											if (!product.isAppearing) return;
											router.push(
												`/product/${sanityRoute(product.name)}?id=${product.id}`,
											);
										}}
										name={product.name}
										currentBid={product.currentBid}
									/>
								</Collapse>
							) : (
								<ProductCard
									key={product.id}
									onClick={() => {
										router.push(
											`/product/${sanityRoute(product.name)}?id=${product.id}`,
										);
									}}
									name={product.name}
									currentBid={product.currentBid}
								/>
							)),
					)}
				</Flex>
			</MainLayout>
		);
	},
);

export const getServerSideProps = withPageSSP(async () => {
	// Loads products from database
	const products = await prisma.product.findMany({});

	return {
		props: {
			products,
		},
	};
});
