import MainLayout from '@app/layouts/Main';
import { page } from '@app/utils/Page';
import {
	Box,
	Button,
	ButtonProps,
	Divider,
	Flex,
	HStack,
	Text,
} from '@chakra-ui/react';

import Icon from '@components/Icon';
import React from 'react';

export interface IPageLoginProps {}

const PageLogin = page<IPageLoginProps>(
	{
		title: 'Login',
	},
	() => {
		return (
			<MainLayout>
				<Flex h='100%' direction='column' justify='space-between'>
					<Flex h='50%' justify='center' align='center'>
						<Icon
							color='brand.orange'
							fontSize='30vw'
							name='account_circle'
							variant='outlined'
						/>
					</Flex>
					<Flex
						px='4'
						w='100%'
						h='50%'
						maxW='400px'
						mx='auto'
						gap='9'
						direction='column'
						justify='center'
					>
						<HStack>
							<Divider />
							<Text whiteSpace='nowrap'>Continuar con</Text>
							<Divider />
						</HStack>
						<LoginLink>Google</LoginLink>
						<LoginLink>Facebook</LoginLink>
						<LoginLink>Apple</LoginLink>
					</Flex>
				</Flex>
			</MainLayout>
		);
	},
);

export default PageLogin;

function LoginLink({
	children,
	...rest
}: Omit<ButtonProps, 'children'> & { children: string }) {
	return (
		<Button
			variant='link'
			pos='relative'
			py='6'
			borderRadius='none'
			overflow='hidden'
			_hover={{
				'&:before': {
					borderRadius: 'md',
					top: 0,
					h: '100%',
				},
			}}
			_after={{
				content: `"${children}"`,
				position: 'absolute',
			}}
			_before={{
				content: `""`,
				position: 'absolute',
				inset: '0px',
				top: 'calc(100% - 3px)',
				h: '3px',
				bg: 'brand.blue',
				border: '2px solid transparent',
				transition: 'all 0.2s ease',
			}}
			{...rest}
		/>
	);
}
