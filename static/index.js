// The script for the homepage of the data visualizer
var viz;

function draw() {
    var config = {
        container_id: "viz",
        server_url: "bolt://hobby-flfebcogogopgbkeljkgondl.dbs.graphenedb.com:24787",
        server_user: "app145858612-yIC45F",
        server_password: "b.rGPNgwTrb1pE.0Mso2YdIzvFxeYy1",
        labels: {
            "Topic": {
                "caption": "name_en",
                "size": 5
            },
            "Course": {
                "caption": "code",
                "size": 5,
                "community": 1919
            },
            "DeliveryType": {
                "caption": "type_en",
                "size": 5
            },
            "Person": {
                "caption": "name",
                "size": 5
            }
        },
        relationships: {
            "TOPIC": {
                "caption": false,
                "thickness": 5
            },
            "DELIVERED_VIA": {
                "caption": false,
                "thickness": 3
            },
            "DIRECTOR": {
                "caption": false,
                "thickness": 4
            },
            "PROGRAM_MANAGER": {
                "caption": false,
                "thickness": 3
            },
            "PROJECT_LEAD": {
                "caption": false,
                "thickness": 2
            },
            "POINT_OF_CONTACT": {
                "caption": false,
                "thickness": 1
            }
        },
        initial_cypher: "MATCH (c:Course{code:'X042'})-[r:TOPIC]->(n:Topic{name_en:'Human Resources'}) WITH n, c, r MATCH (c)-[rr:DELIVERED_VIA]->(d:DeliveryType) RETURN n, c, r, rr, d"
    };

    viz = new NeoVis.default(config);
    viz.render();
}