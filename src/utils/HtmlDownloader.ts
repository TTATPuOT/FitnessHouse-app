import { serialize } from 'object-to-formdata';

export default class HtmlDownloader {
	static async getSchedule(officeName: string): Promise<string> {
		return HtmlDownloader.downloadUrlPost(
			'https://www.fitnesshouse.ru/schedule.html',
			{
				'ScheduleFilter[club]': officeName,
			}
		)
	}

	static async getScheduleNextWeek(link: string): Promise<string> {
		return HtmlDownloader.downloadUrlGet(
			`https://www.fitnesshouse.ru/${link}`
		)
	}

	static async getOfficesPage(regionId: number): Promise<string> {
		return HtmlDownloader.downloadUrlPost('https://www.fitnesshouse.ru/schedule.html', { city: regionId })
	}

	static async getIndexPage(): Promise<string> {
		return HtmlDownloader.downloadUrlGet(
			'https://www.fitnesshouse.ru/schedule.html'
		)
	}

	private static async downloadUrlPost(
		url: string,
		data: Object = {}
	): Promise<string> {
		return HtmlDownloader.downloadUrl(url, {
			//@ts-ignore
			redirect: 'follow',
			body: serialize(data),
			method: 'POST',
		})
	}

	private static async downloadUrlGet(url: string): Promise<string> {
		return HtmlDownloader.downloadUrl(url, {
			method: 'GET',
		})
	}

	private static async downloadUrl(
		url: string,
		params: RequestInit = {}
	): Promise<string> {
		console.log('Start downloading of', url, 'with params', params)
		const request = await fetch(url, params)

		return request.text()
	}
}
