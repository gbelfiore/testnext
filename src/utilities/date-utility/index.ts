import dayjs from 'dayjs';

class DateUtility {
	static regexHour = new RegExp('^([01]?[0-9]|2[0-3])(:([0-5][0-9]))(:([0-5][0-9]))$');

	static checkNowTimeInRange(start: string, end: string): boolean {
		const startObj = DateUtility.getDataFromHours(start);
		const endObj = DateUtility.getDataFromHours(end);
		const now = DateUtility.getDataFromHours();

		return startObj <= now && endObj >= now;
	}

	static getDataFromHours(hour?: string): Date {
		const hourObj = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
		if (hour) {
			const hourSplit = hour.split(':');
			hourObj.setHours(parseInt(hourSplit[0] ?? ""));
			hourObj.setMinutes(parseInt(hourSplit[1] ?? ""));
			hourObj.setSeconds(parseInt(hourSplit[2] ?? ""));
		}

		return hourObj;
	}

	static getTimeAddMinute(start: string, minute: number) {
		const now = DateUtility.getDataFromHours(start);
		const end = dayjs(now).add(minute, "minute")
		return end.format("HH:mm:ss")

	}

	static getHourMinute(time: string): string {
		const timeObj = DateUtility.getDataFromHours(time);
		return `${timeObj.getHours() < 10 ? '0' : ''}${timeObj.getHours()}:${timeObj.getMinutes() < 10 ? '0' : ''}${timeObj.getMinutes()}`;
	}

	static getTodayDay() {
		const hourObj = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
		return hourObj.getDay();
	}

}

export default DateUtility;
