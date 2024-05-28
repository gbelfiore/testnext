interface ILoaderProps {
	open: boolean;
}

const Loader = ({ open }: ILoaderProps) => {
	if (!open) return null;
	return (
		open && (
			<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 999999, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<img src={'/loader.gif'} alt='loader' />
			</div>
		)
	);
};

export default Loader;
