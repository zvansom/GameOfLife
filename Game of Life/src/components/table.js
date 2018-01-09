import React from 'react';
import Cell from './cell.js'

const Table = (props) => {
  let rows = [];
  let i;

  for (i = 0; i < props.rows; i++) {
    const row = [];
    props.coordinates.forEach(cell => {
      if (cell.coordinates[0] === i) {
        row.push(cell);
      }
    });
    rows.push(row);
  }

  const rowsOfJSX = rows.map((row, rowIndex) => {
    const cells = row.map((cell) => {
      const key = cell.coordinates.join('');
      return <Cell
        key={key}
        coordinates={cell.coordinates}
        age={cell.age}
        onCellClicked={props.onCellClicked} />
    });
    return (
      <tr key={rowIndex}>
        {cells}
      </tr>
    )
  });

  return (
    <table className="mx-auto">
      <tbody>
        {rowsOfJSX}
      </tbody>
    </table>
  );
}

export default Table;
