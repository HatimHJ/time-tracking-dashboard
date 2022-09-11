import { useEffect, useState } from "react";
import Card from "./Card";

function App() {
	const [timefame, setTimeframe] = useState("weekly");
	function filter(e) {
		e.preventDefault();
		const sibs = [...e.target.parentElement.children];
		sibs.forEach((sib) => {
			sib.classList.remove("active");
		});
		e.target.classList.add("active");
		const tf = e.target.innerText.toLowerCase();
		setTimeframe(tf);
	}

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
		<div className="App">
			<div className="container">
				<section className="wrapper">
					<div className="main-info">
						<div className="image-name">
							<div className="image">
								<img src="images/image-jeremy.png" alt="" />
							</div>
							<div className="name">
								<p>
									Report for <span className="h1">Jeremy Robson</span>
								</p>
							</div>
						</div>
						<div className="filter">
							<a href="/" onClick={(e) => filter(e)}>
								Daily
							</a>
							<a href="/" className="active" onClick={(e) => filter(e)}>
								Weekly
							</a>
							<a href="/" onClick={(e) => filter(e)}>
								Monthly
							</a>
						</div>
					</div>
					<div className="grid">
						{/* <Card timefame={timefame} /> */}
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
													{item.timeframes[timefame].current}hrs
												</span>
												<span>
													Last Week - {item.timeframes[timefame].previous}hrs
												</span>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
