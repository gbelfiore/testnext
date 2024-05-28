interface IFBPixelWebEventViewerData {
	flyer_id: number | undefined;
	retailer_slug: string | undefined;
	category_slug?: string;
}

interface IFBPixelViewContentData {
	content_type: string;
	content_ids: (number | undefined)[];
}

export { IFBPixelWebEventViewerData, IFBPixelViewContentData, FaceBookPixelEvent };
