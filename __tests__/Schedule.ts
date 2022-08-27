import 'react-native'
import ScheduleParser from '@utils/ScheduleParser'

describe('Schedule', function () {
	it('Получить расписание в Мурино', async function () {
		await ScheduleParser.getInstance('В Мурино')

		//const result = schedule.get(new Date())

		//expect(Array.isArray(result)).toBe(true)
	})
})
