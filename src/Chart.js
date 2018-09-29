import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import * as d3 from 'd3';

export class Chart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.renderChart();
  }

  renderChart = () => {
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const svg = d3.select('svg');
    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .rangeRound([0, width]);

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);

    const line = d3.line()
      .x(d => {
        return x(d.time);
      })
      .y(d => {
        return y(d.close)
      });

    x.domain(
      d3.extent(
        this.props.data,
        d => {
          return d.time;
        })
    );
    const extent = d3.extent(
      this.props.data,
      d => {
        return d.close;
      });
    y.domain(extent);

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .select('.domain')
      .remove();

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price (USD)');

    g.append('path')
      .datum(this.props.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  };

  render() {
    return (
      <svg
        width={960}
        height={500}
        ref={node => this.node = node}
      />
    );
  }
}
