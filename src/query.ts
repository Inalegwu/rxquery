import { map, take } from "rxjs";
import { HttpClient } from "./http";

export type QueryClientConfig = {
	httpClient: HttpClient;
};

type QueryFnParams = {
	client: HttpClient;
};

export type QueryParams<T> = {
	queryFn: (params: QueryFnParams) => T;
};

Promise<unknown>;

export class QueryClient {
	declare httpClient: HttpClient;

	constructor(config: QueryClientConfig) {
		this.httpClient = config.httpClient;
	}

	makeQuery<T>(params: QueryParams<T>) {
		return params.queryFn({
			client: this.httpClient,
		});
	}
}
