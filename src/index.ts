import { QueryClient } from "./query";
import { HttpClient } from "./http";
import { catchError, map, take } from "rxjs";

type Race = {
	season: string;
	round: string;
	url: string;
	raceName: string;
	Circuit: {
		circuitId: string;
		url: string;
		circuitName: string;
		Location: { lat: string; long: string; locality: string; country: string };
	};
	date: string;
	time: string;
	FirstPractice?: { date: string; time: string };
	SecondPractice?: { date: string; time: string };
	ThirdPractice?: { date: string; time: string };
	Qualifying?: { date: string; time: string };
	Sprint?: { date: string; time: string };
};

type RaceTable = {
	season: string;
	Races: Race[];
};

export type MRData = {
	xmlns: string;
	series: string;
	url: string;
	limit: string;
	offset: string;
	total: string;
	RaceTable: RaceTable;
};

const httpClient = new HttpClient({
	baseURL: "https://ergast.com/api/f1",
});
const qc = new QueryClient({
	httpClient,
});

const q = qc.makeQuery({
	queryFn: ({ client }) => {
		return client
			.get<{ MRData: MRData }>(`/${new Date().getFullYear()}.json`)
			.pipe(
				catchError((err) => {
					console.log("error");

					throw "Fetch Error";
				}),
			);
	},
});

q.pipe(
	take(1),
	map((v) => v.MRData.RaceTable.Races),
).subscribe(
	(v) => {
		console.log(v);
	},
	(err) => console.log(err),
);
