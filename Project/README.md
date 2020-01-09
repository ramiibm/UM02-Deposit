# Data Viz Notes
This folder contains three data viz, designed within the course _Data Science: Advanced visualization and cartography_, given by M. Fabien Pfaender at the UTSEUS. The project consisted of a static visualization, an interactive one, and a map.

## Map
![][image-1]

### Which data?
This map is following the work made during the Urban Data Challenge 2019, where the goal were to predict people’s wellbeing in Shanghai. Therefore, the data comes from the work made during this event, when the main data, the happiness value is an average mean constructed from three values found in a survey. We normalised the data, dividing all values by the area of the zone, to have them all at the same scale. 
### Styling
We displayed a color layer to represent the change of value according to towns, an administrative boundary smaller than districts, but bigger than neighbourhoods. For the color layer, we chose the veridis color map, as it has the advantage of being perceptually uniform. We decided to divides the data by quantiles to have a good representation of the distribution of the value. Having a linear scale would have caused to missed a lot of steps in the data perception.
The study focuses on the city of Shanghai, so we centered the map around it. The basemap were designed on Mapbox.com, as well as the data layer. The legend was finally made using Carto.
### Data Interpretation
Not surprisingly, the town center stands out in this map. Shanghai does indeed have a strong downtown core.

## Static Visualization
## Interactive Visualization
![][image-2]



[image-1]:	mapdemo.gif
[image-2]:	demo.gif