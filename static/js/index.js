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
        initial_cypher: "MATCH (n_cou:Course{code:'X042'})-[r_top:TOPIC]->(n_top:Topic{name_en:'Human Resources'}) WITH n_top, n_cou, r_top MATCH (n_cou)-[r_delvia:DELIVERED_VIA]->(n_deltyp:DeliveryType) RETURN n_top, n_cou, r_top, r_delvia, n_deltyp"
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
            "vizmenutitle": "Course > Topic > Delivery",
            "viztitle": `
                <h1>
                    First we get a course with it's topic and delivery method!
                </h1>
            `,
            "description": `
                <p>
                    In this example, we're picking a Course that we're interested in. In this case it's a Course
                    that is in Human Resouces with it's corresponding delivery method. <strong>We can find out individual information
                    about this content quickly and easily. But this is just the "anchor point"</strong>. The real power comes from exploring outward from what you choose.
                </p>                
            `,
            "cypher": `
                MATCH (n_cou:Course{code:'X042'})-[r_top:TOPIC]->(n_top:Topic{name_en:'Human Resources'}) 
                WITH n_top, n_cou, r_top
                MATCH (n_cou)-[r_delvia:DELIVERED_VIA]->(n_deltyp:DeliveryType)
                RETURN n_top, n_cou, r_top, r_delvia, n_deltyp
            `
        },
        {
            "cls": "menu-dd-2",
            "icon": "assignment",
            "vizmenutitle": "Topic > All Courses + All Delivery",
            "viztitle": `
                <h1>
                    For that same topic, now we get all courses and delivery methods.
                </h1>
            `,
            "description": `
                <p>
                    Once we start drilling down into information (all courses for the Human Resources topic), we can start to see interesting signals. For example,
                    with this topic (of human resources) we can see all the offerings <strong>only have one delivery method!</strong>. This could
                    help inform us that we might need to change how we offer this subject.
                </p>
            `,
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
            "vizmenutitle": "All Courses + All Delivery",
            "viztitle": `
                <h1>
                     Now we retreive all courses, topics, and delivery methods!
                </h1>
            `,
            "description": `
                <p>
                    Let's explore more of the graph. This will start to show us things which a table of information will be difficult to quickly see. 
                    For example. <strong>Notice how the Leadership topic only has instructor-led offerings, whereas Communications has a huge wealth of offerings, 
                    Human resouces is only offered Online.</strong> We can start to build a "big picture" from these kinds of explorations
               </p>
            `,
            "cypher": `
                MATCH (d:DeliveryType)<-[rr:DELIVERED_VIA]-(c:Course)-[r:TOPIC]->(n:Topic)
                RETURN d,c,n,r,rr 
            `
        },
        {
            "cls": "menu-dd-4",
            "icon": "assignment",
            "vizmenutitle": "Directors > Courses",
            "viztitle": `
                <h1>
                    Changing gears, we get the Directors and their courses.
                </h1>
            `,
            "description": `
                <p>
                   This is the beginning of another line of investigation. <strong>We will now start looking into organic communities.</strong> 
                   We will start by focusing on just the Courses a given director is responsible for. This should produce
                   a quick view into the portfolio of different directors.

                </p>
            `,
            "cypher": `
                MATCH (n:Course)-[r:DIRECTOR]->(nn:Person) 
                RETURN n, nn, r
            `
        },
        {
            "cls": "menu-dd-5",
            "icon": "assignment",
            "vizmenutitle": "Community > Director + Project Lead",
            "viztitle": `
                <h1>
                    Using that, we can begin to see the communities between Directors and the Project Leads!
                </h1>
            `,
            "description": `
                <p>
                    Exploring deeper, we can start to see which particular courses have inputs from different parts of the organization.
                    In this example let's look at the the project leads and the directors, and how they're respective portfolios line up.
                    This will show us which <strong>groups or individuals could benefit from collaboration</strong> (as their focus is similar)
                </p>
            `,
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
            "vizmenutitle": "The Rest (Trickier)",
            "viztitle": `
                <h1>
                    Getting the remaining people and the relationships between the courses complicates things!
                </h1>
            `,
            "description": `
                <p>
                    <strong>The challenge of graph representation is to be aware of what you're trying to show.</strong> You can select everything, but it might not show you what you're looking for.
                    Remember that it's always "the right tool for the job", for example: Don't think of Graphs as a one-to-one replacement for older Relational Databases (the common thing out there).
                    Graphs let you work with your data in a new way. Relational helps you get aggregate broad metrics, but it becomes more challenging to find paths of relationship, or visualize communities
                    in ways the made hidden insights more visible.
                </p>
                <p>
                    <h4>What can we do next?</h4>
                    <ul>
                    <li>By using different datasets we can start to discover signals we want to act on (what courses are being taken by which class, is there anything indicating trends we can act on)</li>
                    <li>Create deeper investigative powers to select a part of our data and explore out from there (what courses do we have on Mental Health, are they delivered in the most impactful way, do we need more online courses for this topic, etc)</li>
                    <li><Create relationships between datasets that were previously siloed or disconnected to increase the potential for hidden insight discovery (you dont know what you have until you put it all together)</li>
                    </ul>
                </p>
            `,
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
        {
            "cls": "menu-dd-7",
            "icon": "assignment",
            "vizmenutitle": "Community > Director + Topics",
            "viztitle": `
                <h1>
                    Using that, we can begin to see the communities between Directors and the Topics!
                </h1>
            `,
            "description": `
                <p>
                </p>
            `,
            "cypher": `
                MATCH (n:Course)-[r:DIRECTOR]->(nn:Person) 
                WITH n, r, nn 
                MATCH (n)-[rr:TOPIC]->(nnn:Topic) 
                WITH n, nn, nnn, r, rr 
                RETURN n, nn, nnn, r, rr
            `
        },
    ];
    // ok now to build up some html using some symbol replacement
    let menu_html = '';
    for (let i = 0; i < viz_items.length; i++) {
        menu_html += tmpl
            //.replace(/\%image/, viz[i].imgfile)
            .replace(/\%txt/, viz_items[i].vizmenutitle)
            .replace(/\%cls/, viz_items[i].cls)
            .replace(/\%icon/, viz_items[i].icon);
    }
    // put the generated html in the container
    $("#dropdown1").html(menu_html);
    $("#mobile-demo").html(menu_html);
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
                $("#vis_title").html(viz_items[e.data.i].viztitle);
                $("#vis_desc").html(viz_items[e.data.i].description);
                $('.sidenav').sidenav('close');
            }
        );
    }
    // trigger materializecss functionality
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();
});