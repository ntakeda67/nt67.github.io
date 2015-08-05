(function(){
    function BubbleChart(arg){
	this.name = arg.name ? arg.name : 'bubbleChart';
	// チャートエリアのマージン
	this.margin = {top: 20, right: 20, bottom: 30, left: 40};
	// チャートエリアのサイズ
	this.width = 320 - this.margin.left - this.margin.right;
	this.height = 320 - this.margin.top - this.margin.bottom;
	
	this.data = [];

	this.bindTo = arg.bindTo;
	this.properties = {};

	// axis
	this.domain = {
	    x:[0,  this.width],
	    y:[0, this.height],
	    r:[0, 100] //magic
	};
	this.range = {
	    x:[this.margin.left,  this.width],
	    y:[this.height, this.margin.bottom],
	    r:[12,  30] //magic
	};
	this.scale = {
	    x:d3.scale.linear().domain(this.domain.x).range(this.range.x),
	    y:d3.scale.linear().domain(this.domain.y).range(this.range.y),
	    r:d3.scale.linear().domain(this.domain.r).range(this.range.r)
	};
	this.axis = {
	    x: d3.svg.axis().scale(this.scale.x).orient("bottom").tickSize(this.margin.bottom-this.height),
	    y: d3.svg.axis().scale(this.scale.y).orient("left").tickSize(this.margin.left-this.width)
	};
	
	this.svg = d3.select(arg.bindTo).append('svg')
	    .attr('width',   this.width + this.margin.left + this.margin.right)
	    .attr('height', this.height + this.margin.top + this.margin.bottom);

	this.viewport = this.svg.append('g').attr("clip-path", "url(#chartClip)");
	this.svg.append("defs").append("svg:clipPath")
	    .attr("id", "chartClip")
	    .append("svg:rect")
	    .attr("x", this.margin.left)
	    .attr("y", this.margin.bottom)
	    .attr("width", this.width)
	    .attr("height", this.height - this.margin.bottom);

    }
    BubbleChart.prototype.bindTo = function(){return this.bindTo};
    BubbleChart.prototype.name = function(){return this.name};
    BubbleChart.prototype.construct = function(){
	var that = this;
	this.zoom = d3.behavior.zoom()
	    .x(that.scale.x)
	    .y(that.scale.y)
	    .scaleExtent([1,2])
	    .on("zoom", function(){that.onZoom.apply(that, arguments);});

	this.drag = d3.behavior.drag()
	    .on("drag", function(){that.onDrag.apply(that, arguments);});
	
	this.svg.call(this.zoom).call(this.drag);

	this.svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", this.buildTranslateAttr(0, this.height))
	    .call(this.axis.x);

	this.svg.append("g")
	    .attr("class", "y axis")
	    .attr("transform", this.buildTranslateAttr(this.margin.left, 0))
	    .call(this.axis.y);
    };
    BubbleChart.prototype.removeData = function(num){
	var num = num ? num : 1;
	if(this.data.length <= num - 1) {
	    this.data = [];
	    return;
	}
	this.data = this.data.slice(num);
    };
    BubbleChart.prototype.addData = function(num){
	var num = num ? num : 1;
	for(var i = 0; i<num; i++){
	    this.data.push({
		id: this.data.length,
		x : Math.floor(Math.random() * this.domain.x[1]),
		y : Math.floor(Math.random() * this.domain.y[1]),
		r : Math.floor(Math.random() * this.domain.r[1])
	    });
	}
    };
    BubbleChart.prototype.draw = function(){
	var that = this;
	var plotData = this.viewport.selectAll('circle').data(this.data, function(d){return d.id});
	var bubbleClass = this.properties['bubbleClass'];
	
	plotData.enter().append('circle')
	    .attr('class', bubbleClass)
	    .attr("transform", function(){
		return that.transformBubble.apply(that, arguments);
	    })
	    .attr( 'r', function(d){return that.scale.r(d.r);});
	plotData.exit().remove();
	$(this.bindTo).trigger(this.name +'.draw', {length:this.data.length})
    };
    BubbleChart.prototype.property = function(key, value){
	if(value){
	    this.properties[key] = value;
	} else {
	    return this.properties[key];
	}
    };

    BubbleChart.prototype.buildTranslateAttr = function(x, y){
	return "translate(" + x + "," + y + ")";
    };
    BubbleChart.prototype.onZoom = function(){
	var duration = 0;
	var that = this;
	this.draw();
	//this.axis.x.tickValues(graph.createPriceTicks(zoom.scale()));
	this.svg.select(".x.axis").transition().duration(duration).call(this.axis.x);

//	this.axis.y.tickValues(graph.createIncomeTicks(zoom.scale()));
	this.svg.select(".y.axis").transition().duration(duration).call(this.axis.y);

	this.viewport.selectAll(".bubble").transition().duration(duration).attr("transform", function(){
	    return that.transformBubble.apply(that, arguments);
	});
    };
    BubbleChart.prototype.transformBubble = function(d){
	return this.buildTranslateAttr(this.scale.x(d.x), this.scale.y(d.y));
    };
    BubbleChart.prototype.onDrag = function(d){
	console.log('x', this.scale.x.domain(), this.domain.x);
	console.log('y',this.scale.y.domain(), this.domain.y);
	var dx = d3.event.dx,
	    dy = d3.event.dy;
	var tx = 0,
	    ty = 0;
	var previousTranslate = this.zoom.translate();
	var px = previousTranslate[0];
	var py = previousTranslate[1];
	if(this.scale.x.domain()[1] > this.domain.x[1] ) {
//	    console.log('limit x right');
	    tx = px + Math.max(dx,0);
	} else if (this.scale.x.domain()[0] < 0) {
//	    console.log('limit x left');
	    tx = 0;
	} else  {
	    tx = px + dx
	}
	if(this.scale.y.domain()[1] > this.domain.y[1]) {
//	    console.log('limit y top');
	    ty = py + Math.min(dy,0);
	} else if (this.scale.y.domain()[0] < 0) {
//	    console.log('limit y bottom');
	    ty = 0;
	} else {
	    ty = dy + py;
	}
	console.log('tx', tx,'ty', ty);
	this.zoom.translate([tx, ty]);
	this.svg.call(this.zoom.event);
    };

    function Bubble(arg){
	var arg = arg ? arg : {};
	this.x = arg.x ? arg.x : 0;
	this.y = arg.y ? arg.y : 0;
	this.r = arg.r ? arg.r : 0;
    }

    
    var chart = new BubbleChart({name:'bbc', bindTo:'div#chart'});
    chart.property('bubbleClass', 'bubble');
    chart.construct();

    $('button.changeBubble').click(function(){
	var num = parseInt($(this).attr('num'));
	if(num > 0) {chart.addData(num);}
	else        {chart.removeData(Math.abs(num));}
	chart.draw();
    });
    $(chart.bindTo).on('bbc.draw', function(event, arg){
	var arg = arg ? arg : {length:0};
	$('td#bubbleNum').text(arg.length);
    });


    chart.addData(1);
    chart.draw();
    
})();
