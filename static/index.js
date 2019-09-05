// The script for the homepage of the data visualizer
var viz;

function draw() {
    var config = {
        container_id: "viz",
        server_url: "bolt://cortex.da-an.ca:7687",
        server_user: "neo4j",
        server_password: "##dis@da2019##",
        labels: {
            "Valhalla_Question": {
                "caption": "question",
                "size": "answer_total",
                "community": "community"
            },
            "Valhalla_Survey": {
                "caption": false,
                "size": 5,
                "community": "community"
            },
            "Valhalla_Response": {
                "caption": false,
                "size": 5,
                "community": "community"
            },
            "Valhalla_Respondent": {
                "caption": false,
                "size": 5
            }
        },
        relationships: {
            "AT_ORDER": {
                "caption": false
            }
        },
        initial_cypher: "MATCH (n:Valhalla_Respondent)-[r:LOCATED_IN]->(m:CP_CSD) RETURN n,r,m LIMIT 25"
    };

    viz = new NeoVis.default(config);
    viz.render();
    console.log(viz);

}