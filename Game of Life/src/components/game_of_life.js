import React, { Component } from 'react';
import Table from './table.js';
import Button from './button.js';
import Counter from './counter.js';

class GameOfLife extends Component {
  constructor(props) {
    super(props);
    this.handleCellClicked = this.handleCellClicked.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.generateCoordinates = this.generateCoordinates.bind(this);
    this.checkCellStatus = this.checkCellStatus.bind(this);
    this.advanceCycle = this.advanceCycle.bind(this);

    this.state = {
      width: 60,
      height: 15,
      gridCoordinates: [],
      cycle: 0,
    }
  }

  generateCoordinates(columns, rows) {
    const rowCoordinates = [];
    let i, j;

  //Generate lists of coordinates by row.
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        const random = Math.round(Math.random());
        rowCoordinates.push({coordinates: [i, j], age: random });
      }
    }

    this.setState({
      gridCoordinates: rowCoordinates,
    });
  }

  componentDidMount() {
    this.generateCoordinates(this.state.width, this.state.height);
  }

  advanceCycle() {
    let existingGridCoords = this.state.gridCoordinates;
    this.state.gridCoordinates.forEach((cell, cellIndex) => {
      const neighboringCellStatus = this.checkCellStatus(cellIndex);
      if (neighboringCellStatus.length !== 2 || neighboringCellStatus.length !== 3) {
        existingGridCoords[cellIndex].age = 0;
      }
    });
    this.setState({
      gridCoordinates: existingGridCoords,
    });
  }

  checkCellStatus(cellIndex) {
    const topCenter = cellIndex - this.state.width;
    const topLeft = cellIndex - this.state.width - 1;
    const topRight = cellIndex - this.state.width + 1;
    const centerLeft = cellIndex - 1;
    const centerRight = cellIndex + 1;
    const bottomCenter = cellIndex + this.state.width;
    const bottomLeft = cellIndex + this.state.width - 1;
    const bottomRight = cellIndex + this.state.width + 1;

    const neighboringCells = [topLeft, topCenter, topRight, centerLeft, centerRight, bottomLeft, bottomCenter, bottomRight];
    const neighboringCellStatus = [];

    const filteredCells = neighboringCells.filter(neighbor => neighbor >= 0 && neighbor < this.state.gridCoordinates.length);

    const gridCoordsCopy = this.state.gridCoordinates;
    neighboringCells.forEach(neighbor => {
      if (neighbor < 0 || neighbor > gridCoordsCopy.length) {
        return;
      } else {
        if (gridCoordsCopy[neighbor].age > 0) {
          neighboringCellStatus.push(1);
        }
      }
    });
    console.log(neighboringCellStatus)
    return neighboringCellStatus;
    // console.log("Number of live neighbors:", neighboringCellStatus.length);
    // console.log(this.state.gridCoordinates[cellIndex].age);
  }

  handleButtonClicked(value) {
    switch(value[0]) {
      case "size":
      //Check if
        if (value[1][0] !== this.state.width && value[1][1] !== this.state.height) {
          this.setState({
            width: value[1][0],
            height: value[1][1],
          });
          this.generateCoordinates(value[1][0], value[1][1])
        }
        break;
      case "control":
        switch(value[1]) {
          case "play":
            this.collectCells();
            // console.log("Control clicked: Play");
            break;
          case "advance":
            this.advanceCycle();
            // console.log("Grid Coordinates:", this.state.gridCoordinates[3]);
            // console.log("Control clicked: Advance");
            break;
          case "reset":
            // this.checkCellStatus(65);
            // console.log("Control clicked: Reset");
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  handleCellClicked(cellProps) {
    const index = this.state.gridCoordinates.findIndex(x =>
      x.coordinates === cellProps.coordinates);
    this.checkCellStatus(index);
  }

  render() {
    const leftButtonStyle = "mt-4 btn btn-primary";
    const rightButtonStyle = "mt-4 btn btn-primary float-right";
    return (
      <div className="container">
        <Table
          rows={this.state.height}
          columns={this.state.width}
          coordinates={this.state.gridCoordinates}
          onCellClicked={this.handleCellClicked}
        />
        <div className="row my-3">
          <div className="col-md-4">
            <div className="btn-group">
              <Button
                handleButtonClicked={this.handleButtonClicked}
                value={["size", [60, 15]]}
                style={leftButtonStyle}
                buttonName="60 x 15" />
              <Button
                handleButtonClicked={this.handleButtonClicked}
                value={["size", [75, 18]]}
                style={leftButtonStyle}
                buttonName="75 x 18" />
              <Button
                handleButtonClicked={this.handleButtonClicked}
                value={["size", [90, 20]]}
                style={leftButtonStyle}
                buttonName="90 x 20" />
            </div>
          </div>
          <div className="col-md-4">
            <Counter
              cycle={this.state.cycle} />
          </div>
          <div className="col-md-4">
            <div className="btn-group">
              <Button
                handleButtonClicked={this.handleButtonClicked}
                value={["control", "reset"]}
                style={rightButtonStyle}
                buttonName="Reset" />
              <Button
                handleButtonClicked={this.handleButtonClicked}
                value={["control", "advance"]}
                style={rightButtonStyle}
                buttonName="Advance" />
              <Button
                handleButtonClicked={this.handleButtonClicked}
                value={["control", "play"]}
                style={rightButtonStyle}
                buttonName="Play" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOfLife;
