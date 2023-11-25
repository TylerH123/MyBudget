const InvalidEntries = (props) => {
	const { badEntries } = props; 

	return (
		<div className="badEntries">
			<p>The following entries were not inserted into the database:</p>
			<ul>
				{badEntries.map((entry, index) => (
					<li key={index}>
						{Object.entries(entry).map(([key, value], innerIndex, array) => (
							<span key={key}>{key}: {value} {innerIndex !== array.length - 1 && <>,&nbsp;</>}</span>
						))}
					</li>
				))}
			</ul>
		</div>
	)
}

export default InvalidEntries;