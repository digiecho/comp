import React from "react";
// import ReactDOM from "react-dom";
import Sketch from "react-p5";
// import './styles.css';
import TextColorPicker from "./TextColorPicker";
import p5 from "react-p5";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { pushVideoURL } from "./features/counter/counterSlice";

class Draggable {
  constructor(p5, str, x, y, w, h, color, slider) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.str = str;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.color = color;
    this.slider = slider;

    this.over = () => {
      // Is mouse over object
      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.w &&
        p5.mouseY > this.y &&
        p5.mouseY < this.y + this.h
      ) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    };

    this.update = (baf, frameCount, color, sliderv) => {
      // Adjust location if being dragged
      if (color) {
        this.color = color;
      }
      if (sliderv) {
        this.slider = sliderv;
      }

      if (this.dragging) {
        this.x = p5.mouseX + this.offsetX;
        this.y = p5.mouseY + this.offsetY;
      }
      if (baf) {
        // console.log(baf)
        if (frameCount >= 60) {
          this.str = "After";
          if (frameCount >= 240) {
            this.str = "Before";
          }
        } else {
          this.str = "Before";
        }
      }
    };

    this.show = () => {
      //p5.stroke(10);
      // SVF state variable fill
      if (this.dragging) {
        p5.fill(50);
      } else if (this.rollover) {
        p5.fill(100);
      } else {
        let c = p5.color(this.color.r, this.color.g, this.color.b);
        p5.fill(c);
      }
      let n = Number(this.slider);
      p5.textSize(n);
      //console.log(this.slider);

      p5.text(this.str, this.x, this.y, this.w, this.h);
    };

    this.pressed = () => {
      // oject clicked/pressed

      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.w &&
        p5.mouseY > this.y &&
        p5.mouseY < this.y + this.h
      ) {
        this.dragging = true;
        // console.log("pressed should be dragging")
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - p5.mouseX;
        this.offsetY = this.y - p5.mouseY;
      }
    };

    this.released = () => {
      // Quit dragging
      this.dragging = false;
    };
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: 50,
      color: { r: "149", g: "219", b: "229" },
      smallr: "",
      baf: "Before",
      nextImage: false,
      reset: false,
      imageA: props.imageA,
      imageB: props.imageB,
      cwidth: 480,
      cheight: 270,
      numFrames: 140,
      recording: false,
      recordedFrames: 0,
      count: 0,
      mee: null,
      img: null,
      img2: null,
      frame: null,
      videoURL: props.videoURL,
    };
  }

  /////SETTERS
  SetSlider = (event) => {
    this.setState({ slider: event.target.value });
  };

  SetColor = (colorv) => {
    this.setState({ color: colorv });
  };

  SetBaf = (baf) => {
    this.setState({ baf: baf });
  };
  ReplaySketch = (p5) => {
    this.setState({ reset: true });
  };

  RecordFile = (p5) => {
    this.setState({ recording: true });
    this.setState({ reset: true });
    var canvas = document.querySelector("canvas");
    //  var p5 = canvas.getContext("2d");

    var video = document.querySelector("video");
    let videoStream = canvas.captureStream(30);
    let mediaRecorder = new MediaRecorder(videoStream);
    mediaRecorder.start();
    //setInterval(draw, 300);
    let chunks = [];
    mediaRecorder.ondataavailable = function (e) {
      console.log("data");
      chunks.push(e.data);
    };
    setTimeout(function () {
      mediaRecorder.stop();
    }, 6000);
    mediaRecorder.onstop = function (e) {
      var blob = new Blob(chunks, { type: "video/mp4" });
      // let chunks = [];
      var videoURL = URL.createObjectURL(blob);
      video.src = videoURL;
      // console.log(this.state.baf);
      this.setState({ URLvideo: video.src });
      // console.log(this.state.URLvideo)
      this.props.pushVideoURL(this.state.URLvideo);
    }.bind(this);
  };
  /////PRELOAD???

  preload = (p5) => {
    this.state.mee = p5.loadImage(require("./assets/smallr.gif"));
    this.state.img = p5.loadImage(this.state.imageA);
    this.state.img2 = p5.loadImage(this.state.imageB);
  };

  ///// SETUP ///////

  setup = (p5, parentRef) => {
    p5.createCanvas(480, 270).parent(parentRef);
    p5.frameRate(30);
    //create dragable objects with font
    //new Draggable(p5, str, x, y, w, h)
    p5.companyName = new Draggable(p5, "Pixie Dust", 20, 10, 250, 60);
    p5.beforeandafter = new Draggable(p5, this.state.baf, 20, 159, 170, 60);
    p5.textFont("Dancing Script");
  };

  /////DRAW SKETCH??????

  draw = (p5) => {
    if (this.state.reset) {
      this.setState({ reset: false });
      this.setState({ nextImage: false });
      p5.frameCount = 0;
      this.state.mee.reset();
    }

    //  p5.scale(0.25);
    p5.background(255);

    if (this.state.img) {
      p5.image(this.state.img, 0, 0, 480, 270);

      if (p5.frameCount >= 60) {
        this.state.nextImage = true;
      }

      if (this.state.nextImage) {
        p5.image(this.state.img2, 0, 0, 480, 270);
      }
    }

    // frame = this.state.mee.getCurrentFrame();
    if (p5.frameCount <= 120) {
      p5.image(this.state.mee, 0, 0, 480, 270);
      // la = p5.text(frame, 100, 100);
    }

    // p5.scale(4);

    p5.companyName.over();
    p5.companyName.update(null, null, this.state.color, this.state.slider);
    p5.companyName.show();

    p5.beforeandafter.over();
    p5.beforeandafter.update(
      this.state.baf,
      p5.frameCount,
      this.state.color,
      this.state.slider
    );
    p5.beforeandafter.show();
  };

  mousePressed = (p5) => {
    p5.companyName.pressed();
    p5.beforeandafter.pressed();
  };

  mouseReleased = (p5) => {
    p5.companyName.released();
    p5.beforeandafter.released();
  };

  render() {
    return (
      <div className="App">
        {/* <h1>react-p5</h1> */}
        <Grid container spacing={0} justify="center">
          <Grid>
            <Sketch
              setup={this.setup}
              draw={this.draw}
              preload={this.preload}
              clicked={this.clicked}
              mousePressed={this.mousePressed}
              mouseReleased={this.mouseReleased}
            />
          </Grid>

          <Grid>
            <input
              type="range"
              min={30}
              max={60}
              step={5}
              value={this.slider}
              onChange={this.SetSlider}
            />
          </Grid>
          <Grid>
            <TextColorPicker onSelectColor={this.SetColor} />
          </Grid>
          <Grid>
            <button aria-label="Increment value" onClick={this.ReplaySketch}>
              Replay
            </button>
            <button aria-label="Increment value" onClick={this.RecordFile}>
              Record
            </button>
          </Grid>
        </Grid>
        <Grid>
          <video autoPlay controls id="video" width="480" height="270"></video>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imageA: state.counter.img,
    imageB: state.counter.imgB,
    // videoURL: state.counter.videoURL,
  };
};

export default connect(mapStateToProps, { pushVideoURL })(App);
