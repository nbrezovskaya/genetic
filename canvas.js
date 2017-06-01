define([
    'libs/d3.min'
], function (d3) {
    var singleton = function () {
        return {
            init: function () {
                this.svgCanvas = d3.select('#canvas');
            },
            setupAdminPathDrawer: function() {
                var _this = this;
                this.terrainArray = '';
                this.obstaclesArray = '';
                $('#canvas').on('click', function(evt) {
                    var svg = evt.target.getBoundingClientRect();
                    var curPoint = {
                        x: evt.ctrlKey ? _this.prevPoint.x : Math.round((evt.clientX - svg.left) / _this.scale),
                        y: evt.shiftKey ? _this.prevPoint.y : Math.round((evt.clientY - svg.top) / _this.scale)
                    };
                    if (_this.prevPoint) {
                        _this.svgCanvas.append('line')
                            .attr('x1', _this.prevPoint.x)
                            .attr('y1', _this.prevPoint.y)
                            .attr('x2', curPoint.x)
                            .attr('y2', curPoint.y)
                            .style('stroke', 'red')
                            .style('stroke-width', '10')
                            .style('fill', 'none');
                        _this.terrainArray += ', ' + _this.pointToString(curPoint);
                        _this.obstaclesArray += '[' + _this.pointToString(_this.prevPoint) + ', ' + _this.pointToString(curPoint) + '], ';
                    } else {
                        _this.terrainArray += _this.pointToString(curPoint);
                    }
                    console.log(_this.terrainArray);
                    console.log(_this.obstaclesArray);
                    _this.prevPoint = curPoint;
                });
            },
            pointToString: function (point) {
                return '[' + point.x + ', ' + (this.height - point.y) + ']';
            },
            setSize: function (width, height) {
                this.width = width;
                this.height = height;
                var elementsWidth = 350;
                var padding = 25;
                var availableHeight = window.innerHeight - padding;
                var availableWidth = window.innerWidth - elementsWidth - padding;
                this.scale = Math.min(availableWidth / width, availableHeight / height);
                this.svgCanvas.attr('width', width * this.scale)
                    .attr('height', height * this.scale)
                    .attr('viewBox', '0 0 ' + width + ' ' + height);
                this.svgCanvas.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', width)
                    .attr('height', height)
                    .style('stroke', 'black')
                    .style('stroke-width', '10')
                    .style('fill', 'none');
                this.setupAdminPathDrawer();
            },
            clear: function () {
                this.svgCanvas.selectAll('*').remove();
            },
            clearTag: function (tag) {
                d3.selectAll('.' + tag).remove();
            },
            drawLine: function (x1, y1, x2, y2, tag, color, thickness, fill) {
                this.svgCanvas.append('line')
                    .attr('class', tag)
                    .attr('x1', x1)
                    .attr('y1', this.height - y1)
                    .attr('x2', x2)
                    .attr('y2', this.height - y2)
                    .style('stroke', color)
                    .style('stroke-width', thickness)
                    .style('fill', fill);
            },
            drawCircle: function (cx, cy, radius, tag, color, thickness, fill) {
                this.svgCanvas.append('circle')
                    .attr('class', tag)
                    .attr('cx', cx)
                    .attr('cy', this.height - cy)
                    .attr('r', radius)
                    .style('stroke', color)
                    .style('stroke-width', thickness)
                    .style('fill', fill);
            },
            drawPolyline: function (points, tag, color, thickness, fill) {
                var height = this.height;
                var svgPoint = points.map(function (point) {
                    return point.x + ',' + (height - point.y)
                });
                this.svgCanvas.append('polyline')
                    .attr('class', tag)
                    .attr('points', svgPoint.join(' '))
                    .style('stroke', color)
                    .style('stroke-width', thickness)
                    .style('fill', fill);
            },
            drawObject: function (x, y, size, scale, id, path) {
                this.svgCanvas.append('path')
                    .attr('d', path)
                    .attr('id', id)
                    .attr('transform', 'translate(' + (x - size * 0.5 * scale) + ',' + (this.height - y - size * scale) + ') scale(' + scale + ')')
                    .style('fill', '9c9c9c');
                return document.getElementById(id);
            },
            objectParams: function (landerType) {
                switch (landerType) {
                    case 'rocket':
                        return {
                            scale: 5,
                            size: 24,
                            offsetX: 12,
                            offsetY: 0,
                            path: 'M13.404 23h-2.808l-.96-2h4.728l-.96 2zm-8.323-7.365c-1.218 1.202-2.081 3.377-2.081 5.696 0 .884.127 1.789.405 2.669.255-1.837 1.122-3.2 3.162-3.773-.634-1.402-1.154-2.949-1.486-4.592zm13.83-.01c-.371 1.772-.92 3.333-1.477 4.602 2.039.573 2.906 1.936 3.161 3.773.278-.88.405-1.785.405-2.67 0-2.324-.867-4.504-2.089-5.705zm-6.926-15.625c-7.076 6.157-5.909 14.779-3.324 20h6.685c2.59-5.483 3.765-13.883-3.361-20zm.015 14c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm0-4c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z',
                            tickMs: 0.1
                        };
                    case 'boat':
                        return {
                            scale: 0.11,
                            size: 896,
                            offsetX: -279.5,
                            offsetY: -37.5,
                            path: 'M445,42c-175.517,129.119,-127.884,224.956,-116,857c90.884,0.0436,164.930,-0.457,245,-2c14.069,-626.542,59.493,-729.894,-122,-850Z',
                            tickMs: 0.1
                        };
                    case 'robot':
                        return {
                            scale: 5,
                            size: 24,
                            offsetX: 0,
                            offsetY: 0,
                            path: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z',
                            tickMs: 0.1
                        };
                }
            },
            animateObject: function (x, y, points, angles, landerType) {
                var params = this.objectParams(landerType);
                var obj = document.getElementById(landerType);
                if (!obj) {
                    obj = this.drawObject(x, y, params.size, params.scale, landerType, params.path);
                }
                var timeline = new TimelineLite({onUpdate: updateSlider});
                for (var i = 0; i < points.length; i++) {
                    timeline.to(obj, params.tickMs, {
                        x: points[i].x - params.size * 0.5 * params.scale + params.offsetX,
                        y: this.height - points[i].y - params.size * params.scale + params.offsetY,
                        rotation: -angles[i],
                        transformOrigin: '50%, 50%',
                        ease: Linear.easeNone
                    });
                }

                if (this.sliderInited) {
                    $('#slider').slider('destroy');
                }
                $('#slider').slider({
                    range: false,
                    min: 0,
                    max: 1,
                    step: 0.001,
                    slide: function (event, ui) {
                        timeline.progress(ui.value).pause();
                    }
                });
                this.sliderInited = true;
                $("#playAnimation").click(function () {
                    if (timeline.progress() === 1) {
                        timeline.restart()
                    } else {
                        timeline.play();
                    }
                });
                $("#pauseAnimation").click(function () {
                    timeline.pause();
                });
                function updateSlider() {
                    $("#slider").slider("value", timeline.progress());
                }

                timeline.play();
            }
        };
    };
    return singleton();
});




