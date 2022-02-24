import {
	Button,
	Flex,
	IconButton,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
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
		>
			<Flex width='100%' justify='space-around'>
				<NavButton active={activeTab === 'search'}>search</NavButton>
				<NavButton active={activeTab === 'basket'}>shopping_basket</NavButton>
				<NavButton active={activeTab === 'trending'}>trending_up</NavButton>
				<NavButton active={activeTab === 'notifications'}>
					notifications
				</NavButton>
				<NavButton active={activeTab === 'profile'}>person</NavButton>
			</Flex>
		</Flex>
	);
};

interface INavButtonProps {
	active: boolean;
	children: string;
}

function NavButton({ active, children }: INavButtonProps) {
	const [isSmall] = useMediaQuery('(max-width: 256px)');
	const sizes = useMemo(
		() => ({
			active: '44px',
			normal: '36px',
		}),
		[],
	);

	return (
		<IconButton
			color={active ? 'principal.orange' : 'neutral.400'}
			variant='ghost'
			mr={isSmall ? 0 : 3}
			aria-label='A'
			icon={
				<Icon
					transition='font-size .3s ease'
					fontSize={active ? sizes.active : sizes.normal}
					name={children}
				/>
			}
		/>
	);
}

export default Nav;
