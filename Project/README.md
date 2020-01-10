# Data Viz Notes
This folder contains three data viz, designed within the course _Data Science: Advanced visualization and cartography_, given by M. Fabien Pfaender at the UTSEUS. The project consisted of a static visualization, an interactive one, and a map.

## Map
![][image-1]

### Which data?
This map is following the work made during the Urban Data Challenge 2019, where the goal were to predict people’s wellbeing in Shanghai. Therefore, the data comes from the work made during this event, when the main data, the happiness value is an average mean constructed from three values found in a survey. We normalised the data, dividing all values by the area of the zone, to have them all at the same scale. 
### Styling
We displayed a color layer to represent the change of value according to towns, an administrative boundary smaller than districts, but bigger than neighbourhoods. For the color layer, we chose the veridis color map, as it has the advantage of being perceptually uniform. We decided to divides the data by quantiles to have a good representation of the distribution of the value. Having a linear scale would have caused to missed a lot of steps in the data perception.

The data being principally computed from, among others, the amount of restaurants, or scenic spots, the user can see these values by clicking on a district.

The study focuses on the city of Shanghai, so we centered the map around it. The basemap were designed on Mapbox.com, as well as the data layer. The legend was finally made using Carto.
### Data Interpretation
Not surprisingly, the town center stands out in this map. Shanghai does indeed have a strong downtown core, around its touristic parts like Jing’an or Huangpu.

## Static Visualization
![][image-2]
This bar chart, designed in d3js, displays the average height of the top 20 NBA assists, limited on passes for a 3 point shot, by season. The data comes from nbaminer.com and NBA.com. 

### A simple bar chart with a trend-line
This data viz consists in a simple bar chart. As there is a evolution of the profile of the players, we displayed their average height, season by season. However, even the small players in the league are still around an height of 1,85m, which is very tall. We decided therefore to begin the Y Axis around this height, which is seen as a reference for small guards, historically in charge of playmaking.

The trend-line added on top of the bars allows the user to see clearly the evolution of the height over the years.

### Data Interpretation
This dataset shows a phenomenon that is exploding today more than never. Big men are using spacing (created by the democratisation of the 3-point shot as the number one weapon of almost every teams) and the offensive pace the league has been playing on these years to control the game flow. We are seeing players using their gifted size, as well as incredible handle and court vision stand out. This data viz shows that the playmaking, especially the one offered by pick-and-roll and spacing, is more and more controlled by these players, rather than small guards.

As there has always been big playmakers, showing the size of top assists would not have been really interesting. We wanted to show instead a special stat, the assist for a 3-point shot, to show the shift in today’s NBA, starting from the 4 previous seasons.

As the actual season isn’t finished yet, we couldn’t implement it inside our vis. But the result would have been greater than the last season, as this season is a breaking record one.

## Interactive Visualization
![][image-3]

This line chart, also designed in d3js, shows the mean of points per game, by the number of seasons in the league, of nine iconic NBA players. The data comes from a Kaggle dataset, based on basketball-reference.com data. 
### How to use this data viz?
The interactivity resides in the various ways set up to ease the visualisation of the lines. 
* First of all, it’s possible for the user to display and hide lines by clicking on the players’ name in the legend.
* Then, when hovering over the graph, the closest point to the mouse will display itself, and the line associated will be emphasised. The value of this point will be then written down on the legend, as well as other players’ means. 
* If the user clicks on the graph, the emphasised line will be displayed alone for the user to understand well the player evolution in his scoring. Then, a new click will sent the user back to the previous state (meaning that if lines were hidden before the click, they’ll stay hidden). 
* To compute the closest point to the mouse, we used Voronoi diagrams. It’s possible for the user to display it, to understand how the graph is cut out, depending on the amount of lines displayed. Each cell corresponds to a point, and is used to say which point is being hovering.
* Finally, buttons are available to hide and show all lines, or groups.

### Data Interpretation
First of all, thanks to this graph, we get to compare the career evolution of various iconic players of the 2000s. This way, it’s possible to understand which players were the more ‘\_NBA Ready\_’ at their arrival, and completely took over their team offense upon their arrival (hello LeBron, KD, & Duncan), or which player had to develop themselves before reaching their prime (hello Kobe & T-Mac). 

An interesting point of view is that there is a correlation between the early careers of these players and the fact that they played college basketball or not. However, the graph shows that they almost all reach their prime around their sixth season.

[image-1]:	mapdemo.gif
[image-2]:	https://raw.githubusercontent.com/ramiibm/UM02-Deposit/master/Project/images/barChart.png
[image-3]:	demo.gif