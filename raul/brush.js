function brushing() {
    // Import csv data
    var fetal_data = d3.csv("../dataset/fetal_health.csv", d3.autoType);
    
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
  
    // Create the SVG element
    const svg = d3.select('#brush')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
    /// Load the data from the CSV file
    fetal_data.then(data => {
  
    // Scale the data to fit within the plot
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.mean_value_of_short_term_variability), d3.max(data, d => +d.mean_value_of_short_term_variability)])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.abnormal_short_term_variability), d3.max(data, d => +d.abnormal_short_term_variability)])
      .range([height, 0]);
  
    // Create the x-axis and y-axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    const brush = d3.brush()
        .on("start brush end", brushed);
  
    // Add the x-axis and y-axis to the plot
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
    
    svg.append('g')
      .call(yAxis);
  
  
    svg.append('text')
      .attr('transform', `translate(${width / 2}, ${height + margin.top + 20})`)
      .style('text-anchor', 'middle')
      .text('Mean Value of Short Term Variability');
  
    // Add the y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 17)
      .attr('x', 0 - (height / 2))
      .style('text-anchor', 'middle')
      .text('Abnormal Short Term Variability');
  
  
    // Create a scatter plot with color-coded points
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return xScale(d.mean_value_of_short_term_variability)})
        .attr('cy', d => yScale(d.abnormal_short_term_variability))
        .attr('r', 3.4)
        .style('fill', d => colorScale(d.fetal_health));
    
    // Create a legend for the color scale
    const legend = svg.selectAll('.legend')
      .data(colorScale.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);
  
    legend.append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', colorScale);
  
    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(d => d);
    
    // Add the brush
    svg.append("g")
      .call(brush)  
    })};
  
  // make a brused function
  function brushed(event) {
    const selection = event.selection;
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.mean_value_of_short_term_variability), d3.max(data, d => +d.mean_value_of_short_term_variability)])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => +d.abnormal_short_term_variability), d3.max(data, d => +d.abnormal_short_term_variability)])
      .range([height, 0]);
  
    const x0 = xScale.invert(selection[0][0]);
    const x1 = xScale.invert(selection[1][0]);
    const y0 = yScale.invert(selection[0][1]);
    const y1 = yScale.invert(selection[1][1]);
  
    const selectedData = data.filter(d => {
      return d.mean_value_of_short_term_variability >= x0 && d.mean_value_of_short_term_variability <= x1 &&
      d.abnormal_short_term_variability >= y0 && d.abnormal_short_term_variability <= y1;
    });
  
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const circles = svg.selectAll('circle')
        .data(selectedData)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return xScale(d.mean_value_of_short_term_variability)})
        .attr('cy', d => yScale(d.abnormal_short_term_variability))
        .attr('r', 3.4)
        .style('fill', d => colorScale(d.fetal_health));
  }