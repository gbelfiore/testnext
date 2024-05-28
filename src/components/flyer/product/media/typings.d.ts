import { type IMediaProductOpt } from '~/typings/schemaopt';

interface MediaProps {
	sectionIndex: number;
	position: 'header' | 'footer';
}

interface MediaProductProps {
	media: IMediaProductOpt;
	sectionIndex: number;
	productIndex: number;
}

export { MediaProps, MediaProductProps };
