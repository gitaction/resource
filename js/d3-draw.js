var linkTo;
(function () {

    const radius = 5;
    const boundary = radius + 10;
    const swdevUrl = "https://docs.google.com/presentation/d/12AX2AwhVNNtQSqVQ1f4W6n6Tx4Ap3qk6t-seM_-iONc/edit#slide=id.g4e47216958033ce6_6";

    linkTo = function (name) {
        let element = {};
        for (let node of nodes) {
            if (node.id === name) {
                element.id = name;
                element.name = node.name;
                openModal(element);
            }
        }
    };

    function openModal(d, i) {
        switch (d.type) {
            case "cultural":
                window.open(swdevUrl, "_blank");
                break;
            case "process":
                console.log("process");
                break;
            case "outcome":
                console.log("outcome");
                break;
            default :
                console.log("default")
        }
    }

    function highlightLinks(d) {
        document.querySelectorAll(".link").forEach(n => {
            n.id != "key-link" && n.setAttribute("marker-end", "")
        });
        document.querySelectorAll(".c-" + d.id).forEach(n => {
            n.style.stroke = "black";
            n.setAttribute("marker-end", "url(#arrow)")
        });
    };

    function coolLinks(d) {
        document.querySelectorAll(".link").forEach(n => {
            n.id != "key-link" && n.setAttribute("marker-end", "url(#arrow-muted)")
        });
        document.querySelectorAll(".c-" + d.id).forEach(n => {
            n.style.stroke = "#dadce0";
        });
    };

    function renderNode(d, i) {
        if (!d.hasOwnProperty("dummy")) {
            let box = d3.select(this).on("mouseover", highlightLinks).on("mouseout", coolLinks)
                .on("touchstart", highlightLinks).on("touchend", coolLinks);
            text = box.append("text").attr("class", "bfd-textbox").on("click", openModal);
            let title = d.name.split(/\n/);
            let dy = 0.3 - (title.length - 1) * 0.6;
            for (let line of title) {
                let italic = " ";
                if (line.charAt(0) === "_" && line.charAt(line.length - 1) === "_") {
                    line = line.substring(1, line.length - 1);
                    italic = " italic ";
                }
                let tspan = text.append("tspan").attr("class", "bfd-text text" + italic + d.type + "-text").text(line)
                    .attr("dx", 10).attr("dy", dy.toString() + "em");
                dy += 1.2;
            }
            box.append("circle").attr("class", "bfd-circle node " + d.type).attr("r", radius);
            if (d.hasOwnProperty("cluster")) {
                box.append("text").attr("class", "text plus").attr("dx", "-3.5").attr("dy", "4").text("+");
            }
        }
    }

    const width = Math.min(window.innerWidth - 64, 1280);
    const height = window.innerHeight - 64;
    const columnFactor = width / 12;
    const rowFactor = height / 12;

    const svg = d3.select('#bfd').append("svg").attr("width", width).attr("height", height)
    const defs = svg.append("defs");
    defs.append("marker").attr("id", "arrow").attr("markerWidth", 10).attr("markerHeight", 10)
        .attr("refX", 10).attr("refY", 3).attr("orient", "auto").attr("markerUnits", "strokeWidth")
        .append("path").attr("d", "M0,0 L0,6 L9,3 z");
    defs.append("marker").attr("id", "arrow-muted").attr("markerWidth", 10).attr("markerHeight", 10)
        .attr("refX", 10).attr("refY", 3).attr("orient", "auto").attr("markerUnits", "strokeWidth")
        .append("path").attr("d", "M0,0 L0,6 L9,3 z").attr("class", "muted");

    let nodes = [
        {"id": "tbd", "name": "Trunk-Based\nDevelopment", "type": "cultural", "col": -5, "row": -9},
        {"id": "tdd", "name": "Test Driven\nDevelopment", "type": "cultural", "col": -5, "row": -7},
        {"id": "papp", "name": "Pairing and pair\nProgramming", "type": "cultural", "col": -5, "row": -5},
        {"id": "bsi", "name": "Build\nSecurity In", "type": "cultural", "col": -5, "row": -3},
        {"id": "fab", "name": "Fast\nAutomated Build", "type": "cultural", "col": -5, "row": -5},
        {"id": "adp", "name": "Automated Deployment\nPipeline", "type": "cultural", "col": -5, "row": 1},
        {"id": "eacd", "name": "Early and Continuous\nDeployment", "type": "cultural", "col": -5, "row": 3},
        {"id": "qadem", "name": "Quality and Debt Effectively\nManaged", "type": "cultural", "col": -5, "row": 5},
        {"id": "bfp", "name": "Build for\nProduction", "type": "cultural", "col": -5, "row": 7},

        {"id": "sb", "name": "Small\nBatches", "type": "process", "col": 0, "row": -8, "cluster": 2},
        {"id": "ff", "name": "Fast\nFeedback", "type": "process", "col": 0, "row": -6, "cluster": 2},
        {"id": "rep", "name": "Repeatability", "type": "process", "col": 0, "row": -4, "cluster": 2},
        {"id": "sc", "name": "Safer\nChanges", "type": "process", "col": 0, "row": -2, "cluster": 2},
        {"id": "rdr", "name": "Reduce Defects\n/re-work", "type": "process", "col": 0, "row": 2, "cluster": 2},
        {"id": "ccs", "name": "Clean Code\n/Simplicity", "type": "process", "col": 0, "row": 4, "cluster": 2},
        {"id": "dp", "name": "Delivery\n/Pace", "type": "process", "col": 0, "row": 2, "cluster": 2},
        {"id": "rel", "name": "Reliability", "type": "process", "col": 0, "row": 3, "cluster": 2},

        {"id": "df", "name": "Deployment\nFrequency", "type": "outcome", "col": 5, "row": -2},
        {"id": "lttc", "name": "Lead Time\nto Change", "type": "outcome", "col": 5, "row": -1},
        {"id": "cfr", "name": "Change\nFailure Rate", "type": "outcome", "col": 5, "row": 0},
        {"id": "mtr", "name": "Meantime\nto Recovery", "type": "outcome", "col": 2, "row": 1},
        {"id": "ava", "name": "Availability", "type": "outcome", "col": 2, "row": 2},
    ];

    let links = [
        {"source": "tbd", "target": "sb"},
        {"source": "tbd", "target": "ff"},
        {"source": "tbd", "target": "rdr"},
        {"source": "tbd", "target": "ccs"},
        {"source": "tdd", "target": "ff"},
        {"source": "tdd", "target": "rep"},
        {"source": "tdd", "target": "sc"},
        {"source": "tdd", "target": "ccs"},
        {"source": "papp", "target": "ff"},
        {"source": "papp", "target": "rep"},
        {"source": "papp", "target": "rdr"},
        {"source": "papp", "target": "ccs"},
        {"source": "bsi", "target": "rel"},
        {"source": "fab", "target": "ff"},
        {"source": "fab", "target": "rep"},
        {"source": "adp", "target": "sb"},
        {"source": "adp", "target": "ff"},
        {"source": "adp", "target": "rep"},
        {"source": "adp", "target": "rdr"},
        {"source": "eacd", "target": "sb"},
        {"source": "eacd", "target": "ff"},
        {"source": "eacd", "target": "rep"},
        {"source": "eacd", "target": "rdr"},
        {"source": "qadem", "target": "ccs"},
        {"source": "qadem", "target": "dp"},
        {"source": "bfp", "target": "ff"},
        {"source": "bfp", "target": "rel"},

        {"source": "sb", "target": "df"},
        {"source": "ff", "target": "df"},
        {"source": "ff", "target": "lttc"},
        {"source": "rep", "target": "df"},
        {"source": "rep", "target": "cfr"},
        {"source": "sc", "target": "cfr"},
        {"source": "rdr", "target": "lttc"},
        {"source": "rdr", "target": "cfr"},
        {"source": "ccs", "target": "lttc"},
        {"source": "dp", "target": "lttc"},
        {"source": "rel", "target": "cfr"},
        {"source": "rel", "target": "mtr"},
        {"source": "rel", "target": "ava"},
    ]

    function startDrag() {
        if (!d3.event.active) simulation.alpha(0.1).restart();
        highlightLinks(d3.event.subject);
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }

    function drag() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }

    function endDrag() {
        if (!d3.event.active) simulation.alpha(0);
        coolLinks(d3.event.subject);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }

    const link = svg.selectAll(".link").data(links).enter().append("path")
        .attr("class", d => "link muted c-" + d.source + " c-" + d.target)
        .attr("id", d => d.source + "_" + d.target)
        .attr("marker-end", "url(#arrow-muted)");
    const node = svg.selectAll(".node").data(nodes).enter().append("g")
        .call(d3.drag().on("start", startDrag).on("drag", drag).on("end", endDrag))
        .each(renderNode);

    const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-100))
        // .force('center', d3.forceCenter(width / 2, height / 2))
        .force("column", d3.forceX(n => n.col * columnFactor + width / 2).strength(1))
        .force("row", d3.forceY(n => n.row * rowFactor + height / 2).strength(1))
        .force('collide', d3.forceCollide().radius(d => 50))
        .force('link', d3.forceLink(links).id(d => d.id).strength(1));
    simulation.stop();

    simulation.on("tick", function (d) {
        link.attr("d", arc);
        d3.selectAll(".node")
            .attr("cx", d => d.x = Math.max(boundary, Math.min(width - boundary, d.x)))
            .attr("cy", d => d.y = Math.max(boundary, Math.min(height - boundary, d.y)));
        d3.selectAll(".text")
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    function arc(d) {
        if (d.target.hasOwnProperty("dummy")) return "";
        let dx = d.target.x - d.source.x;
        let dy = d.target.y - d.source.y;
        let dr = Math.sqrt(dx * dx + dy * dy) * 2;
        let arc = ["M", d.source.x, d.source.y, "A", dr, dr, 0, 0, 1, d.target.x, d.target.y];
        return arc.join(" ");
    }

    simulation.alpha(1).restart();

})();
