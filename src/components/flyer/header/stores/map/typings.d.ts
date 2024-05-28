interface IMapMarker {
	storeIdx?: number;
	icon: string;
	position: { lat: number; lon: number };
	textPopup: string;
}

interface IMapProps {
	markers: IMapMarker[];
	userMarker: IMapMarker;
	onClickMarker: (storeIdx: number) => void;
	centerMap: [number, number] | undefined;
	height?: string | number;
}

export { IMapProps, IMapMarker };
