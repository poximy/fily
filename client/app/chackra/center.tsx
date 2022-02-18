import { As, Box, BoxProps } from '@chakra-ui/react';
import { PropsInfer } from '@typings/react';

export const centerTransformProps: BoxProps = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

// prettier-ignore
export type CenterTransformProps<AS extends As> =
	// Base props
	& Omit<BoxProps, 'as'> 
	// Custom to set generic
	& { as?: AS; } 
	// If the generic is a Base props based component then add to the props
	& (PropsInfer<AS> extends Omit<BoxProps, 'as'> ? PropsInfer<AS> : {});

export function CenterTransform<AS extends As = (props: {}) => JSX.Element>(
	props: CenterTransformProps<AS>,
) {
	return (
		<Box {...centerTransformProps} {...props}>
			{props.children}
		</Box>
	);
}
