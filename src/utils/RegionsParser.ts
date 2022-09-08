import HtmlDownloader from './HtmlDownloader'
import convertToDom from '@utils/HtmlToDomConverter'

export default class RegionsParser {
	private regions: Region[] = []

	static async getInstance(): Promise<RegionsParser> {
		const regions = new RegionsParser()
		await regions.download()

		return regions
	}

	private async download() {
		const html = await HtmlDownloader.getIndexPage()

		this.parseHtml(html)
	}

	private parseHtml(html: string) {
		const root = convertToDom(html)

		console.log(root.querySelector('h1')?.innerText)

		const regions = root.querySelectorAll('a.region-select');

		for (const region of regions) {
			const id = parseInt(`${region.getAttribute('data-region')}`)
			const name = region.innerText;
			const code = region.getAttribute('href')

			if (code && id && name && !this.regions.find(r => r.id === id)) {
				this.regions.push({ id, name, code })
			}
		}
	}

	getAll(): Region[] {
		return this.regions
	}
}

export interface Region {
	id: number
	name: string
	code: string
}