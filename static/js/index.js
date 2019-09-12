// The script for the homepage of the data visualizer
var viz;

function draw() {
    var config = {
        container_id: "viz",
        server_url: "bolt://cortex.da-an.ca:7687",
        server_user: "neo4j",
        server_password: "##dis@da2019##",
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

// fires on doc ready
$(document).ready(function () {
    // trigger initial draw
    draw();

    // lets create some html snippets
    let tmpl =
        `<li>
            <a class="%cls">
                <em class="material-icons" aria-hidden="true">%icon</em> %txt
            </a>
        </li>`;
    // now lets create some visualizations with details
    let viz_items = [
        {
            "cls": "menu-dd-1",
            "icon": "assignment",
            "viztitle": "Course > Topic > Delivery",
            "description": "First we get a course with it's topic and delivery method!",
            "cypher": `
                MATCH (c:Course{code:'X042'})-[r:TOPIC]->(n:Topic{name_en:'Human Resources'}) 
                WITH n, c, r 
                MATCH (c)-[rr:DELIVERED_VIA]->(d:DeliveryType) 
                RETURN n, c, r, rr, d
            `
        },
        {
            "cls": "menu-dd-2",
            "icon": "assignment",
            "viztitle": "Topic > All Courses + All Delivery",
            "description": "For that same topic, now we get all courses and delivery methods. Note we only have one delivery method!",
            "cypher": `
                MATCH (c:Course)-[r:TOPIC]->(n:Topic{name_en:'Human Resources'}) 
                WITH n, c, r 
                MATCH (c)-[rr:DELIVERED_VIA]->(d:DeliveryType) 
                RETURN n, c, r, rr, d
            `
        },
        {
            "cls": "menu-dd-3",
            "icon": "assignment",
            "viztitle": "All Courses + All Delivery",
            "description": "Now we retreive all courses, topics, and delivery methods!",
            "cypher": `
                MATCH (d:DeliveryType)<-[rr:DELIVERED_VIA]-(c:Course)-[r:TOPIC]->(n:Topic)
                RETURN d,c,n,r,rr 
            `/*`
                MATCH (c:Course)-[r:TOPIC]->(n:Topic) 
                WITH n, c, r 
                MATCH (c)-[rr:DELIVERED_VIA]->(d:DeliveryType) 
                RETURN n, c, r, rr, d
            `*/
        },
        {
            "cls": "menu-dd-4",
            "icon": "assignment",
            "viztitle": "Directors > Courses",
            "description": "Changing gears, we get the Directors and their courses.",
            "cypher": `
                MATCH (n:Course)-[r:DIRECTOR]->(nn:Person) 
                RETURN n, nn, r
            `
        },
        {
            "cls": "menu-dd-5",
            "icon": "assignment",
            "viztitle": "Community > Director + Project Lead",
            "description": "Using that, we can begin to see the communities between Directors and the Project Leads!",
            "cypher": `
                MATCH (n:Course)-[r:DIRECTOR]->(nn:Person) 
                WITH n, r, nn 
                MATCH (n)-[rr:PROJECT_LEAD]->(nnn:Person) 
                WITH n, nn, nnn, r, rr 
                RETURN n, nn, nnn, r, rr
            `
        },
        {
            "cls": "menu-dd-6",
            "icon": "assignment",
            "viztitle": "The Rest (Trickier)",
            "description": "Getting the remaining people and the relationships between the courses complicates things!",
            "cypher": `
                MATCH (n:Course)-[r:DIRECTOR]->(nn:Person) 
                WITH n, r, nn 
                MATCH (n)-[rr:PROJECT_LEAD]->(nnn:Person) 
                WITH n, nn, nnn, r, rr 
                MATCH (n)-[rrr:PROGRAM_MANAGER]->(nnnn:Person) 
                WITH n, nn, nnn, nnnn, r, rr, rrr 
                MATCH (n)-[rrrr:POINT_OF_CONTACT]->(nnnnn:Person) 
                RETURN n, nn, nnn, nnnn, nnnnn, r, rr, rrr, rrrr
            `
        },
    ];
    // ok now to build up some html using some symbol replacement
    let menu_html = '';
    for (let i = 0; i < viz_items.length; i++) {
        menu_html += tmpl
            //.replace(/\%image/, viz[i].imgfile)
            .replace(/\%txt/, viz_items[i].viztitle)
            .replace(/\%cls/, viz_items[i].cls)
            .replace(/\%icon/, viz_items[i].icon);
    }
    // put the generated html in the container
    $("#dropdown1").html(menu_html);
    // loop through the items and enable the actions
    // note: index offset is weird, also passing data down into function is weird
    for (let i = 1; i <= viz_items.length; i++) {
        $(".menu-dd-" + i).on("click", { "i": (i - 1) },
            function (e) {

                //While waiting for the query to complete, display a spinner
                $("#loader").removeClass("query-complete");
                $("#loader").addClass("query-loading");

                //Send the query
                viz.renderWithCypher(viz_items[e.data.i].cypher.replace(/\n/, ' '), function () {

                    //Once the query has completed, hide the spinner
                    setTimeout(function () {
                        $("#loader").removeClass("query-loading");
                        $("#loader").addClass("query-complete");
                    }, 25);
                });
                $("p#vis_desc_par").text(viz_items[e.data.i].description);
            }
        );
    }
    // trigger dropdown functionality
    $(".dropdown-trigger").dropdown();
});