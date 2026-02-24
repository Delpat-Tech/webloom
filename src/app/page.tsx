import HomePage from './home/page';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type SearchParamsValue = string | string[] | undefined;

type PageProps = {
	searchParams: Promise<Record<string, SearchParamsValue>>;
};

const SERVICE_REDIRECT_MAP: Record<string, string> = {
	'mvp-engine': 'mvp-engine',
	mvp_engine: 'mvp-engine',
	mvp: 'mvp-engine',
	'internal-os': 'internal-os',
	internal_os: 'internal-os',
	inter_ops: 'internal-os',
	internal: 'internal-os',
	'automation-mvp': 'automation-mvp',
	automation_mvp: 'automation-mvp',
	automation: 'automation-mvp',
};

function getFirstParamValue(value: SearchParamsValue): string | undefined {
	if (Array.isArray(value)) {
		return value[0];
	}

	return value;
}

function buildQueryString(searchParams: Record<string, SearchParamsValue>): string {
	const query = new URLSearchParams();

	Object.entries(searchParams).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((item) => {
				if (item) query.append(key, item);
			});
			return;
		}

		if (value) {
			query.append(key, value);
		}
	});

	const queryString = query.toString();
	return queryString ? `?${queryString}` : '';
}

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;

	const utmAds = getFirstParamValue(params.utm_ads);
	if (utmAds) {
		redirect(`/contact${buildQueryString(params)}`);
	}

	const utmServiceRaw = getFirstParamValue(params.utm_service);
	if (utmServiceRaw) {
		const serviceSlug = SERVICE_REDIRECT_MAP[utmServiceRaw.toLowerCase()];
		if (serviceSlug) {
			redirect(`/what-we-do/${serviceSlug}${buildQueryString(params)}`);
		}
	}

	return <HomePage />;
}
