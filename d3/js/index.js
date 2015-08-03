(function(){
    function BubbleChart(arg){
	this.margin = {top: 20, right: 20, bottom: 30, left: 40};
	this.width = 960 - this.margin.left - this.margin.right;
	this.height = 500 - this.margin.top - this.margin.bottom;
	
	this.data = [];

	this.bindTo = arg.bindTo;

	this.svg = d3.select(arg.bindTo).append('svg')
	    .attr('width', this.width)
	    .attr('height', this.height);	
    }
    BubbleChart.prototype.removeData = function(num){
	var num = num ? num : 1;
	if(this.data.length < num) {
	    this.data = [];
	    return;
	}
	this.data = this.data.slice(num);
    }
    BubbleChart.prototype.addData = function(num){
	var num = num ? num : 1;
	for(var i = 0; i<num; i++){
	    this.data.push({
		id: this.data.length,
		x : Math.floor(Math.random() * 900),
		y : Math.floor(Math.random() * 500),
		r : Math.floor(Math.random() * 30)
	    });
	}
    }
    BubbleChart.prototype.draw = function(){
	var plotData = this.svg.selectAll('circle').data(this.data, function(d){return d.id});
	plotData.enter().append('circle')
	    .attr('cx', function(d){return d.x})
	    .attr('cy', function(d){return d.y})
	    .attr( 'r', function(d){return d.r});
	plotData.exit().remove();
    }

    function Bubble(arg){
	var arg = arg ? arg : {};
	this.x = arg.x ? arg.x : 0;
	this.y = arg.y ? arg.y : 0;
	this.r = arg.r ? arg.r : 0;
    }

    var chart = new BubbleChart({bindTo:'div#chart'});
    chart.addData(1);
    chart.draw();


    $('button.changeBubble').click(function(){
	var num = parseInt($(this).attr('num'));
	if(num > 0) {chart.addData(num);}
	else        {chart.removeData(Math.abs(num));}
	chart.draw();
    });
})();
