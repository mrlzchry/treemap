import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3'

// const url = [fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"),
// fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"),
// fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json")];

const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

function App() {
  // const [dataPledges, setDataPledges] = useState([]);
  // const [dataMovieSales, setDataMovieSales] = useState([]);
  const [dataVidGameSales, setDataVidGameSales] = useState([]);

  useEffect (() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      await fetch(url).then(response => response.json()).then(data => setDataVidGameSales(data));
    }
    catch (err) {
      console.error(err);
    }
  };

  // async function fetchData() {
  //   try {
  //     await Promise.all(url).then(response => Promise.all(response.map((item) =>{ 
  //       return item.clone().json()})))
  //       .then(data => {return (setDataPledges(data[0]), setDataMovieSales(data[1]), 
  //       setDataVidGameSales(data[2]))})
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
  // };

  // console.log(dataPledges);
  // console.log(dataMovieSales);
  console.log(dataVidGameSales);
  return (
    <div className="App">
      <header className="App-header">
        {/* <DrawTreeMap title="Tree Map" data={dataPledges} data2={dataMovieSales} data3={dataVidGameSales}></DrawTreeMap> */}
        <DrawTreeMap title="Video Game Sales"  data={dataVidGameSales}></DrawTreeMap>
      </header>
    </div>
  );
}

const DrawTreeMap = ({title,data}) => {
  const svgRef = useRef();
  const svgRef2 = useRef();
  const visRef = useRef();
  const h = 600;
  const w = 1000;


  const svg = d3.select(svgRef.current)
              .attr("height", h)
              .attr("width", w)
              .style("background", "#ffffff");

  const tooltip = d3.select(".App-header")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0);

  const hierarchy = d3.hierarchy(data, (node) => node['children'])
                      .sum((node) => node['value'])
                      .sort((node1, node2) => node2['value'] - node1['value']);

  const treemap = d3.treemap()
                    .size([w,h])

        treemap(hierarchy);
        console.log(hierarchy.leaves());

  const map = svg.selectAll('g')
                 .data(hierarchy.leaves())
                 .enter()
                 .append('g');

  const colourArr = [{console: 'Wii',
                 colour: '#7CEA9C'},
                {console: 'X360',
                 colour: '#55D6BE'},
                {console: 'GB',
                 colour: '#2E5EAA'},
                {console:'DS',
                 colour: '#5B4E77'},
                {console: 'NES',
                 colour: '#593959'},
                {console: 'PS2',
                 colour: '#DBCDC6'},
                {console: '3DS',
                 colour: '#EAD7D1'},
                {console: 'PS4',
                colour: '#DD99BB'},
                {console: 'SNES',
                colour: '#7B506F'}, 
                {console:'PS3',
                colour: '#1F1A38'},
                {console: 'PS',
                colour: '#466365'},
                {console: 'N64',
                colour: '#B49A67'},
                {console: 'GBA',
                colour: '#CEB3AB'},
                {console: 'PC',
                colour: '#C4C6E7'},
                {console: '2600',
                colour: '#BAA5FF'},
                {console: 'XB',
                colour: '#CEB3AB'},
                {console: 'PSP',
                colour: '#A18276'},
                {console: 'XOne',
                colour: '#7A918D'},
                
              ]

        map.append('rect')
           .attr('class', 'tile')
           .attr('data-name', (d) => d['data']['name'])
           .attr('data-category', (d) => d['data']['category'])
           .attr('data-value', (d) => d['data']['value'])
           .style('fill', (d) => {
             if (d['data']['category'] === 'Wii')
               return '#7CEA9C'
             if (d['data']['category'] === 'X360')
               return '#55D6BE' 
             if (d['data']['category'] === 'GB')
               return '#2E5EAA'
             if (d['data']['category'] === 'DS')
               return '#5B4E77'
             if (d['data']['category'] === 'NES')
               return '#593959'
             if (d['data']['category'] === 'PS2')
               return '#DBCDC6'
             if (d['data']['category'] === '3DS')
               return '#EAD7D1'
             if (d['data']['category'] === 'PS4')
               return '#DD99BB'
             if (d['data']['category'] === 'SNES')
               return '#7B506F'
             if (d['data']['category'] === 'PS3')
               return '#1F1A38'
             if (d['data']['category'] === 'PS')
               return '#466365'
             if (d['data']['category'] === 'N64')
               return '#B49A67'
             if (d['data']['category'] === 'GBA')
               return '#CEB3AB'
             if (d['data']['category'] === 'PC')
               return '#C4C6E7'
             if (d['data']['category'] === '2600')
               return '#BAA5FF'
             if (d['data']['category'] === 'XB')
               return '#AAC0AA'
             if (d['data']['category'] === 'PSP')
               return '#A18276'
             if (d['data']['category'] === 'XOne')
               return '#7A918D'
              
           })
           .attr('transform', (d) => `translate(${d['x0']}, ${d['y0']})`)
           .attr('width', (d) => {
           return (d['x1'] - d['x0'])
           })
           .attr('height', (d) => {
           return (d['y1'] - d['y0'])
           })
           .style('stroke', '#282c34')
           .on("mouseover", function(event) {
            tooltip.html("Name: " + this.getAttribute("data-name") + "<br>  Category: " + this.getAttribute("data-category") + "<br> Value: " + this.getAttribute("data-value"))
                  .attr("data-value", this.getAttribute("data-value"))
                  .style('left', `${event.pageX}px`)
                  .style('top', `${event.pageY}px`);
            tooltip.transition()
                  .duration(100)
                  .style("opacity", 0.9);
            
          })
            .on('mousemove', function(event) {
              return tooltip
                .style('top', `${event.pageY}px`)
                .style('left', `${event.pageX}px`);
            })
            .on('mouseout', function() {
                tooltip.html('');
                tooltip.transition()
                    .duration(100)
                    .style('opacity', 0);
            }
              )


        map.append('text')
           .text((d) => {
             return (`${d['data']['name']}`)
           })
           .attr("transform", (d) => `translate(${d['x0']}, ${d['y0'] + 10})`)
           .style('font-size', "10px") 
           .style('fill', '#ffffff')

  const svg2 = d3.select(svgRef2.current)
                 .attr('id', 'legend')
                //  .attr('x', 10)
                //  .attr('y', 200)
                 .attr('width', 220)
                 .attr('height', 550)
                 .style('background', '#282c34')

        svg2.selectAll('rect')
            .data(colourArr)
            .enter()
            .append('rect')
            .attr('class', 'legend-item')
            .attr('height', 20)
            .attr('width', 20)
            .attr('x', 10 )
            .attr('y', (d, i) => 520 - i*30)
            .style('fill', (d, i) => d['colour'])
        
        svg2.selectAll('text')
            .data(colourArr)
            .enter()
            .append('text')
            .text((d) => d['console'])
            .attr('x', 35)
            .attr('y', (d, i) => 535 - i*30)
            .style('font-size', '14px')
            .style('fill', '#ffffff')

return(
<React.Fragment>
  <h1 id="title">{title}</h1>
  <h5 id="description">Top 100 Most Sold Video Games Grouped by Platform</h5>
  <div ref={visRef}>
    <svg ref={svgRef}></svg>
    <svg ref={svgRef2}></svg>
  </div>
  <h6 class='creator'>Created by Ammarul</h6>
  <h6><a href="https://github.com/mrlzchry/treemap" class='link'>Source Code</a></h6>
 
</React.Fragment>
)
}

export default App;
