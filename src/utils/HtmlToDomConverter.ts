import { parse } from 'node-html-parser'
import HTMLElement from 'node-html-parser/dist/nodes/html'

export default function (html: string): HTMLElement {
	return parse(html)
}
