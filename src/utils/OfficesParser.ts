import HtmlDownloader from './HtmlDownloader'
import convertToDom from '@utils/HtmlToDomConverter'
import { Region } from './RegionsParser'

export default class OfficesParser {
	private region: Region
	private list: Set<Office> = new Set()

	static async getInstance(region: Region): Promise<OfficesParser> {
		const offices = new OfficesParser(region)
		await offices.download()

		return offices
	}

	constructor(region: Region) {
		this.region = region
	}

	private async download() {
		const html = await HtmlDownloader.getOfficesPage(this.region.id)
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

		console.log(Array.from(this.list))
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