d3.csv('https://raw.githubusercontent.com/ramiibm/UM02-Deposit/master/Project/Interactive/data/data.csv').then(data => draw(data));

function draw(data) {
	 console.log('draw');
	
	const margin = {
		top: 20,
		right: 20,
		bottom: 50,
		left: 50
	};
	const width = 750 - margin.left - margin.right;
	const height = 420 - margin.top - margin.bottom;

	const x = d3.scaleLinear().range([0, width]);

	const y = d3.scaleLinear().range([height, 0]);

	const colorScale = d3.scaleOrdinal()
    .range([
      '#4c78a8',
      '#9ecae9',
      '#f58518',
      '#ffbf79',
    ]);

	const svg = d3.select('.chart')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr("transform", `translate(${ margin.left }, ${ margin.top })`);

	// data.forEach(d => {
	// 	d.YearInNBA
	// });

	x.domain(d3.extent(data, d => d.YearInNBA));
	y.domain([0, d3.max(data, d => d.PPG)]);
	colorScale.domain(d3.map(data, d => d.name).keys());
	
	const xAxis = d3.axisBottom(x)
		.ticks((width + 2) / (height + 2) * 5)
		.tickSize(-height - 6)
		.tickPadding(10);

	const yAxis = d3.axisRight(y)
		.ticks(5)
		.tickSize(7 + width)
		.tickPadding(-15 - width)
		.tickFormat(d => d + '');

	svg.append('g')
		.attr('class', 'axis x-axis')
		.attr("transform", `translate(0,${ height + 6 })`)
		.call(xAxis);

	svg.append('g')
		.attr("transform", "translate(-7, 0)")
		.attr('class', 'axis y-axis')
		.call(yAxis);

	svg.append('g')
		.attr('transform', `translate(0, ${ height })`)
		.call(d3.axisBottom(x).ticks(0));

	svg.append('g')
		.call(d3.axisLeft(y).ticks(0));
}