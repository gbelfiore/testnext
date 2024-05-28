import { useCallback } from 'react';
import { IOpeningHourOpt } from '~/typings/schemaopt';
import DateUtility from '~/utilities/date-utility';

const useIsOpenStore = (openingHours: IOpeningHourOpt[]) => {
	const checkIsOpenStore = useCallback(() => {
		const d = new Date();
		const day = d.getDay();

		const findDayOpeningHours = openingHours.find((o) => {
			const open = o.open;
			const close = DateUtility.getTimeAddMinute(o.open, o.close);
			if (o.day === day) {
				const isOpen = DateUtility.checkNowTimeInRange(open, close);
				return isOpen;
			}
			return false;
		});
		return findDayOpeningHours;
	}, [openingHours]);

	return checkIsOpenStore();
};

export { useIsOpenStore };
