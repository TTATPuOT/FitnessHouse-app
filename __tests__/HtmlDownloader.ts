/**
 * @jest-environment node
 */
import HtmlDownloader from '../src/utils/HtmlDownloader'

describe('HtmlDownloader', function () {
	it('Получить расписание в Мурино', async function () {
		const html = await HtmlDownloader.getSchedule('В Мурино')

		expect(html).toContain('<html')
	})
})
