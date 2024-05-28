import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { type ISectionOpt } from '~/typings/schemaopt';
import { BrowserService } from '~/utilities/browser-service';
import { RefsManager } from '~/utilities/refs-manager';
import { useSchemaStore } from '~/state/schema';
import SchemaUtility from '~/utilities/schema-utility';

const useIntersectionVisualizationSection = (sectionIdx: ISectionOpt['id'] | null | undefined) => {
	const [show, setShow] = useState(false);
	const { schema } = useSchemaStore.getState();

	const intersectionObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
		setShow(entries[0] ? entries[0].isIntersecting : false);
	}, []);

	const topIntersectionObserver = useRef<IntersectionObserver | null>(null);

	useLayoutEffect(() => {
		topIntersectionObserver.current?.disconnect();

		const sectionRef = RefsManager.getRef<HTMLDivElement>(`section-${sectionIdx}`);

		if (!topIntersectionObserver.current && sectionRef?.ref) {
			topIntersectionObserver.current = new IntersectionObserver(intersectionObserverCallback, {
				threshold: 0,
				rootMargin: '100% 0px',
			});
		}

		if (sectionRef?.ref) {
			topIntersectionObserver.current?.observe(sectionRef.ref);
		}

		return () => {
			topIntersectionObserver.current?.disconnect();
		};
	}, [sectionIdx, intersectionObserverCallback]);

	//la virtualizzazione non considerava che la section potrebbe essere
	// disegnata anche se fuori dalla viewport per il productId passato in query string
	const isProductIdInQueryString = useMemo(() => {
		const queryString = BrowserService.getQueryParameters();
		let section = null;
		if (queryString.productId) {
			section = SchemaUtility.getSectionByProductId(schema, queryString.productId);
		}
		return section?.id === sectionIdx;
	}, [sectionIdx, schema]);

	return {
		show: show || isProductIdInQueryString,
	};
};

export { useIntersectionVisualizationSection };
