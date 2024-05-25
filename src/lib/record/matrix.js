import { dotProduct } from "./toneCalculator";

function closeToZero(value) {
  return Math.abs(value) < 0.00000001;
}

export class Row {
  constructor(data) {
    this._data = data;
    this._eliminated = data.map(e => closeToZero(e));
  }

  getLength() {
    return this._data.length;
  }

  getData() {
    return this._data;
  }

  getValue(index) {
    return this._data[index];
  }

  multiply(value) {
    return new Row(this._data.map(e => e * value));
  }

  multiplyInPlace(value) {
    this._data = this._data.map(e => e * value);
  }

  subtract(row) {
    const toSubtract = row.getData();
    toSubtract.forEach((e, i) => {
      this._data[i] = this._data[i] - e;
    });
  }

  copy() {
    return new Row(this._data);
  }

  getMetaValue(length) {
    for (let i = 0; i < length; ++i) {
      if (!this._eliminated[i]) return this.getValue(i);
    }
  }

  eliminate(index, withRow) {
    if (this._eliminated[index]) return;
    if (!withRow.canEliminate())
      throw new Error("can not eliminate with a no meta row");

    const selfValue = this.getValue(index);
    const withValue = withRow.getValue(index);
    const toSubtract = withRow.multiply(selfValue / withValue);
    this.subtract(toSubtract);
    this._eliminated[index] = true;
  }

  canEliminate(index) {
    return !this._eliminated[index];
  }

  eliminatedCols(eliminatedCols) {
    for (let i of eliminatedCols) {
      if (!this._eliminated[i]) return false;
    }
    return true;
  }

  eliminatedColsBefore(index) {
    for (let i = 0; i < index; ++i) {
      if (!this._eliminated[i]) return false;
    }
    return true;
  }

  matchEliminated(matcher) {
    for (let i = 0; i < this._eliminated.length; ++i) {
      if (!matcher(i, this._eliminated[i])) return false;
    }
    return true;
  }

  matchEliminatedCols(eliminateCols, ignoreLast = true) {
    const checkLength = ignoreLast
      ? this._eliminated.length - 1
      : this._eliminated.length;
    for (let i = 0; i < checkLength; ++i) {
      const v = this._eliminated[i];
      if (eliminateCols.includes(i)) {
        if (!v) return false;
        continue;
      }
      if (v) return false;
    }
    return true;
  }
}

class Matrix {
  constructor(data) {
    this._data = data.map(each => new Row(each));
    this._rows = this._data.length;
  }
  getRow(index) {
    return this._data[index];
  }

  setRow(index, row) {
    this._data[index] = row;
  }
  getColData(index) {
    return this._data.map(e => e.getValue(index));
  }
  getRowData(index) {
    return this.getRow(index).getData();
  }
  *rows() {
    for (let i = 0; i < this._rows; ++i) {
      yield [this._data[i], i];
    }
  }

  eliminateCols(length) {
    const ignoreRows = [];
    for (let i = 0; i < length; ++i) {
      const rowIndex = this._getCanEliminateFirstRow(i);
      ignoreRows.push(rowIndex);
      this._eliminateCol(i, rowIndex, ignoreRows);
    }
  }

  toIdentity(length) {
    this.eliminateCols(length);
    this._eliminateToIdentityFromUpTriangle(length);
    this._allRowsToIdentity(length);
  }

  _allRowsToIdentity(length) {
    // eslint-disable-next-line
    for (const [row, _] of this.rows()) {
      const metaValue = row.getMetaValue(length);
      row.multiplyInPlace(1 / metaValue);
    }
  }

  _getMatchEliminatedRowIndex(matcher) {
    for (let [row, i] of this.rows()) {
      if (row.matchEliminated(matcher)) {
        return i;
      }
    }
  }

