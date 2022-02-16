import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react';

const Nav: FC = () => {
	// TODO change this value
	const coins = 1000

	return (
			<Flex as='nav' bg='blue.200' justify='center' mb={3}>
				<Flex w='full' maxW='1024px' justify='space-between'>
					<Button rounded='none' cursor='pointer' colorScheme='blue'>
						Cuenta
					</Button>
					<Button rounded='none' cursor='pointer' colorScheme='blue'>
						$ {coins}
					</Button>
				</Flex>
			</Flex>
	);
};

export default Nav;
