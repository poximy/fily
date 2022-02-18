import MainLayout from '@app/layouts/Main';
import { IProduct } from '@app/typings/product';
import { Box, Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

const ProductScreen: NextPage = props => {
	const router = useRouter();
	const id = router.query.id as string;

	const product = {
		id: 1,
		name: 'Product 1',
		category: 'videogames',
    currentBid: 100
	} as IProduct;
  const starts = 4.2;

	return (
		<MainLayout>
			<Flex justify='space-between'>
				<Text as='span'>Subastador</Text>
				<Flex>
					<Text as='span'>{starts}</Text>
          <Flex>
            {[...Array(5)].map((_, i) => (
              <Box key={i}>A</Box>
            ))}
          </Flex>
				</Flex>
			</Flex>
			<Box>a</Box>
			<Box>a</Box>
			<Box>a</Box>
			<Box>a</Box>
		</MainLayout>
	);
};

export default ProductScreen;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const product = await fetch(`http://localhost:3000/api/placeholder/products/${id}`);

  if(product.status === 404) {
    context.res.statusCode = 404;

    return {
      props: {
        product: null
      }
    }
  }

  return {
    props: {
      product
    }
  }
};
