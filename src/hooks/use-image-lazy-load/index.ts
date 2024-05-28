import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { type UseImageLazyLoadPayload } from '~/hooks/use-image-lazy-load/typings';
import { BrowserService } from '~/utilities/browser-service';

const useImageLazyLoad = ({ src, isImgTag = false, offset = 300, forceShow, ref: externalRef }: UseImageLazyLoadPayload) => {
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const ref = useRef<HTMLImageElement | HTMLDivElement>(null);

	const img = useRef<HTMLImageElement>(new Image());

	const [show, setShow] = useState(BrowserService.isImageCached(src));

	const props = useMemo(() => {
		let style: CSSProperties = {};
		if (show || forceShow) {
			if (isImgTag) {
				return { src };
			} else {
				style = { backgroundImage: `url(${src})` };
				return {
					style,
				};
			}
		} else {
			style = { visibility: 'hidden' };
			if (isImgTag) {
				return {
					src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
					style,
				};
			}
			return {
				style,
			};
		}
	}, [forceShow, isImgTag, show, src]);

	const onImageLoad = useCallback(() => setShow(true), []);
	const onImageError = useCallback(() => setShow(false), []);

	const showImage = useCallback(() => {
		if (timeout.current) clearTimeout(timeout.current);

		if (src) {
			timeout.current = setTimeout(() => {
				img.current.src = src;
			}, 600);
		}
	}, [src]);

	const hideImage = useCallback(() => {
		img.current.src = '';
		if (timeout.current) clearTimeout(timeout.current);
	}, []);

	const observer = useRef(
		new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				globalThis.requestAnimationFrame(() => {
					if (entry?.isIntersecting) {
						showImage();
					} else {
						hideImage();
					}
				});
			},
			{ rootMargin: `${offset}px 0px ${offset}px 0px` }
		)
	);

	useLayoutEffect(() => {
		const intRef = externalRef ? externalRef : ref.current;
		const obserferRef = observer.current;

		if (!show) {
			if (intRef && obserferRef) {
				obserferRef.observe(intRef);
			}
		} else {
			if (intRef && obserferRef) {
				obserferRef.disconnect();
			}
		}
		return () => {
			if (intRef && obserferRef) {
				obserferRef.unobserve(intRef);
			}
		};
	}, [ref, offset, showImage, hideImage, show, externalRef]);

	useEffect(() => {
		img.current.onload = onImageLoad;
		img.current.onerror = onImageError;
	}, [onImageError, onImageLoad]);

	return {
		props,
		ref,
	};
};

export { useImageLazyLoad };
