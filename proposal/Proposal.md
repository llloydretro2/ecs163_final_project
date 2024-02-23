## Problem Statement and Purpose:
Nowadays, driven by growing environmental concerns and consumers’ shifting
preference, electric vehicles (EV) have become more and more popular in recent
years resulting in an increase in potential buyers. As a developing market with
many companies with growing technology, there are many choices for new buyers.
However, at the same time the great complexity of the market can confuse
potential buyers which makes it increasingly hard to make decisions. Therefore,
our goal is to analyze the data regarding EVs and provide informative
visualizations to guide users to understand the market so that they can make
informed decisions based on their needs.

## Final Deliverables:
Our team will deliver a front-end tool which gives detailed background
information about many aspects of EVs. Users can interact with the tool in
many ways specified on the manual.

## Datasets Descriptions:
The combined dataset of EV population shows the Battery Electric Vehicles
(BEVs) and Plug-in Hybrid Electric Vehicles (PHEVs) that are currently
registered through Washington State Department of Licensing (DOL). The dataset
shows the VIN number, locations, year of manufacture, model, and electric
utility of all electric vehicles from 1997 to 2024.

The charging stations dataset contains all of the EV charging stations in the
US, both public and private, and offers different information about each
station such as location, EV network, facility type, connect type, and more 
through February 2024.

The EV specifications dataset presents a detailed exploration of various
electric vehicles from the EV database, providing valuable insights into their
specifications, pricing, and performance metrics like top speed and acceleration.

Our stock market datasets are acquired from Yahoo finance. We will individually
select different companies in the US that manufacture EVs and compare their
stock values over time. This will allow us to see their performance in the
stock market and how they compare to each other.

## Data Processing Method:
The included datasets can be divided into four different categories: general
EV populations, EV specifications by brands and models, charging stations
locations, and stock market data. The library that will be used to preprocess
data is Python Pandas library. The team uses Pandas to record data frames and
combine our two datasets for general EV populations into one. There could be
duplicated entries, so the VIN number of each entry will be used to distinguish
them. The dataset for EV specifications are mostly cleaned, while the price of
each entry is in Euros. That price column should be replaced by another column
of price in dollars. The team will apply the current exchange rate from Euro to
dollars at the time that the project is developed. For the charging station
datasets, these columns will not be considered: EV Level1 EVSE Num, EV Level2
EVSE Num, EV DC Fast Count, and Access Detail Code. Among those stock
information, the team will cherry pick those EV manufacturers from Yahoo
Finance API. We will only pick car manufacturers who have stock in the US
market. After data preprocessing, the team will read a new dataset csv file in
Javascript and convert each entry into objects. Attributes should be converted
to data with appropriate type.

## Visualization Methods:
The initial visualization methods contain the following: pie chart, line chart,
parallel plot, stream graph, and map. Stream graphs will be used to visualize
the overall EVs populations. A stream graph shows the composition of each type
of EVs throughout the year from the beginning to the end of the dataset. We
will separate each section by the brand of EVs, so that will provide a great
comparison for each EV manufacturer. Another pie chart will show the
composition of each car manufacturer’s EV in the entire dataset. We plan to
show a link between the pie chart and the stream graph. When the mouse is
placed on a section of the pie chart, the corresponding section in the stream
graph should be highlighted. Both the pie chart and the stream graph should
show ordering transitions from the smallest section to the largest. That
transition will provide a clear sense of what each manufacturer takes up the
largest share in the market. Moreover, there will be a parallel coordinate plot
to illustrate the specifications of each model. The parallel plot should
contain one hundred and four entries. There shall be six vertical axes,
featuring AccelSec, TopSpeed_KmH, Range_Km, Efficiency_WhKm, FastCharge_KmH,
and PriceDollars. If the number of car makes are reasonably small, each entry
should be encoded with color, otherwise, there will be a selection box on the
side for the user to enter their desired make. Finally, there will be a line
chart to show the stock market changes for those car manufacturers. This will
guide potential investors to decide whether they want to purchase stocks or
bonds. There shall also be a link between the parallel coordinate plot and
the line chart.

## Storytelling Process:
The storytelling process is following the martini glass structure. The project
 will be divided into multiple, ideally four to five, pages. The first page
 will include general information about EVs. Those will be provided by the
 developers and users can not interact with those. After that, the user can
 see data visualizations in the following pages with those four different
 visualization methods, and they can come up with their own conclusions.

## Sequencing Process:
Initially, we will introduce EVs as a possible solution for Climate Change.
Transportation is the largest source of global warming emissions and air
pollution for the state of California (California Air Resources Board), so
focusing on EVs is a good idea in order to help fight against climate change.
Specifically, California is attempting to turn 100% of new vehicles into EVs by
the year 2035. Nationwide, the IRS is giving out Clean Vehicle credits to
incentivize purchasing EVs. Due to this focus on EVs in the current climate,
it is important to discuss all of the different variations on the market. The
different variations (brands) will have different features, horsepower, etc.
that are important when deciding on purchasing an EV. Using this information,
we will help the user to make an informed purchasing decision based on their
individual needs. Some users may need more internal features, others may need
more distance. Our data analysis and visualizations will help users find the
best EVs for their specific needs.

## General Outlook:
The general outlook would be from introduction to EV specifications. It will
be followed by charging station information and stock market change. The last
part is the EV population in the state of Washington.

## Tentative Timeline:
The team will finish the proposal on 23 February 2024. From 24 February
2024 to 2 March 2024, the team will finish data processing, HTML framework,
the introduction page of the visualization, and start with some basic graphs.
From 3 March 2024 to 9 March 2024, the team will finish all data
visualizations, adding necessary interactions and animations to those graphs.
The team will finish every coding part before 12 March 2024. From 13 March 2024
to 15 March 2024, the team will finish the final report. The team will finish
the presentation slides before 18 March 2024. 

## Division of Work:
Boquan handles data processing, HTML framework development, Stream graph, and
Pie chart. Alex will build a parallel plot and line chart for the EV stocks.
Haosen will build the introduction page, and the heat map for charging station
density.

## Conclusion:
EVs, especially in California, are a future solution for climate change,
helping to dramatically reduce global warming emissions and air pollution. Due
to the importance of EVs, effective analysis and visualizations are necessary
in order to evaluate the pros and cons of the different EVs. Our group will
achieve this by evaluating many different aspects of EVs, like price and
range. With this information, the consumers can choose the EV necessary for
their needs and thus make an informed purchasing decision.
