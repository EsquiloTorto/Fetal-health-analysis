function main(){

    // const data = [1, 4, 9, 16]

    // d3.selectAll('svg')
    //     .data(data)
    //     .append('circle')
    //         .attr('opacity', 1)
    //         .attr('fill', 'black')
    //         .attr('cx', 200)
    //         .attr('cy', 100)
    //         .attr('r', 10)


    const width = 100;
    const height = 200;

    const svg = d3.selectAll('svg') 

    d3.csv('data/fetal_health.csv').then(function(data){
        
        console.log(data[1]);   

        // let rect = svg.selectAll("rect")
        //     .data(data)
        //     .join("rect")
        //     .attr('opacity', 1)
        //     .attr('fill', 'black')
        //     .attr('x', function(d, i){return i*2})
        //     .attr('y', 100)
        //     .attr('width', 1)
        //     .attr('height', d => d['baseline value']);

        var x = d3.scaleLinear()
        .domain([120, 150])
        .range([0, width]);

        let histogram = d3.histogram()
            .value(function(d) {return d['baseline value'];} )
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(70))
        
        var bins = histogram(data)
            
        var y = d3.scaleLinear()
            .range([height, 0]);
        
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    
        svg.append("g").call(d3.axisLeft(y));

        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append('rect')
                .attr('x', 1)
                .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
                .attr("height", function(d) { return height - y(d.length); })
                .style("fill", "#69b3a2")
    });
}