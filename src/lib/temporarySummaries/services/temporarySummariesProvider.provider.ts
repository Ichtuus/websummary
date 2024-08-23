import { createHash } from 'crypto';

class TemporarySummariesProviderService {
	private summaries: Map<string, { id: string; prediction: string; title: string, url: string }>;

	constructor() {
		this.summaries = new Map<string, { id: string; prediction: string; title: string, url: string }>();
	}

	public addSummary({ prediction, srctitle, srcurl }): boolean {
		const id = generateHashId(srctitle);
		if (this.summaries.has(id)) {
			console.log('already exist');
			return false;
		}
		const summary = { id, prediction, title: srctitle, url: srcurl };
		this.summaries.set(id, summary);
		return true;
	}

	public removeSummary(id: string) {
		this.summaries.delete(id);
	}

	public getSummaries() {
		return Array.from(this.summaries.values());
	}
}

function generateHashId(title: string): string {
	return createHash('sha256').update(title).digest('hex');
}

export const temporarySummariesProvider = new TemporarySummariesProviderService();
