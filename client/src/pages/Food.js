import CSVParser from "../components/CSVParser";
import CategoryTemplate from "./CategoryTemplate";

// add spinner for loading
const Food = (props) => {

	return (
		<CategoryTemplate 
			category={'Food'}
			CSVParser={<CSVParser />}
		>
		</CategoryTemplate>
	)
}

export default Food;