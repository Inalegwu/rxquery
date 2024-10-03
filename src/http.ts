import type { Axios, CreateAxiosDefaults } from "axios";
import axios from "axios";
import { type Observable, defer, map, tap } from "rxjs";

type MutateHttpClientFunction = <T>(
	url: string,
	body: Record<string, unknown>,
	queryParams: Record<string, unknown>,
	// biome-ignore lint/suspicious/noConfusingVoidType:I don't care enough
) => Observable<T | void>;

interface BaseHttpClient {
	get: <T>(url: string, queryParams: Record<string, unknown>) => Observable<T>;
	post: MutateHttpClientFunction;
	put: MutateHttpClientFunction;
	patch: MutateHttpClientFunction;
	delete: MutateHttpClientFunction;
}

type HttpClientConfig = CreateAxiosDefaults & {};

export class HttpClient implements BaseHttpClient {
	declare client: Axios;

	constructor(config: HttpClientConfig) {
		this.client = axios.create(config);
	}

	get<T>(url: string, queryParams?: Record<string, unknown>): Observable<T> {
		return defer(() =>
			this.client.get<T>(url, {
				params: queryParams,
			}),
		).pipe(map((res) => res.data));
	}

	post<T>(
		url: string,
		body: Record<string, unknown>,
		queryParams: Record<string, unknown>,
	): Observable<T> {
		return defer(() =>
			this.client.post<T>(url, body, { params: queryParams }),
		).pipe(
			map((res) => res.data),
			tap((res) => console.log({ res })),
		);
	}

	put<T>(
		url: string,
		body: Record<string, unknown>,
		queryParams: Record<string, unknown>,
	): Observable<T | void> {
		return defer(() =>
			this.client.put<T>(url, body, { params: queryParams }),
		).pipe(
			map((res) => res.data),
			tap((res) => console.log({ res })),
		);
	}

	patch<T>(
		url: string,
		body: Record<string, unknown>,
		queryParams: Record<string, unknown>,
	): Observable<T | void> {
		return defer(() =>
			this.client.put<T>(url, body, { params: queryParams }),
		).pipe(
			map((res) => res.data),
			tap((res) => console.log({ res })),
		);
	}

	delete<T>(
		url: string,
		body: Record<string, unknown>,
		queryParams: Record<string, unknown>,
	): Observable<T | void> {
		return defer(() =>
			this.client.put<T>(url, body, { params: queryParams }),
		).pipe(
			map((res) => res.data),
			tap((res) => console.log({ res })),
		);
	}
}
