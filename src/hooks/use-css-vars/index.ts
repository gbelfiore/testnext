// //non dovrebbe servire a nulla....da quello che ho visto

// import { useEffect } from 'react';
// import { ITplCssVars } from '~/typings/template';

// const useCssVars = (cssVars?: ITplCssVars): void => {
// 	useEffect(() => {
// 		if (cssVars) {
// 			for (const name in cssVars) {
// 				if (Object.prototype.hasOwnProperty.call(cssVars, name)) {
// 					const t = cssVars[name as keyof ITplCssVars] ?? null;
// 					document.documentElement.style.setProperty(`--${name}`, t);
// 				}
// 			}
// 		}
// 	}, [cssVars]);
// };

// export { useCssVars };

// TODO - confirm with Giò or someone else that this file il actually removable
export {};
