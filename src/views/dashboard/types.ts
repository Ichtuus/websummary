export enum ESummaryActions {
	add = 'add',
	remove = 'remove'
}

export interface Summary {
	id: string;
	predictionId: string;
	predictionTitle: string;
	predictionText: string;
	predictionUrl: string;
}

export interface TemporaryPrediction {
	id: string;
	title: string;
	prediction: string;
	url: string;
}
