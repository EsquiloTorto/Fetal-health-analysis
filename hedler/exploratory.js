function main() {
    // Import csv data
    var corr_data = d3.csv("corr_data.csv", d3.autoType);

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
        const width = 200;
        const height = 200;
        const cellWidth = width/n_columns;
        const cellHeight = height/n_columns;
        const fontSize = 10;
        const paddingRight = 200;
        const paddingBottom = 100;
        
        // svg container creation
        const svg = d3.select('#vini')
            .attr('width', width + paddingRight)
            .attr('height', height + paddingBottom)
            .attr('style', 'background-color:whitesmoke')

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