import React from "react";
import "./index.css";

const cssClassMap = {
  "#": "bush",
  "*": "path",
  ">": "arrow-right",
  v: "arrow-down",
  "<": "arrow-left",
  "^": "arrow-top"
};

class EscapeMap extends React.Component {
  constructor() {
    super();
    this.timeoutId = null;
    this.state = {
      step: {
        num: 0,
        positionsCount: 0
      },
      person: {
        x: 0,
        y: 0,
        d: ""
      },
      finish: false
    };
  }
  componentDidMount() {
    this.init();
    this.processMove();
  }
  init = () => {
    this.setState({
      person: { ...this.props.initPosition }
    });
  };
  processMove = () => {
    const moves = this.props.moves,
      step = this.state.step;
    this.setState({
      step: {
        positionsCount: moves[step.num].positionsCount,
        num: this.state.step.num
      }
    });
    this.processPosition();
  };
  //Processing all positions inside a move, after process new move until done
  processPosition = () => {
    this.timeoutId = setTimeout(() => {
      const move = this.props.moves[this.state.step.num],
        position = move.positions[this.state.step.positionsCount - 1];
      this.setState({
        step: {
          positionsCount: this.state.step.positionsCount - 1,
          num: this.state.step.num
        },
        person: {
          x: position.x,
          y: position.y,
          direction: move.direction
        }
      });
      if (!this.state.step.positionsCount) {
        if (!this.props.moves[this.state.step.num + 1]) {
          this.setState({
            finish: true
          });
          return;
        }
        this.setState({
          step: {
            positionsCount: 0,
            num: this.state.step.num + 1
          }
        });
        this.processMove();
        return;
      }
      this.processPosition();
    }, 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  nextViewNavigation = () => {
    this.props.nextViewNavigation(this.props.nextView);
  };
  getSecondaryAdvices = () => {
    let advices = [];
    for (let i = 1; i < 6; i++) {
      if (this.props.moves[this.state.step.num + i]) {
        advices.push(
          <li key={i} className="secondary advice-text-item">
            <span className="advice-text_disabled">
              {this.props.moves[this.state.step.num + i].text}
            </span>
          </li>
        );
      } else if (!this.state.finish) {
        advices.push(
          <li key={i} className="secondary advice-text-item">
            <span className="advice-text_disabled">Finish!</span>
          </li>
        );
        return advices;
      }
    }
    return advices;
  };
  getRelativeCoords = () => {
    const TILE_SIZE=70,
      OFFSET=3,
      GRID_SIZE=6,
      w = this.props.dimensions.x,
      h = this.props.dimensions.y,
      px = this.state.person.x,
      py = this.state.person.y;
      //Relative grid top/left and person coordinates
    let y1 = 0, 
      x1 = 0,
      person_x_rel = 0,
      person_y_rel = 0;

    if (py - OFFSET <= 0) {
      y1 = 0;
      person_y_rel = py * TILE_SIZE;
    } else if (py + OFFSET >= h) {
      y1 = h - GRID_SIZE;
      person_y_rel = (py - y1) * TILE_SIZE;
    } else {
      y1 = py - OFFSET;
      person_y_rel = (py - y1) * TILE_SIZE;
    }
    if (px - OFFSET <= 0) {
      x1 = 0;
      person_x_rel = px * TILE_SIZE;
    } else if (px + OFFSET >= w) {
      x1 = w - GRID_SIZE;
      person_x_rel = (px - x1) * TILE_SIZE;
    } else {
      x1 = px - OFFSET;
      person_x_rel = (px - x1) * TILE_SIZE;
    }

    return { x1, y1, person_x_rel, person_y_rel };
  };
  getMapTiles = (x1, y1) => {
    const items = [],
      wayMatrix = this.props.wayMatrix;

    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 6; i++) {
        items.push(
          <div
            key={`${i}_${j}`}
            className={`tile ${getStylingClass(i + x1, j + y1)}`}
          />
        );
      }
    }

    return items;

    function getStylingClass(i, j) {
      if (wayMatrix[j] && wayMatrix[j][i]) {
        //Need this hack to imitate road movement for cases with long distances
        if (wayMatrix[j][i] === "*" && (i + j) % 2 === 0) {
          return cssClassMap[wayMatrix[j][i]] + "-even";   
        }
        return cssClassMap[wayMatrix[j][i]];
      } else {
        return "empty";
      }
    }
  };

  render() {
    const { x1, y1, person_x_rel, person_y_rel } = this.getRelativeCoords(),
      tiles = this.getMapTiles(x1, y1),
      secondaryAdvices = this.getSecondaryAdvices(),
      pd = this.state.person.direction;

    return (
      <div className="EscapeMap-wrapper">
        <div className="EscapeMap-map nes-container with-title">
          <h3 className="title EscapeMap-title">Escape Map</h3>
          <div className="EscapeMap-grid-wrapper">
            <div className="EscapeMap-grid">{tiles}</div>
            <div
              className="person"
              style={{ top: person_y_rel + "px", left: person_x_rel + "px" }}
            >
              <div className={`${cssClassMap[pd]}`} />
            </div>
          </div>
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={this.nextViewNavigation}
          >
            Try Again
          </button>
        </div>
        <div className="nes-balloon from-left EscapeMap-list">
          <ul className="nes-list is-circle">
            <li className="advice-text-item">
              <span className="advice-text">
                {this.state.finish
                  ? "Finish!"
                  : this.props.moves[this.state.step.num].text}
              </span>
            </li>
            {secondaryAdvices}
          </ul>
        </div>
      </div>
    );
  }
}

export default EscapeMap;
