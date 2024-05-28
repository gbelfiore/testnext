import { useMemo } from 'react';

const useDistance = (distance: number | undefined | null) => {
	const calcDistance = useMemo(() => {
		if (distance == null) return null;
		if (distance < 1) {
			return { distance: Math.round(distance * 1000), unit: 'm' };
		}
		return { distance: Math.round(distance), unit: 'km' };
	}, [distance]);

	return calcDistance;
};

export default useDistance;
