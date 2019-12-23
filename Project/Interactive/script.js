d3.csv('https://raw.githubusercontent.com/ramiibm/UM02-Deposit/master/Project/Interactive/data/data.csv').then(data => draw(data));

function draw(data) {
	
	const margin = { top: 20, right: 20, bottom: 50, left: 50 };
	const width = 750 - margin.left - margin.right;
	const height = 420 - margin.top - margin.bottom;

	const x = d3.scaleLinear().range([0, width]);

	const y = d3.scaleLinear().range([height, 0]);

	const colorScale = d3.scaleOrdinal()
    	.range(['#4c78a8', '#9ecae9', '#f58518', '#ffbf79']);

	const svg = d3.select('.chart')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr("transform", `translate(${ margin.left }, ${ margin.top })`);

	// data.forEach(d => {
	// 	d.YearInNBA
	// });
	console.log("PPG: " + d3.max(data, d => +d.YearInNBA));
	x.domain(d3.extent(data, d => +d.YearInNBA));
	y.domain([0, d3.max(data, d => +d.PPG)]);
	colorScale.domain(d3.map(data, d => d.name).keys());
	
	const xAxis = d3.axisBottom(x)
		.ticks((width + 2) / (height + 2) * 5)
		.tickSize( - height - 6)
		.tickPadding(10);

	const yAxis = d3.axisRight(y)
		.ticks(5)
		.tickSize( width)
		.tickPadding(-15 - width);

	svg.append('g')
		.attr('class', 'axis x-axis')
		.attr("transform", `translate(0,${ height })`)
		.call(xAxis);

	svg.append('g')
		.attr('class', 'axis y-axis')
		.call(yAxis);

	svg.append('g')
		.attr('transform', `translate(0, ${ height })`)
		.call(d3.axisBottom(x).ticks(0));

	svg.append('g')
		.call(d3.axisLeft(y).ticks(0));

	const nestByPlayerName = d3.nest()
	  	.key(d => d.name)
	  	.entries(data);

	const playersNamesById = {};

	nestByPlayerName.forEach(item => {
		playersNamesById[item.key] = item.values[0].name;
	});

	const players = {};

	d3.map(data, d => d.name)
		.keys()
		.forEach(function (d, i) {
			players[d] = {
				data: nestByPlayerName[i].values,
				enabled: true
			};
		});

	const playersIds = Object.keys(players);

	const lineGenerator = d3.line()
		.x(d => x(d.YearInNBA))
		.y(d => y(d.PPG));

	const legendContainer = d3.select('.legend');

	const legends = legendContainer
		.append('svg')
		.attr('width', 150)
		.attr('height', 353)
		.selectAll('g')
		.data(playersIds)
		.enter()
		.append('g')
		.attr('class', 'legend-item')
		.attr('transform', (name, index) => `translate(0, ${ index * 20})`)
		.on('click', clickLegendHandler);

	legends.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', 12)
		.attr('height', 12)
		.style('fill', name => colorScale(name))
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('x', 20)
		.attr('y', 10)
		.text(name => name)
		.attr('class', 'textselected')
		.style('text-anchor', 'start')
		.style('font-size', 12);

	const extraOptionsContainer = legendContainer.append('div')
		.attr('class', 'extra-options-container');

	extraOptionsContainer.append('div')
		.attr('class', 'hide-all-option')
		.text('hide all')
		.on('click', () => {
			playersIds.forEach(playerName => {
				players[playerName].enabled = false;
			});

			redrawChart();
		});

	extraOptionsContainer.append('div')
		.attr('class', 'show-all-option')
		.text('show all')
		.on('click', () => {
			playersIds.forEach(playerName => {
				players[playerName].enabled = true;
			});

			redrawChart();
		});

	function redrawChart() {
		const enabledPlayersId = playersIds.filter(playerName => players[playerName].enabled);

		const paths = svg
			.selectAll('.line')
			.data(enabledPlayersId);

		paths.exit().remove();

		paths
			.enter()
			.append('path')
			.merge(paths)
			.attr('class', 'line')
			.attr('id', playerId => `player-${ playerId }`)
			.attr('d', playerId => lineGenerator(players[playerId].data))
			.style('stroke', playerId => colorScale(playerId));

		legends.each(function(playerName) {
			const isEnabledPlayer = enabledPlayersId.indexOf(playerName) >= 0;

			d3.select(this)
				.classed('disabled', !isEnabledPlayer)
		});
	}

	redrawChart();

	function clickLegendHandler(playerName) {
		players[playerName].enabled = !players[playerName].enabled;
		
		redrawChart();
	}
}


















