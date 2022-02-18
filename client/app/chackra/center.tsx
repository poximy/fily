import { As, Box, BoxProps } from '@chakra-ui/react';
import { PropsInfer } from '@typings/react';

export const centerTransformProps: BoxProps = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

export type CenterTransformProps<AS extends As> = Omit<BoxProps, 'as'> & {
	as?: AS;
} & (PropsInfer<AS> extends Omit<BoxProps, 'as'> ? PropsInfer<AS> : {});

export function CenterTransform<AS extends As = (props: {}) => JSX.Element>(
	props: CenterTransformProps<AS>,
) {
	return (
		<Box {...centerTransformProps} {...props}>
			{props.children}
		</Box>
	);
}
