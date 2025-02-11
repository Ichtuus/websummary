import { writable, get } from 'svelte/store';

interface RecorderState {
	isRecording: boolean;
	audioURL: string | null;
}

export class MediaRecorderService {
	private mediaRecorder: MediaRecorder | null = null;
	private chunks: Blob[] = [];

	private store = writable<RecorderState>({
		isRecording: false,
		audioURL: null
	});

	get isRecording(): boolean {
		return get(this.store).isRecording;
	}

	get currentAudioURL(): string | null {
		return get(this.store).audioURL;
	}

	get recorderStore() {
		return this.store;
	}

	async startRecording(): Promise<void> {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

			this.mediaRecorder = new MediaRecorder(stream);
			this.chunks = [];

			this.mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					this.chunks.push(event.data);
				}
			};

			this.mediaRecorder.onstop = () => {
				const audioBlob = new Blob(this.chunks, { type: 'audio/webm' });
				this.store.update((state) => ({
					...state,
					isRecording: false,
					audioURL: URL.createObjectURL(audioBlob)
				}));
				this.chunks = [];
			};

			this.mediaRecorder.start();
			this.store.update((state) => ({
				...state,
				isRecording: true
			}));
			console.log('recording start...');
		} catch (error) {
			console.error('Error on acces MIC:', error);
			throw error;
		}
	}

	stopRecording(): void {
		if (this.mediaRecorder && this.isRecording) {
			this.mediaRecorder.stop();
			console.log('Record stop.');
		}
	}

	clearRecording(): void {
		const currentURL = get(this.store).audioURL;

		if (currentURL) {
			URL.revokeObjectURL(currentURL);
			this.store.update((state) => ({
				...state,
				audioURL: null
			}));
		}
	}
}
