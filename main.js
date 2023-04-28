function heatmap() {
    // Import csv data
    var corr_data = d3.csv("./dataset/corr_total.csv", d3.autoType);

    // columns analyzed
    var columns = ['baseline value', 'accelerations', 'fetal_movement',
    'uterine_contractions', 'light_decelerations', 'severe_decelerations',
    'prolongued_decelerations', 'abnormal_short_term_variability',
    'mean_value_of_short_term_variability',
    'percentage_of_time_with_abnormal_long_term_variability',
    'mean_value_of_long_term_variability', 'histogram_width',
    'histogram_min', 'histogram_max', 'histogram_number_of_peaks',
    'histogram_number_of_zeroes', 'histogram_mode', 'histogram_mean',
    'histogram_median', 'histogram_variance', 'histogram_tendency',
    'fetal_health'];
    
    var n_columns = columns.length;

    corr_data.then( data => {
        // base parameters
        const width = 600;
        const height = 400;
        const cellWidth = width/n_columns;
        const cellHeight = height/n_columns;
        const fontSize = 10;
        const paddingRight = 30;
        const paddingBottom = 150;
        
        // svg container creation
        const svg = d3.select('#vini')
            .attr('width', width + paddingRight)
            .attr('height', height + paddingBottom)

        // fill scales
        const colorMin = 'blue';
        const colorMid = 'white';
        const colorMax = 'red';

        var scaleFill = d3.scaleDiverging()
            .domain([-1, 0, 1])
            .range([colorMin, colorMid, colorMax])

        columns.forEach( function(element){
            
            svg.selectAll()
            .data(data)
            .join('rect')
            .attr('width', cellWidth)
            .attr('height', cellHeight)
            .attr('x', columns.indexOf(element)*cellWidth )
            .attr('y', function(d, i){ return i*cellHeight } )
            .attr('fill', d => scaleFill(d[element]) );

            svg.selectAll()
            .data(data)
            .join('text')
            .attr('x', d => (0.5 + columns.indexOf(element))*cellWidth -fontSize/4*((Math.round(d[element]*100)/100).toString().length))
            .attr('y', function(d, i){ return (0.5 + i)*cellHeight + fontSize/2} )
            .text(d => Math.round(d[element]*100)/100 )
            .style('font-size', fontSize + 'px');

        if (columns.indexOf(element)==n_columns - 1){
            svg.selectAll()
            .data(data)
            .join('text')
                .attr('x', function(d, i){ return (i)*cellWidth + fontSize/2})
                .attr('y', (columns.indexOf(element)+2)*cellHeight)
                .text(function(d, i){ return columns[i] })
                .style('font-size', fontSize + 'px')
                // rotate each text in 45 degrees
                .attr('transform', function(d, i){ return 'rotate(45 ' + ((0.5 + i)*cellWidth + fontSize/2) + ',' + ((columns.indexOf(element)+1.8)*cellHeight) + ')' })
                ;
            };

    });
}
)};

/*
// TENTATIVA FALHA DE FAZER UMA FUNÇÃO ÚNICA DE UPDATE
// Update the plot
function updatePlot(variable) {

    // Get the selected variable from the dropdown
    var temp_dict = {}
    var x_params = {Var: d3.select("#x-select").property("value"),
                Axis: xAxis,
                Scale: xScale.domain([d3.min(data, d => +d[xVar]),
                 d3.max(data, d => +d[xVar])]).range([0, width])};

    var y_params = {Var: d3.select("#y-select").property("value"),
                Axis: yAxis,
                Scale: yScale.domain([d3.min(data, d => +d[yVar]),
                d3.max(data, d => +d[yVar])]).range([height, 0])};

    var r_params = {Var: d3.select("#r-select").property("value"),
                Axis: null,
                Scale: rScale.domain([d3.min(data, d => +d[rVar]),
                d3.max(data, d => +d[rVar])]).range([2, 10])};

    // Update variable parameters
    if (variable === 'x'){
        temp_dict = x_params;   

    } else if (variable === 'y'){
        temp_dict = y_params;

    } else if (variable === 'r'){
        temp_dict = r_params;
    };

    // Update Scale
    temp_dict.Scale.domain([d3.min(data, d => +d[temp_dict.Var]),
    d3.max(data, d => +d[temp_dict.Var])]).range([0, width]);

    if (temp_dict.Axis !== null) {
        svg.select("."+ variable +".axis")
        .transition()
        .duration(1000)
        .call(temp_dict.Axis);
        // Update the circles with the new x values
        circles.transition()
        .duration(1000)
        .attr('c' + variable, function (d) { return xScale(d[temp_dict.Var])});
    }   else {
        circles.transition()
        .duration(1000)
        .attr('r', function (d) { return rScale(d[temp_dict.Var])})
        .attr('opacity', 0.5);
    };
};
*/