  _getMatchEliminatedRowIndexes(matcher) {
    const indexes = [];
    for (let [row, i] of this.rows()) {
      if (row.matchEliminated(matcher)) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  _eliminateToIdentityFromUpTriangle(length) {
    for (let index = 1; index < length; ++index) {
      const withIndex = length - index;
      //   const targetIndex = length - 1 - index;
      const targetRowIndexes = this._getMatchEliminatedRowIndexes((i, v) =>
        i === withIndex ? !v : true
      );

      const withRowIndex = this._getMatchEliminatedRowIndex((i, v) =>
        i >= length ? true : i !== withIndex ? v : !v
      );
      const withRow = this.getRow(withRowIndex);

      targetRowIndexes.forEach(e => {
        if (e === withRowIndex) return;
        const targetRow = this.getRow(e);
        // console.log("target", e, targetRow, "with", withRowIndex, withRow);
        targetRow.eliminate(withIndex, withRow);
        // console.log("res", this.getRow(e));
      });
    }
  }

  _eliminateCol(eliminateIndex, withIndex, ignoreRows) {
    for (let [eachRow, rowIndex] of this.rows()) {
      if (ignoreRows.includes(rowIndex)) continue;
      if (rowIndex === withIndex) continue;
      eachRow.eliminate(eliminateIndex, this.getRow(withIndex));
    }
  }

  _getCanEliminateFirstRow(eliminateIndex) {
    for (let [eachRow, rowIndex] of this.rows()) {
      if (!eachRow.matchEliminated((i, v) => (i < eliminateIndex ? v : true)))
        continue;
      if (!eachRow.canEliminate(eliminateIndex)) continue;
      return rowIndex;
    }
    return null;
  }

  _eliminateRow(index, withIndex, eliminateIndex) {
    const targetRow = this.getRow(index);
    const withRow = this.getRow(withIndex);
    targetRow.eliminate(eliminateIndex, withRow);
  }

  toRawData() {
    return this._data.map(r => r.getData());
  }

  transpose() {
    const col = this.getRow(0).getLength();
    const row = this._data.length;
    const newData = [];
    for (let i = 0; i < col; ++i) {
      const newRow = [];
      for (let j = 0; j < row; ++j) {
        newRow.push(this.getRow(j).getValue(i));
      }
      newData.push(newRow);
    }
    return new Matrix(newData);
  }

  multiply(m) {
    const col = this.getRow(0).getLength();
    const row = this._data.length;
    const newData = [];
    for (let i = 0; i < row; ++i) {
      const newRow = [];
      for (let j = 0; j < col; ++j) {
        newRow.push(dotProduct(this.getRowData(i), m.getColData(j)));
      }
      newData.push(newRow);
    }
    return new Matrix(newData);
  }
  multiplyArray(a) {
    const row = this._data.length;
    const newData = [];
    for (let i = 0; i < row; ++i) {
      newData.push([dotProduct(this.getRowData(i), a.getColData(0))]);
    }
    return new Matrix(newData);
  }
  concat(data) {
    const row = this._data.length;
    const newData = [];
    for (let i = 0; i < row; ++i) {
      const newRow = [...this.getRowData(i), ...data[i]];
      newData.push(newRow);
    }
    return new Matrix(newData);
  }

  subMatrix(start) {
    return new Matrix(this._data.map(row => row.getData().slice(start)));
  }

  static Identity(size) {
    const col = size;
    const row = size;
    const newData = [];
    for (let i = 0; i < row; ++i) {
      const newRow = [];
      for (let j = 0; j < col; ++j) {
        newRow.push(i === j ? 1 : 0);
      }
      newData.push(newRow);
    }
    return new Matrix(newData);
  }

  reverse() {
    const size = this._data.length;
    const identity = Matrix.Identity(size);
    const newM = this.concat(identity);
    newM.toIdentity(size);
    return newM.subMatrix(size);
  }

  getShape() {
    return [this._data.length, this.getRow(0).getLength()];
  }
}

export default Matrix;
