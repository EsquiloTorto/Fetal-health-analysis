function heatmap() {
    // Import csv data
    var corr_data = d3.csv("../hedler/corr_data.csv", d3.autoType);

    // columns analyzed
    var columns = [
        'accelerations',
        'prolongued_decelerations',
        'abnormal_short_term_variability',
        'histogram_mean',
        'histogram_variance',
        'fetal_health'
    ];
    var n_columns = columns.length;

    corr_data.then( data => {
        // base parameters
        const width = 250;
        const height = 200;
        const cellWidth = width/n_columns;
        const cellHeight = height/n_columns;
        const fontSize = 10;
        const paddingRight = 250;
        const paddingBottom = 100;
        
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

        if (columns.indexOf(element)==n_columns-1){
            svg.selectAll()
            .data(data)
            .join('text')
                .attr('x', (columns.indexOf(element)+1.1)*cellWidth)
                .attr('y', function(d, i){ return (0.5 + i)*cellHeight + fontSize/2} )
                .text(function(d, i){ return columns[i] })
                .style('font-size', fontSize + 'px');
            };

    });
}
)}

function scatterplot() {
    // Import csv data
    var fetal_health = d3.csv("../dataset/fetal_health.csv", d3.autoType);

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
    d3.select("#x-select")
      .selectAll('myOptions')
     	.data(columns)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // add the options to the button
    d3.select("#y-select")
      .selectAll('myOptions')
     	.data(columns)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // add the options to the button
    d3.select("#r-select")
      .selectAll('myOptions')
     	.data(columns)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    const margin = { top: 20, right: 20, bottom: 80, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select('#chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

    /// Load the data from the CSV file
    fetal_health.then(data => {

    // Scale the data to fit within the plot
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.baseline_value), d3.max(data, d => +d.baseline_value)])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.baseline_value), d3.max(data, d => +d.baseline_value)])
      .range([height, 0]);
    
    const rScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.baseline_value), d3.max(data, d => +d.baseline_value)])
      .range([1, 10]);
  
    // Create the x-axis and y-axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
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
        .attr('r', 2)
        .attr('fill', 'steelblue')
        // Change color between categories in fetal_health
        .attr('fill', function(d) {
            if (d.fetal_health == 1) {
                return 'red';
            } else if (d.fetal_health == 2) {
                return 'green';
            } else {
                return 'blue';
            };
        });


    // Update the plot
    function updatePlotX() {
        // Get the selected x variable from the dropdown
        xVar = d3.select("#x-select").property("value");
        
        // Update the x scale domain
        xScale.domain([d3.min(data, d => +d[xVar]), d3.max(data, d => +d[xVar])]).range([0, width]);
    
        // Update the x axis
        svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);
    
        // Update the circles with the new x values
        circles.transition()
        .duration(1000)
        .attr('cx', function (d) { return xScale(d[xVar])});
    
    }
    
    // Listen for changes in the dropdown
    d3.select("#x-select").on("change", updatePlotX);

    // Update the plot y
    function updatePlotY() {
        // Get the selected y variable from the dropdown
        yVar = d3.select("#y-select").property("value");
    
        // Update the y scale domain
        yScale.domain([d3.min(data, d => +d[yVar]), d3.max(data, d => +d[yVar])]).range([height, 0]);
    
        // Update the y axis
        svg.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);
    
        // Update the circles with the new y values
        circles.transition()
        .duration(1000)
        .attr('cy', function (d) { return yScale(d[yVar])});
        
    }

    // Listen for changes in the dropdown
    d3.select("#y-select").on("change", updatePlotY);

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
    
    }
    d3.select("#r-select").on("change", updatePlotR);

        // Add brush functionality
        const brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on('brush', updateBrush);

    svg.append('g')
        .attr('class', 'brush')
        .call(brush);
    
    // Add counter for brushed circles
    const brushCounter = d3.selectAll('#brush-counter');

    // Create the counter
    const counter1 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', 0)
    .attr('y', height + 30)
    .text('Normal Fetus: 0');

    // Legend
    svg.append("rect")
    .attr("x", -15)
    .attr("y", height + 20)
    .attr("width", 9)
    .attr("height", 9)
    .style("fill", "red")

    // Create the counter
    const counter2 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', 180)
    .attr('y', height + 30)
    .text('Suspect Fetus: 0');

    // Legend
    svg.append("rect")
    .attr("x", 165)
    .attr("y", height + 20)
    .attr("width", 9)
    .attr("height", 9)
    .style("fill", "green")

    // Create the counter
    const counter3 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', 0)
    .attr('y', height + 50)
    .text('Pathogocial Fetus: 0');

    // Legend
    svg.append("rect")
    .attr("x", -15)
    .attr("y", height + 40)
    .attr("width", 9)
    .attr("height", 9)
    .style("fill", "blue")


    // Create the counter
    const counter4 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', 180)
    .attr('y', height + 50)
    .text('Total: 0');

    // Create the counter
    const counter5 = svg.append('text')
    .attr('class', 'counter')
    .attr('x', 0)
    .attr('y', height + 70)
    .text('Odds pathological: 0');

    let brushedCircles_1 = [];
    let brushedCircles_2 = [];
    let brushedCircles_3 = [];
    let brushedCircles_4 = [];

    function updateBrush(event) {
        if (event.selection) {
            // Get normal fetus
            brushedCircles_1 = circles.filter(function(d) {
                if (d3.select(this).attr('fill') === 'red') {
                    const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                    return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1]
                    && d3.select(this).attr('fill') === 'red';
                }
            })
            // Get suspect fetus
            brushedCircles_2 = circles.filter(function(d) {
                if (d3.select(this).attr('fill') === 'green') {
                    const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                    return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1]
                    && d3.select(this).attr('fill') === 'green';
                }
            })
            // Get pathogocial fetus
            brushedCircles_3 = circles.filter(function(d) {
                if (d3.select(this).attr('fill') === 'blue') {
                    const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                    return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1]
                    && d3.select(this).attr('fill') === 'blue';
                }
            })
            // Get total
            brushedCircles_4 = circles.style("fill", "gray").filter(function(d) {
                const [x, y] = [d3.select(this).attr("cx"), d3.select(this).attr('cy')];
                return x >= event.selection[0][0] && x <= event.selection[1][0]
                    && y >= event.selection[0][1] && y <= event.selection[1][1];
            }).style("fill", function(d) {
                if (d.fetal_health === 1) {
                    return 'red';
                } else if (d.fetal_health === 2) {
                    return 'green';
                } else {
                    return 'blue';
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
    
    });

};
