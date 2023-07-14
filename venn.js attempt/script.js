// define the data
var data = [
    {sets: ['Team A'], size: 8, image: 'teamA_image_url', hoverImage: 'teamA_hover_image_url', link: 'teamA_link_url'},
    {sets: ['Team B'], size: 9, image: 'teamB_image_url', hoverImage: 'teamB_hover_image_url', link: 'teamB_link_url'},
    {sets: ['Team C'], size: 9, image: 'teamC_image_url', hoverImage: 'teamC_hover_image_url', link: 'teamC_link_url'},
    {sets: ['Team A', 'Team B'], size: 2, image: 'sharedAB_image_url', hoverImage: 'sharedAB_hover_image_url', link: 'sharedAB_link_url'},
    {sets: ['Team A', 'Team C'], size: 2, image: 'sharedAC_image_url', hoverImage: 'sharedAC_hover_image_url', link: 'sharedAC_link_url'},
    {sets: ['Team B', 'Team C'], size: 2, image: 'sharedBC_image_url', hoverImage: 'sharedBC_hover_image_url', link: 'sharedBC_link_url'},
    {sets: ['Team A', 'Team B', 'Team C'], size: 5, image: 'sharedABC_image_url', hoverImage: 'sharedABC_hover_image_url', link: 'sharedABC_link_url'}
    //... other data points
  ];
  
  // create a new Venn diagram
  var chart = venn.VennDiagram();
  
  // select the div with id "venn" and render the diagram with the data
  d3.select("#venn").datum(data).call(chart);
  
  // Add images
  d3.selectAll("g")
    .append("svg:image")
    .attr("xlink:href", function(d) { return d.image; })
    .attr("width", "50px")
    .attr("height", "50px");
  
  // create a tooltip
  var tooltip = d3.select("body").append("div")
      .attr("class", "venntooltip");
  
  // Add interactivity
  d3.selectAll("g")
    .on("mouseover", function(d, i) {
      // highlight the current path
      d3.select(this).transition().duration(500).style("fill-opacity", 0.5);
  
      // show the tooltip
      tooltip.transition().duration(200).style("opacity", .9);
      tooltip.text(d.size + " people")
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
  
      // change the image
      d3.select(this).select("image")
          .attr("xlink:href", function(d) { return d.hoverImage; });
    })
    .on("mouseout", function(d, i) {
      // undo the highlight
      d3.select(this).transition().duration(500).style("fill-opacity", 0);
  
      // hide the tooltip
      tooltip.transition().duration(500).style("opacity", 0);
  
      // revert the image
      d3.select(this).select("image")
          .attr("xlink:href", function(d) { return d.image; });
    })
    .on("click", function(d, i) {
      // open a new page
      window.open(d.link, '_blank');
    });