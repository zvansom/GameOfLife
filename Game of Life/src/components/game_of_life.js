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
    this.getCellIndex = this.getCellIndex.bind(this);

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

  checkCellStatus(cellProps) {
    console.log("Cell coordinates:", cellProps.coordinates)
    const cellRow = cellProps.coordinates[0];
    const cellColumn = cellProps.coordinates[1];
    const cellIndex = this.getCellIndex(cellProps.coordinates);

    let leftColumn, rightColumn, topRow, bottomRow;

// Set left column value.
    if (cellColumn === 0) {
      leftColumn = this.state.width - 1;
    } else {
      leftColumn = cellColumn - 1;
    }

// Set right column value.
    if (cellColumn === this.state.width - 1) {
      rightColumn = 0;
    } else {
      rightColumn = cellColumn + 1;
    }

// Set top row.
    if (cellRow === 0) {
      topRow = this.state.height - 1;
    } else {
      topRow = cellRow - 1;
    }

// Set bottom row.
    if (cellRow === this.state.height - 1) {
      bottomRow = 0;
    } else {
      bottomRow = cellRow + 1;
    }

// Identify neighboring cells.
    const topLeft = [topRow, leftColumn];
    const topCenter = [topRow, cellColumn];
    const topRight = [topRow, rightColumn];
    const centerLeft = [cellRow, leftColumn];
    const centerRight = [cellRow, rightColumn];
    const bottomLeft = [bottomRow, leftColumn];
    const bottomCenter = [bottomRow, cellColumn];
    const bottomRight = [bottomRow, rightColumn];

    const neighboringCells = [topLeft, topCenter, topRight, centerLeft, centerRight, bottomLeft, bottomCenter, bottomRight];
    console.log(neighboringCells);

    neighboringCells.forEach(neighbor => {
      console.log(neighbor);
      const neighborIndex = this.getCellIndex(neighbor);
      console.log(this.getCellIndex([0, 0]))
    });
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
            console.log(this.state.gridCoordinates);

            break;
          case "advance":
            console.log("Control clicked: Advance");
            break;
          case "reset":
            console.log("Control clicked: Reset");
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  getCellIndex(coordinates) {
    console.log("Coordinates from method:", coordinates);
    const index = this.state.gridCoordinates.findIndex(x =>{
      console.log(`x: ${x.coordinates} , coords: ${coordinates}`)
      x.coordinates === coordinates});
      console.log(index);
      return index;
  }

  handleCellClicked(cellProps) {
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
          onCellClicked={this.checkCellStatus}
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
