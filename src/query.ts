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

const qc = new QueryClient({
	httpClient: new HttpClient({
		baseURL: "http://localhost:3000",
	}),
});

const query = qc.makeQuery({
	queryFn: ({ client }) => {
		return client
			.get<Array<{ id: string }>>("/home")
			.pipe(map((res) => res.flatMap((v) => v.id)));
	},
});

query.pipe(take(1)).subscribe(
	(obs) => {
		console.log(obs);
	},
	(err) => console.error(err),
);
