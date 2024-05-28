import { StringManipulator } from '../string-manipulator';

class ManipulatorClass {
	private static _instance: ManipulatorClass;

	public static get instance(): ManipulatorClass {
		if (!this._instance) this._instance = new ManipulatorClass();
		return this._instance;
	}

	/**
	 * Round a number to the nearest decimal places
	 *
	 * @param {number} num
	 * @return {*}  {number}
	 * @memberof ManipulatorClass
	 */
	public round(num: number): number {
		const p = 10 ** 2;
		return Math.round(num * p) / p;
	}

	/**
	 * Check if a number is an integer
	 *
	 * @param {number} num
	 * @return {*}  {boolean}
	 * @memberof ManipulatorClass
	 */
	public isInteger(num: number): boolean {
		return num % 1 === 0;
	}

	/**
	 * Format price
	 *
	 * @param {string} price
	 * @return {*}
	 * @memberof ManipulatorClass
	 */
	public formatPrice(price: string, reformatTiny?: boolean): string[] | null {
		if (!price) return null;

		if (price.includes('.') || price.includes(',')) {
			return StringManipulator.replaceAll(price, '.', ',').split(',');
		}

		if (!reformatTiny) return price.split(',');

		const numericPrice = Number(price);

		if (Number.isNaN(numericPrice)) return null;

		if (this.isInteger(numericPrice)) {
			return String(numericPrice).split(',');
		}

		const floatPrice = this.round(numericPrice);
		if (Number.isNaN(numericPrice)) return null;

		return StringManipulator.replaceAll(floatPrice.toFixed(2), '.', ',').split(',');
	}

	public getStrokeTextShadow(size: number, color: string = '#101E3F', blur: number = 0): string {
		const n = Math.ceil(2 * Math.PI * size); /* number of shadows */
		let str = '';
		for (let i = 0; i < n; i++ /* append shadows in n evenly distributed directions */) {
			const theta = (2 * Math.PI * i) / n;
			str += size * Math.cos(theta) + 'px ' + size * Math.sin(theta) + 'px ' + blur + 'px ' + color + (i === n - 1 ? '' : ',');
		}
		return str;
	}

	public normalizeFontSize(fontSize?: string | number) {
		if (typeof fontSize === 'number' && !Number.isNaN(fontSize)) return `${fontSize}px`;
		if (typeof fontSize === 'string') {
			if (fontSize.includes('px')) return fontSize;
			if (fontSize.includes('rem')) return fontSize;
			if (fontSize.includes('em')) return fontSize;
			return `${fontSize}px`;
		}
	}

	public slugify(str: string): string {
		return str
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}
}

const Manipulator = ManipulatorClass.instance;

export { Manipulator };