// Scatterplot function
function scatterplot() {
    // Import csv data
    var fetal_health = d3.csv("./dataset/fetal_health.csv", d3.autoType);

    // Array with the name of the columns from the csv file
    var columns = ["baseline value", "accelerations",
    "fetal_movement", "uterine_contractions",
    "light_decelerations", "severe_decelerations",
    "prolongued_decelerations",
    "abnormal_short_term_variability",
    "mean_value_of_short_term_variability",
    "percentage_of_time_with_abnormal_long_term_variability",
    "mean_value_of_long_term_variability", "histogram_width",
    "histogram_min", "histogram_max",
    "histogram_number_of_peaks", "histogram_number_of_zeroes",
    "histogram_mode", "histogram_mean", "histogram_median",
    "histogram_variance", "histogram_tendency", "fetal_health"];

    // add the options to the button
    d3.selectAll("select")
      .selectAll('myOptions')
     	.data(columns)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    const margin = { top: 20, right: 200, bottom: 80, left: 60 };
    const width = 400;
    const height = 400;

    // Create the SVG element
    const svg = d3.select('#chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Rounded corners background
    svg.append("rect")
    .attr("x", -margin.left)
    .attr("y", -margin.top)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("rx", 10)
    .attr("ry", 10)
    .style("fill", "#A9A9A9");

    /// Load the data from the CSV file
    fetal_health.then(data => {

    // Scale the data to fit within the plot
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.baseline_value) - (d3.max(data, d => +d.baseline_value))*0.02,
                d3.max(data, d => +d.baseline_value)])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.baseline_value) - (d3.max(data, d => +d.baseline_value))*0.02,
                d3.max(data, d => +d.baseline_value)])
      .range([height, 0]);
    
    const rScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.baseline_value), d3.max(data, d => +d.baseline_value)])
      .range([1, 10]);
  
    // Create the x-axis and y-axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    // console.log(typeof )
    
    // Add the x-axis and y-axis to the plot
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
  
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
  
    // Create the circles
    const circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return xScale(d.baseline_value)})
        .attr('cy', function (d) { return yScale(d.baseline_value)})
        .attr('r', 3.5)
        .attr('fill', 'steelblue')
        .attr('opacity', 0.35)
        // Change color between categories in fetal_health
        .attr('fill', function(d) {
            if (d.fetal_health == 1) {
                return 'cyan';
            } else if (d.fetal_health == 2) {
                return 'magenta';
            } else {
                return 'yellow';
            };
        });

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height*1.1)
    .text("baseline_value");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("baseline_value");

        // Update the plot
    function updatePlotX() {
        // Get the selected x variable from the dropdown
        xVar = d3.select("#x-select").property("value");
        
        // Update the x scale domain
        xScale.domain([d3.min(data, d => +d[xVar]) - (d3.max(data, d => +d[xVar]))*0.02,
                    d3.max(data, d => +d[xVar])]).range([0, width]);

        // Update the x axis
        svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);

        // Update the circles with the new x values
        circles.transition()
        .duration(1000)
        .attr('cx', function (d) { return xScale(d[xVar])});

        // Update the x axis label
        svg.select(".x.label")
        .transition()
        .duration(1000)
        .text(xVar);

    };

    function updatePlotY() {
        // Get the selected y variable from the dropdown
        yVar = d3.select("#y-select").property("value");
    
        // Update the y scale domain
        yScale.domain([d3.min(data, d => +d[yVar]) - (d3.max(data, d => +d[yVar]))*0.02,
                        d3.max(data, d => +d[yVar])]).range([height, 0]);
    
        // Update the y axis
        svg.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);
    
        // Update the circles with the new y values
        circles.transition()
        .duration(1000)
        .attr('cy', function (d) { return yScale(d[yVar])});

        // Update the y axis label
        svg.select(".y.label")
        .transition()
        .duration(1000)
        .text(yVar);
        
    };

    // Update the plot r
    function updatePlotR() {
        // Get the selected r variable from the dropdown
        rVar = d3.select("#r-select").property("value");

        // Update the r scale domain
        rScale.domain([d3.min(data, d => +d[rVar]), d3.max(data, d => +d[rVar])]).range([2, 10]);

        // Update the circles with the new y values
        circles.transition()
        .duration(1000)
        .attr('r', function (d) { return rScale(d[rVar])})
        .attr('opacity', 0.5);

    };

    // Listen for changes in the dropdown
    d3.select("#x-select").on("change", updatePlotX);

    d3.select("#y-select").on("change", updatePlotY);

    d3.select("#r-select").on("change", updatePlotR);

    // Add brush functionality
    const brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on('brush', updateBrush);

    svg.append('g')
        .attr('class', 'brush')
        .style('opacity', .6)
        .call(brush);

    // Create the counter
    const counter1 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', width*1.1)
    .attr('y', 30)
    .text('Normal Fetus: 1655');

    // Legend
    svg.append("rect")
    .attr('x', width*1.07)
    .attr('y', 20)
    .attr("width", 9)
    .attr("height", 9)
    .style("fill", "cyan")

    // Create the counter
    const counter2 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', width*1.1)
    .attr('y', 60)
    .text('Suspect Fetus: 295');

    // Legend
    svg.append("rect")
    .attr('x', width*1.07)
    .attr('y', 50)
    .attr("width", 9)
    .attr("height", 9)
    .style("fill", "magenta")

    // Create the counter
    const counter3 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', width*1.1)
    .attr('y', 90)
    .text('Pathogocial Fetus: 176');

    // Legend
    svg.append("rect")
    .attr('x', width*1.07)
    .attr('y', 80)
    .attr("width", 9)
    .attr("height", 9)
    .style("fill", "yellow")


    // Create the counter
    const counter4 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', width*1.1)
    .attr('y', 120)
    .text('Total: 2126');

    // Create the counter
    const counter5 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', 0)
    .attr('y', height + 70)
    .text('Odds pathological: 0.10');

    let brushedCircles_1 = [];
    let brushedCircles_2 = [];
    let brushedCircles_3 = [];
    let brushedCircles_4 = [];

    function updateBrush(event) {
        if (event.selection) {
            // Get normal fetus
            brushedCircles_1 = circles.filter(function(d) {
                if (d3.select(this).attr('fill') === 'cyan') {
                    const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                    return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1]
                    && d3.select(this).attr('fill') === 'cyan';
                }
            })
            // Get suspect fetus
            brushedCircles_2 = circles.filter(function(d) {
                if (d3.select(this).attr('fill') === 'magenta') {
                    const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                    return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1]
                    && d3.select(this).attr('fill') === 'magenta';
                }
            })
            // Get pathogocial fetus
            brushedCircles_3 = circles.filter(function(d) {
                if (d3.select(this).attr('fill') === 'yellow') {
                    const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                    return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1]
                    && d3.select(this).attr('fill') === 'yellow';
                }
            })
            // Get total
            brushedCircles_4 = circles.style("fill", "gray").filter(function(d) {
                const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1];
            }).style("fill", function(d) {
                if (d.fetal_health === 1) {
                    return 'cyan';
                } else if (d.fetal_health === 2) {
                    return 'magenta';
                } else {
                    return 'yellow';
                }
            })
            ;
        }  
        counter1.text(`Normal Fetus: ${brushedCircles_1.size()}`);
        counter2.text(`Suspect Fetus: ${brushedCircles_2.size()}`);
        counter3.text(`Pathogocial Fetus: ${brushedCircles_3.size()}`);
        counter4.text(`Total: ${brushedCircles_4.size()}`);
        counter5.text(`Odds pathological: ${Math.round(brushedCircles_3.size()/brushedCircles_4.size()*100)/100}`)

    }     
    // Reset brush with #reset-brush button
    d3.select('#reset-brush').on('click', function() {
        svg.select('.brush').call(brush.move, null);
        circles.style('fill', function(d) {
            if (d.fetal_health === 1) {
                return 'cyan';
            } else if (d.fetal_health === 2) {
                return 'magenta';
            } else {
                return 'yellow';
            }
        });
        counter1.text(`Normal Fetus: 1655`);
        counter2.text(`Suspect Fetus: 295`);
        counter3.text(`Pathogocial Fetus: 176`);
        counter4.text(`Total: 2126`);
        counter5.text(`Odds pathological: 0.10`);
    });


    // histogram chart

    var hist = {
        "width" : 200,
        "height": 200,
        "bins" : 5,
        "binWidth" : null, 
        "binMargin" : 10,
        "svg": null,
        "xScale" : null,
        "yScale" : null,
    }

    hist.binWidth = hist.width/hist.bins
    hist.totalWidth = hist.width + (hist.bins-1)*hist.binMargin

    hist.svg = d3.select('#hist')
        .attr('width', hist.totalWidth)
        .attr('height', hist.height)

    hist.xScale = d3.scaleLinear()
        .domain([0, hist.bins])
        .range([0, hist.totalWidth])


    var histogram = d3.histogram()
        .value(function(d){ return d.baseline_value })
        .domain(hist.xScale.domain())
        .thresholds(hist.xScale.ticks(hist.bins))


    hist.svg.selectAll("rect")
        .data(data)
        .enter()
        .append('rect')
            .attr('width', hist.binWidth)
            .attr('height', function(d, i){ return d.baseline_value })
            .attr('fill', 'red')
            .attr('x', function(d, i){ return hist.xScale(i) })
            .attr('y', function(d, i){ return hist.height - d.baseline_value })

    }); // closing data 'then' statement
};
