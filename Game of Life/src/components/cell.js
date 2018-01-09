import React from 'react';

const Cell = (props) => {
  const row = props.row;
  const column = props.column;
  const age = props.age;
  let cellStyle = "";

  if (age > 0) {
    cellStyle = "active cell";
  } else {
    cellStyle = "cell";
  }

  return (
    <td
      className={cellStyle}
      value={[row, column]}
      onClick={ () => props.onCellClicked(props) }>
    </td>
  );
}

export default Cell;
