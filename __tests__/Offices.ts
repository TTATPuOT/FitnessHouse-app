/**
 * @jest-environment node
 */
import OfficesParser from '@utils/OfficesParser'

describe('Offices', function () {
	it('Получить список офисов', async function () {
		const offices = await OfficesParser.getInstance()
		const officesList = offices.getAll()

		expect(Array.isArray(officesList)).toBe(true)
	})
})
