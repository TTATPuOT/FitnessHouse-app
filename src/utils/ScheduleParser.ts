import HtmlDownloader from './HtmlDownloader'
import convertToDom from '@utils/HtmlToDomConverter'
import HTMLElement from 'node-html-parser/dist/nodes/html'
import { decode } from 'html-entities'

export default class ScheduleParser {
	private officeName: string
	private columns: Column[] = []

	static async getInstance(officeName: string): Promise<ScheduleParser> {
		const schedule = new ScheduleParser(officeName)
		await schedule.download()

		return schedule
	}

	constructor(officeName: string) {
		this.officeName = officeName
	}

	async download() {
		const html = await HtmlDownloader.getSchedule(this.officeName)

		await this.parseHtml(html)
	}

	private async parseHtml(html: string) {
		const root = convertToDom(html)

		this.getColumns(root.querySelectorAll('.shedule thead tr th'))

		const trs = root.querySelectorAll('.shedule tr')
		for (const tr of trs) {
			this.getLessons(tr)
		}
	}

	private getColumns(columns: HTMLElement[]) {
		let columnIndex = 0
		for (const column of columns) {
			const text = column.text
			if (text.includes(',')) {
				const dateText = text.split(',')[0].split('.')
				const date = ScheduleParser.convertDayMonthToDate(
					parseInt(dateText[0]),
					parseInt(dateText[1])
				)

				this.columns.push({
					date,
					index: columnIndex,
					timePeriods: [],
				})
			}
			columnIndex++
		}
	}

	private static convertDayMonthToDate(day: number, month: number): Date {
		const date = new Date()
		date.setDate(day)
		date.setMonth(month - 1)

		return date
	}

	private getLessons(tr: HTMLElement) {
		const tds = tr.querySelectorAll('td')
		const containTimeColumn = !!tr.querySelector('td[rowspan]')

		let columnIndex = containTimeColumn ? -1 : 0
		for (const td of tds) {
			columnIndex++

			const column = this.columns.find(c => c.index === columnIndex)
			if (!column) continue

			const lesson = ScheduleParser.getLessonDataFromTd(td)

			if (lesson) this.addLesson(column, lesson)
		}
	}

	private static getLessonDataFromTd(td: HTMLElement): Lesson | null {
		const title = td.querySelector('.hdr')?.innerHTML
		const teacher = td.querySelector('.trainer')?.innerHTML
		const time = td.querySelector('.time-cell')?.innerHTML
		const location = td.querySelector('.place')?.innerHTML
		const onclick = `${td.getAttribute('onclick')}`
		const paid = !!title?.includes('$$')
		const isSection = !!title?.includes('СЕКЦИЯ')

		if (!title || !time) return null

		return {
			title: decode(title.replace(/(\$\$)|(СЕКЦИЯ)|(  )/gim, '').trim()),
			description: ScheduleParser.getDescriptionFromOnClick(onclick),
			time: parseInt(time.split('.')[0]),
			teacher,
			location,
			paid,
			isSection,
		}
	}

	private static getDescriptionFromOnClick(onclick: string): string {
		const regex = /\('([\w\W\d]+)', '([\W\w\d]+)', \$\(this\)\)/gm

		const match = regex.exec(onclick)
		if (match && match[2]) {
			return match[2].replace(/(<([^>]+)>)/gi, '')
		}

		return ''
	}

	private addLesson(column: Column, lesson: Lesson) {
		let timePeriod = column.timePeriods.find(
			period => period.time === lesson.time
		)

		if (!timePeriod) {
			timePeriod = ScheduleParser.createTimePeriod(lesson.time)
			column.timePeriods.push(timePeriod)
		}

		timePeriod.lessons.push(lesson)
	}

	private static createTimePeriod(time: number): TimePeriod {
		return {
			time,
			lessons: [],
		}
	}

	getForDate(date: Date) {
		const dateString = date.toDateString()

		return this.columns.find(c => {
			return c.date.toDateString() === dateString
		})
	}
}

export interface Column {
	date: Date
	index: number
	timePeriods: TimePeriod[]
}

export interface TimePeriod {
	time: number
	lessons: Lesson[]
}

export interface Lesson {
	time: number
	title: string
	paid: boolean
	isSection: boolean
	teacher?: string
	location?: string
	description?: string
}
