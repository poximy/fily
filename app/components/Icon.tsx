import { Text, TextProps } from '@chakra-ui/react';
import * as React from 'react';

interface IIconProps extends TextProps {
	name: string;
	variant?: 'filled' | 'outlined' | 'rounded' | 'sharp';
}

const Icon: React.FunctionComponent<IIconProps> = ({ name, ...props }) => {
	return (
		<Text
			as='span'
			fontWeight='400'
			fontSize='24px'
			{...props}
			css={{
				fontFamily: `"Material Icons${
					(props.variant ?? 'filled') === 'filled' ? '' : ' ' + props.variant
				}"`,
			}}
		>
			{name}
		</Text>
	);
};

export default Icon;
