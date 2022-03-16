import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
	NextPage,
	Redirect,
} from 'next';
import Head from 'next/head';
import { MobileProvider, isMobileSSR } from '../hooks/useMobile';

export interface PageOptions {
	title: string;
	description?: string;
}

interface PageProps {
	_page_isMobile: boolean;
}

export function page<T = {}>(
	pageOptions: PageOptions,
	PageChildren: React.ComponentType<T> | NextPage<T>,
): NextPage<T & PageProps> {
	return function Page(props: T & PageProps) {
		return (
			<>
				<Head>
					{/* Meta */}
					<title>{pageOptions.title}</title>
					<meta name='og:title' content={pageOptions.title} />

					{pageOptions.description && (
						<>
							<meta name='description' content={pageOptions.description} />
							<meta
								property='og:description'
								content={pageOptions.description}
							/>
						</>
					)}
				</Head>
				<MobileProvider value={props._page_isMobile}>
					<PageChildren {...props} />
				</MobileProvider>
			</>
		);
	};
}

function handleGetProps<
	P,
	G extends GetServerSidePropsResult<P> | GetStaticPropsResult<P> =
		| GetServerSidePropsResult<P>
		| GetStaticPropsResult<P>,
>(
	result: G,
	context: G extends GetServerSidePropsResult<P>
		? GetServerSidePropsContext
		: GetStaticPropsContext,
): G | null {
	const resSSP = result as {
		props?: P;
		redirect?: Redirect;
		notFound?: boolean;
	};
	// Handle redirect
	if (resSSP.redirect) {
		return {
			redirect: resSSP.redirect,
		} as G;
	}

	// Handle not found
	if (resSSP.notFound) {
		context.res.writeHead(404);
		return {
			notFound: true,
		} as G;
	}

	return null;
}

export type GenericPageProps<P> = P & PageProps;
export type SSP<P> = GetServerSideProps<P>;

export function withPageSSP<P extends Omit<{}, '_page_isMobile'> = {}>(
	fn?: SSP<P>,
) {
	// Normalize server side props function
	const ssp = fn || (async () => ({ props: {} }));

	return async (
		ctx: GetServerSidePropsContext<P>,
	): Promise<GetServerSidePropsResult<GenericPageProps<P>>> => {
		// Get original server side props result
		const sspResult = (await ssp(ctx)) as GetServerSidePropsResult<P>;

		const handledSSPResult = handleGetProps<P, GetServerSidePropsResult<P>>(
			sspResult,
			ctx,
		);
		if (handledSSPResult) {
			return handledSSPResult as GetServerSidePropsResult<GenericPageProps<P>>;
		}

		// Get original props
		const props: P | null = (sspResult as { props?: P }).props ?? null;

		// Handle props
		const isMobile = ctx.req ? isMobileSSR(ctx.req) : false;

		return {
			props: {
				...props,
				_page_isMobile: isMobile,
			} as GenericPageProps<P>,
		};
	};
}
