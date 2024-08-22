export class HttpClient {
	private baseUrl: string;

	constructor(baseUrl: string = '/api') {
		this.baseUrl = baseUrl;
	}

	private async request<T>(url: string, method: string, data?: object): Promise<T> {
		const requestOptions: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		};

		if (data) {
			requestOptions.body = JSON.stringify(data);
		}

		const fullUrl = `${this.baseUrl}${url}`;

		const response = await fetch(fullUrl, requestOptions);

		return response.json();
	}

	get<T>(url: string): Promise<T> {
		return this.request<T>(url, 'GET');
	}

	post<T>(url: string, data: object): Promise<T> {
		return this.request<T>(url, 'POST', data);
	}

	put<T>(url: string, data: object): Promise<T> {
		return this.request<T>(url, 'PUT', data);
	}

	patch<T>(url: string, data: object): Promise<T> {
		return this.request<T>(url, 'PATCH', data);
	}

	delete<T>(url: string): Promise<T> {
		return this.request<T>(url, 'DELETE');
	}
}

export const apiClient = new HttpClient('');
