var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var y = d3.scaleLinear()
		.range([height, 0]);

var yAxis = d3.axisLeft(y).ticks(10);

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv('https://raw.githubusercontent.com/ramiibm/UM02-Deposit/master/Project/Static/data/data.tsv', type).then(function(data) {
  var x = d3.scaleBand()
        .range([0, width])
        .padding(.1)
        .domain(data.map(function(d) { return d.Season; }));

  var xAxis = d3.axisBottom(x);

  y.domain([1.85, d3.max(data, function(d) { return d.Height; })]);
  
  chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Height');

  var barWidth = width / data.length;

  trendlineCoordinates = [];
  //trendlineCoordinates['mean'] = {};
  //trendlineCoordinates['season']={};

  data.forEach(function (dataItem, index) {
    //trendlineCoordinates['season'][index] = dataItem.Season;
    if (index == 0) {
      trendlineCoordinates.push({'season': dataItem.Season, 'mean': dataItem.Height});
    } else {
      trendlineCoordinates.push({'season': dataItem.Season, 'mean': (trendlineCoordinates[index - 1].mean + dataItem.Height)/2});
    }
  });

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr('class', 'bar')
      .attr("x", d => x(d.Season))
      .attr("y", function(d) { return y(d.Height); })
      .attr("height", function(d) { return height - y(d.Height); })
      .attr("width", x.bandwidth());

  const indexId = [0];

  console.log(x(trendlineCoordinates[6].season));

  const lineGenerator = d3.line()
    .x(d => x(d.season)+40)
    .y(d => y(d.mean));

  const linesContainer = chart.append('g');

  const paths = linesContainer
      .selectAll('.line')
        .data(indexId);

  paths.exit().remove();

  paths
      .enter().append('path')
      .merge(paths)
        .attr('class', 'line')
        .attr('id', 'trendline')
        .attr('d', index => lineGenerator(trendlineCoordinates))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

  
});

function type(d) {
  d.Height = +d.Height; // coerce to number
  return d;
}