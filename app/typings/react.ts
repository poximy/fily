export type PropsInferStrict<T> = T extends React.ComponentType<infer P>
	? P
	: never;
export type PropsInfer<T> = T extends React.ComponentType<infer P> ? P : {};
