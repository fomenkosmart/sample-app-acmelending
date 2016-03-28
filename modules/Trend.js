// modules/Trend.js
import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var echarts = require('echarts');
var ecConfig=require('echarts');
var dateFormat = require('dateformat');
var numeral = require('numeral');

export default class Trend extends Component {

	createChart() {
	    // Initialize after dom ready
	    var domElement = ReactDOM.findDOMNode(this);
	    this.chart = echarts.init(domElement);
	    this.updateChart(this.props);
  	}

  	updateChart(nextProps) {
		// give up quickly if props are empty.
		if (!nextProps) {
			return null;
		}
		var newChartOptions = this.makeChartOptions(nextProps);
		this.chart.setOption(newChartOptions);

		this.chart.on('CLICK', nextProps.onClick);
	}


	makeChartOptions(nextProps) {
		var items;
		if (!this.props.items) {
			items = [];
		} else {
			items = this.props.items;
		}

		var xAxis = items.map(function(item) {
			return dateFormat(new Date(item.group[0]), 'mm/dd/yyyy');
		});
		var yAxis1 = items.map(function(item) {
			return item.current.metrics.loan_amnt.sum.toFixed(0);
		});
		var yAxis2 = items.map(function(item) {
			return item.current.metrics.total_pymnt.sum.toFixed(0);
		});

		var option = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	show: true,
		    	data: ['Loan Amount','Total Payment']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : true,
		    dataZoom : {
		        show : true,
		        realtime : false,
		        start : 0,
		        end : 100
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : true,
		            data : xAxis
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel: {
		            	formatter: function (v) {
		            		var result;
		            		if (v > 99999) {
		            			result = '$' + numeral(v/1000).format('0,0') + ' k';
		            		} else {
		            			result = '$' + numeral(v).format('0,0');
		            		}
		            		return result;
		                }
		            }

		        }
		    ],
		    series : [
		        {
		            name:'Loan Amount',
		            type:'line',
		            data: yAxis1
		        },
		        {
		            name:'Total Payment',
		            type:'bar',
		            data: yAxis2
		        }
		    ]
		};
		
		return option;
	}

	componentDidMount() {
    	this.createChart();
  	}

	componentWillUnmount() {
		this.chart.dispose();
	}

	componentDidUpdate() {
		this.updateChart(this.props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	componentWillReceiveProps(nextProps) {
		this.updateChart(nextProps);
	}

	render(){
	  	return (
			<div style={{height: this.props.height, width: this.props.width}} />
    	)
	}

}
