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
    this.getCellNeighbors = this.getCellNeighbors.bind(this);
    this.advanceCycle = this.advanceCycle.bind(this);
    this.getCellIndex = this.getCellIndex.bind(this);

    this.state = {
      width: 5,
      height: 5,
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

  advanceCycle(existingState) {
    console.log("Existing state:", existingState);

    const newState = existingState.map((cell) => {
      const neighboringIndexes = this.getCellNeighbors(cell.coordinates);
      const liveNeighbors = neighboringIndexes.filter(neighbor =>
        existingState[neighbor].age > 0);

      console.log("cell coords:", cell.coordinates, "live neighbors:", liveNeighbors.length);
      //
      if (cell.age > 0) {
        console.log("cell observed as live:", cell.coordinates);
        if (liveNeighbors.length === 2 || liveNeighbors.length === 3) {
          console.log("cell survives:", cell.coordinates);
          cell.age += 1;
        } else {
          console.log("cell dies:", cell.coordinates);
          cell.age = 0;
        }
      } else {
        console.log("cell observed as dead:", cell.coordinates);
        if (liveNeighbors.length === 3) {
          console.log("cell brought to life:", cell.coordinates);
          cell.age += 1;
        }
      }
      return cell;
    });

    console.log("New state:", newState);

    return newState;
  }

  getCellNeighbors(coordinates) {
    const cellRow = coordinates[0];
    const cellColumn = coordinates[1];
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

// Set top row value.
    if (cellRow === 0) {
      topRow = this.state.height - 1;
    } else {
      topRow = cellRow - 1;
    }

// Set bottom row value.
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

// Build array of neighboring coordinates.
    const neighboringCells = [topLeft, topCenter, topRight, centerLeft, centerRight, bottomLeft, bottomCenter, bottomRight];

//Collect indexes
    const neighboringIndexes = neighboringCells.map(neighbor => {
      return this.getCellIndex(neighbor);
    });
    return neighboringIndexes
  }

  getCellIndex(coordinates) {
    const index = (coordinates[0] * this.state.width) + coordinates[1];
    return index;
  }

  handleButtonClicked(value) {
    switch(value[0]) {
      case "size":
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
            console.log("Grid status:", this.state.gridCoordinates);
            break;
          case "advance":
            const copyOfCurrentState = this.state.gridCoordinates;
            console.log("Advance clicked. Current state:", copyOfCurrentState);

            const newState = this.advanceCycle(copyOfCurrentState);

            console.log("After function run. New state:", newState);
            // const incrementCycle = this.state.cycle + 1;
            //
            // this.setState({
            //   gridCoordinates: newState,
            //   cycle: incrementCycle,
            // });
            break;
          case "reset":
            const gridCopy = this.state.gridCoordinates;
            gridCopy.map(cell => {
              cell.age = 0;
            });
            this.setState({
              gridCoordinates: gridCopy,
              cycle: 0,
            });
            console.log("Grid reset. Grid:", this.state.gridCoordinates);
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
    const gridCopy = this.state.gridCoordinates;
    const cellIndex = this.getCellIndex(cellProps.coordinates);
    if (gridCopy[cellIndex].age !== 0) {
      gridCopy[cellIndex].age = 0;
    } else {
      gridCopy[cellIndex].age = 1;
    }

    this.setState({
      gridCoordinates: gridCopy,
    });
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
