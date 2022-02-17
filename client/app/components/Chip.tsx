import {
	Avatar,
	AvatarProps,
	Tag,
	TagCloseButton,
	TagLabel,
	TagLeftIcon,
	TagProps,
	TagRightIcon,
} from '@chakra-ui/react';
import * as React from 'react';

interface IChipProps extends TagProps {
	leftIcon?:
		| React.ReactElement<any, React.JSXElementConstructor<any>>
		| 'avatar';
	rightIcon?:
		| React.ReactElement<any, React.JSXElementConstructor<any>>
		| 'close';
	avatar?: AvatarProps;
	children?: string;

	onClick?: () => void;
}

const Chip: React.FunctionComponent<IChipProps> = ({
	children,
	leftIcon,
	rightIcon,
	avatar,
	onClick,
	...props
}) => {
	return (
		<Tag
			{...(onClick
				? {
						onClick,
						cursor: 'pointer',
						userSelect: 'none',
				  }
				: {})}
			colorScheme='gray'
			minWidth='none'
			borderRadius='full'
			size='lg'
			{...props}
		>
			{leftIcon &&
				(leftIcon === 'avatar' ? (
					<Avatar size='xs' ml={-1} mr={2} {...(avatar ?? {})} />
				) : (
					<TagLeftIcon as={() => <>{leftIcon}</>} ml={-1} mr={2} />
				))}
			<TagLabel as='span' textTransform='uppercase'>
				{children}
			</TagLabel>
			{rightIcon &&
				(rightIcon === 'close' ? (
					<TagCloseButton />
				) : (
					<TagRightIcon as={() => <>{rightIcon}</>} mr={2} />
				))}
		</Tag>
	);
};

export default Chip;
