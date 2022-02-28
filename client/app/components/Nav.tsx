import {
	Button,
	Flex,
	IconButton,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import Icon from './Icon';

export type ActiveTab =
	| 'search'
	| 'basket'
	| 'trending'
	| 'notifications'
	| 'profile';
export interface INavProps {
	activeTab: ActiveTab;
}

interface INavTab {
	name: ActiveTab;
	icon: string;
	url: string;
}

const navTabs: INavTab[] = [
	{
		name: 'search',
		icon: 'search',
		url: '/search',
	},
	{
		name: 'basket',
		icon: 'shopping_basket',
		url: '/basket',
	},
	{
		name: 'trending',
		icon: 'trending_up',
		url: '/',
	},
	{
		name: 'notifications',
		icon: 'notifications',
		url: '/notifications',
	},
	{
		name: 'profile',
		icon: 'person',
		url: '/profile',
	},
];

const Nav: FC<INavProps> = ({ activeTab }) => {
	const styleBg = useColorModeValue('#FEFEFE', 'neutral.100');

	return (
		<Flex
			as='nav'
			bg={styleBg}
			justify='center'
			mb={2}
			boxShadow='0 -1px #AAA'
			px={4}
			py={4}
			zIndex={5}
		>
			<Flex width='100%' justify='space-around'>
				{navTabs.map(tab => (
					<NavButton
						key={tab.name}
						active={tab.name === activeTab}
						url={tab.url}
						icon={tab.icon}
					/>
				))}
			</Flex>
		</Flex>
	);
};

interface INavButtonProps {
	active: boolean;
	url: string;
	icon: string;
}

function NavButton({ active, url, icon }: INavButtonProps) {
	const [isSmall] = useMediaQuery('(max-width: 256px)');
	const sizes = useMemo(
		() => ({
			active: '44px',
			normal: '36px',
		}),
		[],
	);

	return (
		<Link href={url} passHref>
			<IconButton
				color={active ? 'brand.orange' : 'neutral.400'}
				variant='ghost'
				mr={isSmall ? 0 : 3}
				aria-label='A'
				icon={
					<Icon
						transition='font-size .3s ease'
						fontSize={active ? sizes.active : sizes.normal}
						name={icon}
					/>
				}
			/>
		</Link>
	);
}

export default Nav;
