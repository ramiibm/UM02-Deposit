const ENABLED_OPACITY = 1;
const DISABLED_OPACITY = 0.2;

d3.csv('https://raw.githubusercontent.com/ramiibm/UM02-Deposit/master/Project/Interactive/data.csv').then(data => draw(data));

function draw(data) {
	
	const margin = { top: 20, right: 20, bottom: 50, left: 50 };
	const width = 750 - margin.left - margin.right;
	const height = 420 - margin.top - margin.bottom;

	const x = d3.scaleLinear().range([0, width]);

	const y = d3.scaleLinear().range([height, 0]);

	const colorScale = d3.scaleOrdinal()
    	.range(["#c78143",
    			"#4bafd0",
				"#b25bc4",
				"#6cb543",
				"#7178ca",
				"#bdad46",
				"#56b07e",
				"#cb4f42",
				"#667731"]);

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
		.tickSize( - height)
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
	  	.key(d => d.name.replace(/\s/g, ""))
	  	.entries(data);

	const nestByPlayerLabel = d3.nest()
	  	.key(d => d.name)
	  	.entries(data);

	const playersNamesById = {};

	nestByPlayerName.forEach(item => {
		playersNamesById[item.key] = item.values[0].Player;
	});

	const players = {};
	const playersLabels = {};

	d3.map(data, d => d.Player)
		.keys()
		.forEach(function (d, i) {
			players[d.replace(/\s/g, "")] = {
				data: nestByPlayerName[i].values,
				enabled: true
			};
		});

	d3.map(data, d => d.Player)
		.keys()
		.forEach(function (d, i) {
			playersLabels[d] = {
				data: nestByPlayerName[i].values,
				enabled: true
			};
		});

	const playersIds = Object.keys(players);
	const playersNames = Object.keys(playersLabels);

	const collegePlayersLabelsById = {};
	const collegePlayersById = {};

	const highSchoolPlayersLabelsById = {};
	const highSchoolPlayersById = {};

	nestByPlayerLabel.forEach(item => {
		console.log(item.values[0].wentToCollege);
		if (item.values[0].wentToCollege == 'True') {
			collegePlayersLabelsById[item.key] = item.values[0].Player;
		} else {
			highSchoolPlayersLabelsById[item.key] = item.values[0].Player;
		}
	});

	nestByPlayerName.forEach(item => {
		console.log(item.values[0].wentToCollege);
		if (item.values[0].wentToCollege == 'True') {
			collegePlayersById[item.key] = item.values[0].Player;
		} else {
			highSchoolPlayersById[item.key] = item.values[0].Player;
		}
	});

	const collegePlayersNames = Object.keys(collegePlayersLabelsById);
	const collegePlayersIds = Object.keys(collegePlayersById);
	const highSchoolPlayersNames = Object.keys(highSchoolPlayersLabelsById);
	const highSchoolPlayersIds = Object.keys(highSchoolPlayersById);


	console.log(highSchoolPlayersNames);

	const lineGenerator = d3.line()
		.x(d => x(d.YearInNBA))
		.y(d => y(d.PPG));

	const nestByYear = d3.nest()
		.key(d => d.YearInNBA)
		.entries(data);

	const ppgBySeason = {};

	nestByYear.forEach(seasonItem => {
		ppgBySeason[seasonItem.key] = {};
		seasonItem.values.forEach(player => {
			ppgBySeason[seasonItem.key][player.name] = player.PPG;
		});
	});

	const legendContainer = d3.select('.legend');

	const legendsSvg1 = legendContainer
		.attr('width', 500)
		.attr('height', 100)
		.append('svg');

	const collegeExtraOptionsContainer = legendContainer.append('div')
		.attr('class', 'extra-options-container');

	const legendsSvg2 = legendContainer
		.append('svg')
		.attr('class', 'legendGroupContainer');

	const highschoolExtraOptionsContainer = legendContainer.append('div')
		.attr('class', 'extra-options-container');

	const legendsDate = legendsSvg1.append('text')
		.attr('visibility', 'hidden')
		.attr('x', 0)
		.attr('y', 10);

	const legendsCollegeTitle = legendsSvg1.append('text')
		.attr('class', 'legend-title')
		.attr('y', 30)
		.text("Players that went to College.")
		.attr('visibility', 'visible');

	const legendsCollege = legendsSvg1
		.selectAll('g')
		.data(collegePlayersNames)
		.enter()
		.append('g')
		.attr('class', 'legend-item')
		.attr('transform', (name, index) => `translate(0, ${ index * 20 + 20})`)
		.on('click', clickLegendHandler);

	const legendsCollegeValue = legendsCollege
		.append('text')
		.attr('x', 0)
		.attr('y', 35)
		.attr('class', 'legend-value');
	
	legendsCollege.append('rect')
		.attr('x', 58)
		.attr('y', 25)
		.attr('width', 12)
		.attr('height', 12)
		.style('fill', name => colorScale(name))
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('x', 78)
		.attr('y', 35)
		.text(name => name)
		.attr('class', 'legend-text')
		.style('text-anchor', 'start');

	collegeExtraOptionsContainer.append('div')
		.attr('class', 'hide-all-option')
		.text('hide group')
		.on('click', () => {
			collegePlayersIds.forEach(playerName => {
				players[playerName].enabled = false;
			});

			singleLineSelected = false;

			redrawChart();
		});

	collegeExtraOptionsContainer.append('div')
		.attr('class', 'show-all-option')
		.text('show group')
		.on('click', () => {
			collegePlayersIds.forEach(playerName => {
				players[playerName].enabled = true;
			});
			singleLineSelected = false;

			redrawChart();
		});

	const legendsHighSchoolTitle = legendsSvg2.append('text')
		.attr('class', 'legend-title')
		.attr('y', 10)
		.text("Players that didn't go to College.")
		.attr('visibility', 'visible');

	const legendsHighSchool = legendsSvg2
		.selectAll('g')
		.data(highSchoolPlayersNames)
		.enter()
		.append('g')
		.attr('class', 'legend-item')
		.attr('transform', (name, index) => `translate(0, ${ index * 20 + 20})`)
		.on('click', clickLegendHandler);

	const legendsHighSchoolValue = legendsHighSchool
		.append('text')
		.attr('x', 0)
		.attr('y', 10)
		.attr('class', 'legend-value');
	
	legendsHighSchool.append('rect')
		.attr('x', 58)
		.attr('y', 0)
		.attr('width', 12)
		.attr('height', 12)
		.style('fill', name => colorScale(name))
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('x', 78)
		.attr('y', 10)
		.text(name => name)
		.attr('class', 'legend-text')
		.style('text-anchor', 'start');

	highschoolExtraOptionsContainer.append('div')
		.attr('class', 'hide-all-option')
		.text('hide group')
		.on('click', () => {
			highSchoolPlayersIds.forEach(playerName => {
				players[playerName].enabled = false;
			});

			singleLineSelected = false;

			redrawChart();
		});

	highschoolExtraOptionsContainer.append('div')
		.attr('class', 'show-all-option')
		.text('show group')
		.on('click', () => {
			highSchoolPlayersIds.forEach(playerName => {
				players[playerName].enabled = true;
			});
			singleLineSelected = false;

			redrawChart();
		});

	const extraOptionsContainer = legendContainer.append('div')
		.attr('class', 'extra-options-container');

	extraOptionsContainer.append('div')
		.attr('class', 'hide-all-option')
		.text('hide all')
		.on('click', () => {
			playersIds.forEach(playerName => {
				players[playerName].enabled = false;
			});

			singleLineSelected = false;

			redrawChart();
		});

	extraOptionsContainer.append('div')
		.attr('class', 'show-all-option')
		.text('show all')
		.on('click', () => {
			playersIds.forEach(playerName => {
				players[playerName].enabled = true;
			});
			singleLineSelected = false;

			redrawChart();
		});

	const linesContainer = svg.append('g');

	let singleLineSelected = false;

	const voronoi = d3.voronoi()
		.x(d => x(d.YearInNBA))
		.y(d => y(d.PPG))
		.extent([[0, 0], [width, height]]);

	const hoverDot = svg.append('circle')
		.attr('class', 'dot')
		.attr('r', 3)
		.style('visibility', 'hidden');

	let voronoiGroup = svg.append('g')
		.attr('class', 'voronoi-parent')
		.append('g')
		.attr('class', 'voronoi')
		.on('mouseover', () => {
			legendsDate.style('visibility', 'visible');
			hoverDot.style('visibility', 'visible');
		})
		.on('mouseout', () => {
			legendsCollegeValue.text('');
			legendsHighSchoolValue.text('');
			legendsDate.style('visibility', 'hidden');
			hoverDot.style('visibility', 'hideen');
		});

	d3.select('#show-voronoi')
		.property('disabled', false)
		.on('change', function() {
			voronoiGroup.classed('voronoi-show', this.checked);
		});

	redrawChart();

	function redrawChart(showingPlayersIds) {
		const enabledPlayersId = showingPlayersIds || playersIds.filter(playerName => players[playerName].enabled);

		const paths = linesContainer
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

		legendsCollege.each(function(playerName) {
			const opacityValue = enabledPlayersId.indexOf(playerName.replace(/\s/g, "")) >= 0 ? ENABLED_OPACITY : DISABLED_OPACITY;

			d3.select(this).attr('opacity', opacityValue);
		});
		
		legendsHighSchool.each(function(playerName) {
			const opacityValue = enabledPlayersId.indexOf(playerName.replace(/\s/g, "")) >= 0 ? ENABLED_OPACITY : DISABLED_OPACITY;

			d3.select(this).attr('opacity', opacityValue);
		});

		const filteredData = data.filter(dataItem => enabledPlayersId.indexOf(dataItem.name.replace(/\s/g, "")) >= 0 );
		console.log(filteredData);

		const voronoiPaths = voronoiGroup.selectAll('path')
			.data(voronoi.polygons(filteredData));


		voronoiPaths.exit().remove();

		voronoiPaths
			.enter()
			.append('path')
			.merge(voronoiPaths)
			.attr('d', d => (d ? `M${ d.join('L') }Z` : null))
			.on('mouseover', voronoiMouseover)
			.on('mouseout', voronoiMouseout)
			.on('click', voronoiClick);
	}

	function clickLegendHandler(playerName) {
		const playerID = playerName.replace(/\s/g, "");

		if(singleLineSelected) {
			const newEnabledPlayers = singleLineSelected === playerID ? [] : [singleLineSelected, playerID];

			playersIds.forEach(currentPlayerName => {
				players[currentPlayerName].enabled = newEnabledPlayers.indexOf(currentPlayerName) >= 0;
			});
		} else {
			players[playerID].enabled = !players[playerID].enabled;
		}
		singleLineSelected = false;
		
		redrawChart();
	}

	d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

	function voronoiMouseover(d) {
		if (Math.floor(d.data.YearInNBA) == 0) {
			legendsDate.text('1st year in league.');
		} else if(Math.floor(d.data.YearInNBA) == 1) {
			legendsDate.text('2nd year in league.');
		} else if(Math.floor(d.data.YearInNBA) == 2) {
			legendsDate.text('3rd year in league.');
		} else {
			legendsDate.text((Math.floor(d.data.YearInNBA)+1) + 'th year in league.');
		}

		legendsCollegeValue.text(dataItem => {
			const value = Math.round( ppgBySeason[d.data.YearInNBA][dataItem] * 10 ) / 10;
			return value ? value + ' PPG' : 'N.A.';
		});

		legendsHighSchoolValue.text(dataItem => {
			const value = Math.round( ppgBySeason[d.data.YearInNBA][dataItem] * 10 ) / 10;
			return value ? value + ' PPG' : 'N.A.';
		});

		d3.select(`#player-${ d.data.name.replace(/\s/g, "") }`)
			.classed('region-hover', true)
			.moveToFront();

		hoverDot
			.attr('cx', () => x(d.data.YearInNBA))
			.attr('cy', () => y(d.data.PPG));
	}

	function voronoiMouseout(d) {
		d3.select(`#player-${ d.data.name.replace(/\s/g, "") }`).classed('region-hover', false);
	}

	function voronoiClick(d) {

		console.log('click');
		if (singleLineSelected) {

			singleLineSelected = false;
			redrawChart();
		} else {
			const playerName = d.data.name.replace(/\s/g, "");

			singleLineSelected = playerName;
			console.log(playerName);

			redrawChart([playerName]);
		}
	}
}