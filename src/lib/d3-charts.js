import * as d3 from 'd3'

export const MultiLineChart = (
  data,
  {
    x = (d) => d.x,
    y = (d) => d.y,
    z = () => 1,
    xType = d3.scaleLinear,
    yType = d3.scaleLinear,
    xTitle = 'x axis label',
    yTitle = 'y axis title',
    color = ['#e57310', '#2e598a'],
    width = 650,
    height = 350,
    marginTop = 30,
    marginRight = 60,
    marginBottom = 40,
    marginLeft = 50
  } = {}
) => {
  const X = d3.map(data, x)
  const Y = d3.map(data, y)
  const Z = d3.map(data, z)
  const I = d3.range(X.length)

  // dimensions
  // const xDomain = d3.extent(X)
  const xDomain = [d3.min(X) - 0.1, d3.max(X) + 0.1]
  const yDomain = [0, d3.max(Y)]
  const zDomain = new d3.InternSet(Z)
  const xRange = [marginLeft, width - marginRight]
  const yRange = [height - marginBottom, marginTop]

  const colorMatch = (z) => {
    const k = Array.from(zDomain)
    const obj = k.reduce((p, c, i) => {
      return { ...p, [c]: color[i] }
    }, {})

    return obj[z]
  } 

  // scales
  const xScale = xType(xDomain, xRange)
  const yScale = yType(yDomain, yRange).nice()

  // line generator
  const line = d3
    .line()
    .x((i) => xScale(X[i]))
    .y((i) => yScale(Y[i]))

  // build the chart
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', [0, 0, width, height])

  // axes
  // x axis and axis title
  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(X)
    .tickFormat(d3.format('d'))
    .tickSizeOuter(0)

  svg
    .append('g')
    .attr('transform', `translate(0, ${height - marginBottom})`)
    .call(xAxis)

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('fill', 'currentColor')
    .attr('font-size', 14)
    .attr('x', width / 2)
    .attr('y', height - 5)
    .text(xTitle)

  // y axis and axis title
  const yAxis = d3.axisLeft(yScale)

  svg.append('g').attr('transform', `translate(${marginLeft}, 0)`).call(yAxis)

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('font-family', 'sans-serif')
    .attr('fill', 'currentColor')
    .attr('font-size', 14)
    .attr('x', (-height + marginBottom) / 2)
    .attr('y', 15)
    .text(yTitle)

  // add line to graph
  svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
    .attr('d', line(I))
    .selectAll('path')
    .data(d3.group(I, (i) => Z[i]))
    .join('path')
    .style('mix-blend-mode', 'multiply')
    .attr('stroke', ([z]) => colorMatch(z))
    .attr('d', ([, I]) => line(I))

  // add labels to lines
  svg
    .selectAll('labels')
    .data(d3.group(I, (i) => Z[i]))
    .join('g')
    .append('text')
    .datum((d) => ({
      id: d[0],
      x: xScale(X[d[1][d[1].length - 1]]),
      y: yScale(Y[d[1][d[1].length - 1]])
    }))
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
    .attr('fill', (d, i) => colorMatch(Z[i]))
    .text((d) => d.id)
    .attr('x', 10)
    .attr('text-anchor', 'start')
    .attr('dy', '0.35em')
    .attr('font-size', 14)
    .attr('font-family', 'sans-serif')

  // add points to graph
  svg
    .append('g')
    .selectAll('dots')
    .data(data)
    .join('circle')
    .attr('r', 6)
    .attr('cx', (d, i) => xScale(X[i]))
    .attr('cy', (d, i) => yScale(Y[i]))
    .attr('fill', (d, i) => colorMatch(Z[i]))
    .attr('stroke', 'white')
    .attr('stroke-width', 2)

  // add label to points
  const labels = svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .attr('stroke-linejoin', 'round')
    .selectAll('g')
    .data(I)
    .join('g')
    .attr('transform', (i) => `tranlate(${xScale(X[i])}, ${yScale(Y[i])})`)

  labels
    .append('text')
    .attr('x', (i) => xScale(X[i]))
    .attr('y', (i) => yScale(Y[i]))
    .text((i) => Y[i])
    .attr('fill', (i) => colorMatch(Z[i]))
    .attr('text-anchor', 'middle')
    .attr('dy', '-0.75em')

  return svg.node().outerHTML
}
