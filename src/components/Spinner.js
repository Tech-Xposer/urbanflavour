import { Watch } from "react-loader-spinner";

const Spinner = () => {
	return (
		<Watch
			visible={true}
			height="400"
			width="400"
			radius="48"
			color="#FDBF39"
			ariaLabel="watch-loading"
			wrapperStyle={{}}
			wrapperClass=""
		/>
	);
};

export default Spinner;
