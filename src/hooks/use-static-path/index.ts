import { useSchemaStore } from '~/state/schema';
import useTemplate, { getTemplate } from '../use-template';
import path from "path-browserify"




const getStaticPath = (path?: string, basePath?: string): string => {
	if (!path) return '';
	if (!basePath) basePath = useSchemaStore.getState().schema?.basePath ?? '';
	if (path && path.startsWith('http')) basePath = '';

	//PATCH[GB]: fatto perchè sui clona non concatenava bene i path con i base path
	//N.B. il controllo  basePath != '' è fatto perchè se il path è vuoto concatenava uno / avanti
	basePath += basePath !== '' && !basePath.endsWith('/') ? '/' : '';

	return `${basePath}${path}`;
};

const getStaticPathForWebP = (pathOriginal?: string, basePath?: string): string => {
	const originalUrl = getStaticPath(pathOriginal, basePath)
	try {
		const cleanUrl = new URL(originalUrl).pathname;
		const ext = path.parse(cleanUrl).ext
		return originalUrl.replace(ext, ".webp")
	} catch (error) {
		return originalUrl
	}
}

const useStaticPath = (path?: string): string => {
	path = path ?? '';
	const basePath = useSchemaStore((state) => state.schema?.basePath);
	if (!path) return '';
	return getStaticPath(path, basePath);
};

const useStaticPathForWebP = (path?: string): string => {
	path = path ?? '';
	const basePath = useSchemaStore((state) => state.schema?.basePath);
	if (!path) return '';
	return getStaticPathForWebP(path, basePath);
};

const getTplStaticPath = (path?: string, basePath?: string): string => {
	if (!path) return '';

	if (!basePath) {
		const template = getTemplate(useSchemaStore.getState().schema);
		basePath = template?.basePath ?? '';
	}

	if (path && path.startsWith('http')) basePath = '';

	//PATCH[GB]: fatto perchè sui clona non concatenava bene i path con i base path
	//N.B. il controllo  basePath != '' è fatto perchè se il path è vuoto concatenava uno / avanti
	basePath += basePath !== '' && !basePath.endsWith('/') ? '/' : '';

	return `${basePath}${path}`;
};

const getTplStaticPathForWebP = (pathOriginal?: string, basePath?: string): string => {
	const originalUrl = getTplStaticPath(pathOriginal, basePath)
	const cleanUrl = new URL(originalUrl).pathname;
	const ext = path.parse(cleanUrl).ext
	return originalUrl.replace(ext, ".webp")
};

const useTplStaticPath = (path?: string): string => {
	const template = useTemplate();
	const basePath = template?.basePath;
	if (!path) return '';
	return getStaticPath(path, basePath);
};

const useTplStaticPathForWebP = (path?: string): string => {
	const template = useTemplate();
	const basePath = template?.basePath;
	if (!path) return '';
	return getStaticPathForWebP(path, basePath);
};

export {
	useStaticPath, useStaticPathForWebP,
	useTplStaticPath, useTplStaticPathForWebP,
	getStaticPath, getStaticPathForWebP,
	getTplStaticPath, getTplStaticPathForWebP
};
