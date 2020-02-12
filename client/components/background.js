import React from 'react'
import * as d3 from 'd3'

class Background extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.draw()
  }

  draw() {
    let width = 800,
      height = 800,
      numOfDots = 100,
      gravity = 1
    let voronoi = d3.geom
      .voronoi()
      .x(function(d) {
        return d.x
      })
      .y(function(d) {
        return d.y
      })

    let nodes = d3.range(numOfDots).map(function() {
      return {radius: Math.random() * 3 + 2}
    })
    let root = nodes[0]
    let links = voronoi.links(nodes)

    nodes.forEach(function(d, i) {
      d.x = i * 3 + (width / 2 - numOfDots * 1.5)
      d.y = Math.random() * 10 + 190
    })

    links = []
    for (var i = 0; i < numOfDots; i++) {
      if (i !== 0 && Math.floor(Math.random() * 3)) {
        links.push({
          source: i,
          target: Math.floor(Math.random() * (numOfDots - 1)) + 1,
          value: 1
        })
      }
    }

    root.radius = 0
    root.fixed = true

    let force = d3.layout
      .force()
      .gravity(0.027)
      .charge(function(d, i) {
        return i ? -13 : -200
      })
      .nodes(nodes)
      .links(links)
      .friction(0.6)
      .linkStrength(0.6)
      .size([width, height])

    let svg = d3
      .select('#bg-graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    let node = svg
      .selectAll('circle')
      .data(nodes.slice(1))
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', function(d) {
        return d.radius
      })
      .style('fill', function(d, i) {
        return '#45aeb1'
      })
      .attr('opacity', function() {
        return Math.random() * 0.8
      })

    let link = svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('svg:line')
      .attr('class', 'link')
      .attr('opacity', 0)
      .style('stroke-width', function(d) {
        return Math.sqrt(d.value)
      })

    force.on('tick', function(e) {
      var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length

      while (++i < n) q.visit(this.collide(nodes[i]))

      svg
        .selectAll('circle')
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })
        .call(force.drag)

      svg
        .selectAll('line.link')
        .attr('x1', function(d) {
          return d.source.x
        })
        .attr('y1', function(d) {
          return d.source.y
        })
        .attr('x2', function(d) {
          return d.target.x
        })
        .attr('y2', function(d) {
          return d.target.y
        })
    })

    svg
      .selectAll('.link')
      .transition()
      .duration(6000)
      .attr('opacity', 0.1)
  }

  collide = node => {
    var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && quad.point !== node) {
        var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius
        if (l < r) {
          l = (l - r) / l * 0.5
          node.x -= x *= l
          node.y -= y *= l
          quad.point.x += x
          quad.point.y += y
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
    }
  }

  render() {
    return (
      <div>
        <h1>Background graph</h1>
        <div id="bg-graph" />
      </div>
    )
  }
}
export default Background
