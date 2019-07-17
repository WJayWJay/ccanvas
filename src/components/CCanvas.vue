<template>
  <div class="hello">
    <div>
      <h2>canvas</h2>
      <div class="my-canvas">
        <canvas id="my" ref="my"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as PIXI from 'pixi.js'
import paper, { view } from 'paper';

// import zrender from 'zrender';

const { Text, Container, Graphics } = PIXI;

let app: any = null;

@Component
export default class CCanvas extends Vue {
  @Prop() private msg!: string;
  size = {w: 300, h: 300};

  mounted () {
    this.init();
    // this.initZrender();
  }


  init() {
    if (app) return app;
    var P = {};
    paper.install(P);
    paper.setup('my');
    // eslint-disable-next-line
    const { Path, Point, view, Tool, PointText } = P;

    // The amount of points in the path:
    var points = 25;

    // The distance between the points:
    var length = 35;
    
    var alpha = 'abcdefghijklmnopqrstuvwxyz';

    var path = new Path({
      // strokeColor: '#E4141B',
      strokeColor: '#ffffff',
      strokeWidth: 20,
      strokeCap: 'round'
    });
    path.data.tArr = [];
    // window.view = view
    // var start = view.center / [10, 1];
    var start = view.center.divide([10, 1]);
    console.log(view, start)

    var msg = 'you are the best thing in the world The contents of the point text'.split(" ");

    points = msg.length + 2

    var textArr = [];
    var text;
    var point;
    var lenArr = [];
    for (var i = 0; i < points; i++) {
      point = new Point(i * length, 0);
      lenArr[i] = 0;
      // if (msg[i]) {
      //   var t = msg[i].split("")
      //   t.forEach((e,x) => {
      //     text = new PointText(start.add(point))
      //     text.justification = 'center';
      //     text.fillColor = 'black';
      //     text.content = e || '';

      //     text.point = text.point.add([text.bounds.width + 0, 0])

      //     lenArr[i] = lenArr[i] + text.bounds.width;
      //   });
      // }

      if (msg[i]) {
        text = new PointText(start.add(point))
        text.fillColor = 'black';
        text.content = msg[i] || '';
        path.data.tArr.push(text);
      }

      path.add(start.add(point))
      
      // path.data.tArr.push(text);
    }
      // path.add(start.add(new Point(i * length, 0)));

    function onMouseMove(event) {
      path.firstSegment.point = event.point;
      // path.data.tArr[0].point = event.point;
      for (var i = 0; i < points - 1; i++) {
        var segment = path.segments[i];
        // console.log(segment.curve)
        // if (segment.curve) {
        //   var cp = segment.curve.getPointAtTime(0.5);
        //   console.log(cp.angle, 'angle')
        // }
        if (path.data.tArr[i]) {
          var cp = segment.curve.getPointAtTime(0);
          var cp1 = segment.curve.getPointAtTime(0.5);
          var cp2 = segment.curve.getPointAtTime(1);
          // i === 0 && console.log(cp.angle, cp1.angle, cp2.angle, 'angle')
          path.data.tArr[i].point = segment.point;
          path.data.tArr[i].rotation = cp2.angle
          // path.data.tArr[i].rotate(cp.angle, segment.point);
        }
        var nextSegment = segment.next;
        // var vector = segment.point - nextSegment.point;
        var vector = segment.point.subtract( nextSegment.point );
        // console.log(vector, vector.length, 'vvv')

        vector.length = length;

        // nextSegment.point = segment.point - vector;
        nextSegment.point = segment.point.subtract( vector );
        
      }
      path.smooth({ type: 'continuous' });

    }

    // path.fullySelected = true;

    // function onMouseDown(event) {
    //   path.fullySelected = true;
    //   path.strokeColor = '#e08285';
    // }

    // function onMouseUp(event) {
    //   path.fullySelected = false;
    //   path.strokeColor = '#e4141b';
    // }

    var tool = new Tool()
    tool.onMouseMove = onMouseMove;
    // tool.onMouseDown = onMouseDown;
    // tool.onMouseUp = onMouseUp;

    
  }


  destroy () {
    // app.destroy();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .my-canvas > canvas{
    border: 1px solid red !important;
    height: 100%;
    width: 100%;
  }
</style>
