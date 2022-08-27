import HtmlDownloader from './HtmlDownloader'
import convertToDom from '@utils/HtmlToDomConverter'

export default class OfficesParser {
	private list: Set<string> = new Set()

	static async getInstance(): Promise<OfficesParser> {
		const offices = new OfficesParser()
		await offices.download()

		return offices
	}

	private async download() {
		const html = await HtmlDownloader.getIndexPage()
		this.parseHtml(html)
	}

	private parseHtml(html: string) {
		const root = convertToDom(html)

		const select = root.querySelector('#ScheduleFilter_club')
		if (!select) return

		for (const input of select.querySelectorAll('option')) {
			const text = input.rawText
			if (text.includes('Выберите')) continue

			this.list.add(text)
		}
	}

	getAll(): string[] {
		return Array.from(this.list)
	}
}
