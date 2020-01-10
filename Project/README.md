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
Not surprisingly, the town center stands out in this map. Shanghai does indeed have a strong downtown core, around its touristic parts as Jing’an or Huangpu.

## Static Visualization
![][image-2]
## Interactive Visualization
![][image-3]

This line chart, designed in d3js, shows the mean of points per game, season by season, of nine iconic NBA players. The data comes from a Kaggle dataset, based on basketball-reference.com data. 
### An interactive visualization
The interactivity resides in the various ways set up to ease the visualisation of the lines. 
* First of all, it’s possible for the user to display and hide lines by clicking on the players’ name in the legend.
* Then, when hovering over the graph, the closest point to the mouse will display itself, and the line associated will be emphasised. The value of this point will then written down on the legend, as well as other players’ means. If the user clicks on the graph, the emphasised line will be displayed alone for the user to understand well the player evolution in his scoring. Then, a new click will sent the user back to the previous state. 
* To compute the closest point to the mouse, we used Voronoi paths. It’s possible for the user to display, to understand how the graph is cut out, depending on the amount of lines displayed.

[image-1]:	mapdemo.gif
[image-2]:	https://raw.githubusercontent.com/ramiibm/UM02-Deposit/master/Project/images/barChart.png
[image-3]:	demo.gif