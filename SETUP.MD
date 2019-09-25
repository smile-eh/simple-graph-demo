
# Setting up simple-graph-demo locally

This instruction set aims to get you up and running with the code locally so you can begin exploring with graphs!

It assumes you are familiar with python or other programming languages, are comfortable with terminals and that you have admin rights. You should also be comfortable debugging your own development environment.

## Prerequisites
 - [Neo4J Desktop](https://neo4j.com/), with admin rights
 - Python 3 ([Conda](https://conda.io/) suggested)
 - Linux or Mac suggested
 - Firefox (much faster with neovis.js library) or Chrome

## Get the repository
```sh
# Get the code
git clone https://github.com/smile-eh/simple-graph-demo.git
# Move into the code
cd simple-graph-demo
```


`/data`contains the CSV data from Data Explorer, both the raw original and a partially 'cleaned' version 

`/scripts` contains python scripts for cleaning the raw original CSV

`/queries` contains the cypher queries used for loading or retrieving data from the DB

`/static` and `index.html` are the content for Github Pages

## Set up environment (Conda)
```sh
# Make conda environment
conda create -n simple-graph-demo python=3.7
```
Press `Y` to proceed.

```sh
# Start the new environment
source activate simple-graph-demo
# Install the packages
python -m pip install -r scripts/requirements.txt
```

## Clean the data
We will use python to read the file `data/course_info_raw.csv`
The contents of the descriptions row will be cleaned and some acceptable rows will be written (or overwritten) to `data/course_info_cleaned.csv`

The deliminator will also be updated from a comma `,` to a pipe `|`

The data that will be written is just a subset of the original, modifying the script to clean all records will allow for proper exploration of the data set.
```sh
# Clean the raw file, writing the smaller output to the data folder
python scripts/clean_descriptions.py
```

The updated file has been written to `data/course_info_cleaned.csv`!

## Load data into Neo4J

Now the we have data that has been cleaned up a little we can load it into Neo4J.

### Create and set up the graph!
First we have to set up a graph to load data into. Open Neo4J Desktop and from the main screen, create a new graph.

Set the Graph Name to `my-introductory-graph` and the Password to `neo4-graph-demo-credentials1!`

![Create New Graph](docs/imgs/create_graph.png?raw=true "Creating a new graph in Neo4J Desktop")

Make sure to add the APOC Plugin!

Click on Manage then go to the Plugins tab, under APOC click `Install`

![Add APOC Plugin](docs/imgs/add_apoc.png?raw=true "Installing the APOC Plugin for Neo4J")

Next we go to the Terminal tab to get our graph install location.

![Terminal Tab Install Location](docs/imgs/terminal_highlight.png?raw=true "Viewing the Terminal tab in Neo4J Desktop with out Installation location Highlighted")

### Copy the data to the import folder at this location

If you are comfortable using a GUI, you can simply copy the file `data/course_info_cleaned.csv` to the import folder shown in the Terminal tab. I you'd like command line instructions, follow along below:

We highlight the blue text from AFTER the first tilde character `~` to the character just BEFORE the dollar sign `$`

Copy this text. Our install location is this (but yours will be different!)
```
/.config/Neo4j Desktop/Application/neo4jDatabases/database-d8.........3a9/installation-3.5.6
```

Back in our original bash terminal screen, the one we used to run python we will copy the data we cleaned into the import location for Neo4J.

In the following command you will have to replace the last portion with the location that you copied earlier:

```sh
cp data/course_info_cleaned.csv -t "/home/YOUR_USERNAME_HERE/YOUR_LOCATION_HERE/import/"
```

### Run the load query
Our graph is all set up and ready to read the data! First in a text editor we open the file `queries/load_courses_local.cypher`

This long query loads everything into the graph! Copy all of the text (`Ctrl + A` followed by `Ctrl + C`) then go back to the Neo4J Desktop. If your graph has not started yet, click start, then click on Neo4J Browser.

In the query box, paste (`Ctrl + V`) the long query we just copied. Press `Ctrl + Enter` to execute a multi-line query.

## Data work is complete!
Good work, everything is in Neo4J now! We can explore the data with the built in Neo4J Browser if we would like! For a little less CPU intensive visualizations, continue below for using the HTML page.

### Modifying the local HTML config
To get the HTML page to load from the local Neo4J Graph you just created all you have to do is modify one file! This file contains the connection details that the webpage uses to connect to the graph, so it is important to never post this file with real credentials unless you understand what you are doing.

None of the instructions given will post anything online or pose any risk, this is only a warning for if you perform future modifications. 

Open `static/javascript/index.js` then look at line 9 through line 11:
```
server_url: "bolt://cortex.da-an.ca:7687",
server_user: "neo4j",
server_password: "##dis@da2019##",
```

Modify this content to the following, it is the information we entered when creating our graph in Neo4J Desktop.
```
server_url: "bolt://localhost:7687",
server_user: "neo4j",
server_password: "neo4-graph-demo-credentials1!",
```
(Note the warning comments, they do no apply to what we are performing so don't worry)

Save the file and exit the editor. We are all complete, so now it is time to open the file `index.html` with Firefox!

Chrome will work but is not as fast when visualizing.

# Thanks for following along!
