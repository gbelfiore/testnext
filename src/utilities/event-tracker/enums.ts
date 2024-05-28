enum EventNames {
	FLYER_OPEN = 'flyerOpen',
	OFFER_OPEN = 'offerOpen',
	OFFER_VIEW = 'offerView', //evento pezzotto fatto per params query string from_en
	PRODUCT_IMPRESSION = 'viewProductCarousel',
	MEDIA_PRODUCT_IMPRESSION = 'viewMediaProductCarousel',
	FLYOUT_OPEN = 'openDetail',
	CTA_CLICK = 'productInfo',
	FLYER_CLOSE = 'end',
	MEDIA_CLICK = 'mediaClick',
	MEDIA_START_VIDEO = 'mediaStartVideo',
	MEDIA_SECTION_START_VIDEO = 'mediaSectionStartVideo',
	MEDIA_VIEW_VIDEO = 'mediaViewVideo',
	MEDIA_SECTION_VIEW_VIDEO = 'mediaSectionViewVideo',
	MEDIA_TOGGLE_VIDEO = 'mediaToggleVideo',
	MEDIA_SECTION_TOGGLE_VIDEO = 'mediaSectionToggleVideo',
}

enum TrackerProviders {
	GOOGLE_ANALYTICS = 'google_analytics',
	SHOPFULLY = 'shopfully',
	FACEBOOK_PIXEL = 'facebook_pixel',
	SV_RETAILER_DATA_LAYER = 'sv_retailer_data_layer',
}

enum EventLocation {
	Retrieved = 'r',
	User = 'u',
	Backoff = 'b',
}

export { EventNames, TrackerProviders, EventLocation };
