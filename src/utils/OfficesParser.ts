import HtmlDownloader from './HtmlDownloader'
import convertToDom from '@utils/HtmlToDomConverter'

export default class OfficesParser {
	private list: Set<Office> = new Set()

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
			const name = input.rawText
			const code = input.getAttribute('value')
			if (name.includes('Выберите') || !code) continue

			this.list.add({ name, code })
		}
	}

	getAll(): Office[] {
		return Array.from(this.list).sort((a, b) =>
			a.name.localeCompare(b.name)
		)
	}
}

export interface Office {
	name: string
	code: string
}
