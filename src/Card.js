import React, { useEffect, useState } from "react";

const Card = ({ timeframe }) => {
	console.log(timeframe);
	const [data, setData] = useState([]);
	const getData = async () => {
		const response = await fetch("data.json");
		const data = await response.json();
		setData(data);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{data &&
				data.map((item, index) => {
					return (
						<div
							key={index}
							className={`card ${
								item.title == "Self Care" ? "Care" : item.title
							}`}
						>
							<div className="image">
								<img
									src={`images/icon-${
										item.title == "Self Care"
											? "self-care"
											: item.title.toLowerCase()
									}.svg`}
									alt=""
								/>
							</div>
							<div className="content">
								<div className="top">
									<span>{item.title}</span>
									<img src="images/icon-ellipsis.svg" alt="" />
								</div>
								<div className="hrs">
									<span className="h1">
										{timeframe && item.timeframes[timeframe].current}hrs
									</span>
									<span>
										Last Week -{" "}
										{timeframe && item.timeframes[timeframe].previous}hrs
									</span>
								</div>
							</div>
						</div>
					);
				})}
		</>
	);
};

export default Card;
