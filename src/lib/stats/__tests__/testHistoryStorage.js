import { interval } from "rxjs";
import { getCalendarData, toNewDate } from "../../other/calendar";
import {
  getJsonLocalStorage,
  setJsonLocalStorage,
} from "../../other/localStorage";
import HistoryStorage from "../historyStorage";
jest.mock("../../other/localStorage");
let DATA = {};
getJsonLocalStorage.mockImplementation(function(key, defaultValue) {
  const value = DATA[key];
  if (value === undefined) {
    return defaultValue;
  }
  return JSON.parse(value);
});

setJsonLocalStorage.mockImplementation(function(key, value) {
  DATA[key] = JSON.stringify(value);
});

function createExpectData(dataArray, startSlot) {
  const historySlots = [];
  const values = [];
  dataArray.forEach(({ d, v }) => {
    historySlots.push(d);
    values.push(v);
  });
  const data = {};
  data.historySlots = JSON.stringify(historySlots);
  values.forEach((v, i) => {
    data[`historySlot-${i}`] = JSON.stringify(v);
  });
  data.startSlot = JSON.stringify(startSlot);
  return data;
}

it("testHistoryPutDataNotFull", () => {
  DATA = {};
  const ret = getCalendarData(2020, 1).map(toNewDate);
  const expectData = ret.map((r, i) => ({ d: r, v: i + 20 }));
  let t = new HistoryStorage(4);
  t.put(expectData[0].d, expectData[0].v);
  expect(DATA).toMatchObject(createExpectData([expectData[0]], 1));

  t = new HistoryStorage(4);
  t.put(expectData[1].d, expectData[1].v);
  expect(DATA).toMatchObject(
    createExpectData([expectData[0], expectData[1]], 2)
  );
});

it("testHistoryPutDataWhenFullAndIndexNotExist", () => {
  DATA = {};
  let t = new HistoryStorage(4);
  const ret = getCalendarData(2020, 1).map(toNewDate);
  const expectData = ret.map((r, i) => ({ d: r, v: i + 20 }));
  for (let i = 0; i < 4; ++i) {
    t.put(expectData[i].d, expectData[i].v);
  }

  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[0], expectData[1], expectData[2], expectData[3]],
      4
    )
  );

  t = new HistoryStorage(4);
  t.put(expectData[4].d, expectData[4].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[4], expectData[1], expectData[2], expectData[3]],
      1
    )
  );

  t = new HistoryStorage(4);
  t.put(expectData[5].d, expectData[5].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[4], expectData[5], expectData[2], expectData[3]],
      2
    )
  );

  t = new HistoryStorage(4);
  t.put(expectData[6].d, expectData[6].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[4], expectData[5], expectData[6], expectData[3]],
      3
    )
  );

  t = new HistoryStorage(4);
  t.put(expectData[7].d, expectData[7].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[4], expectData[5], expectData[6], expectData[7]],
      4
    )
  );

  t = new HistoryStorage(4);
  t.put(expectData[8].d, expectData[8].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[8], expectData[5], expectData[6], expectData[7]],
      1
    )
  );
});

it("testHistoryPutDataWhenFullThenNotFull", () => {
  DATA = {};
  let t = new HistoryStorage(4);
  const ret = getCalendarData(2020, 1).map(toNewDate);
  const expectData = ret.map((r, i) => ({ d: r, v: i + 20 }));
  for (let i = 0; i < 4; ++i) {
    t.put(expectData[i].d, expectData[i].v);
  }

  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[0], expectData[1], expectData[2], expectData[3]],
      4
    )
  );

  t = new HistoryStorage(4);
  t.put(expectData[4].d, expectData[4].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[4], expectData[1], expectData[2], expectData[3]],
      1
    )
  );

  t = new HistoryStorage(4);
  t.put(expectData[5].d, expectData[5].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[4], expectData[5], expectData[2], expectData[3]],
      2
    )
  );

  t = new HistoryStorage(8);
  t.put(expectData[6].d, expectData[6].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [
        expectData[4],
        expectData[5],
        expectData[2],
        expectData[3],
        expectData[6],
      ],
      5
    )
  );
});

it("testHistoryPutDataWhenFullThenNotFullThenFullAgain", () => {
  DATA = {};
  let t = new HistoryStorage(4);
  const ret = getCalendarData(2020, 1).map(toNewDate);
  const expectData = ret.map((r, i) => ({ d: r, v: i + 20 }));
  for (let i = 0; i < 4; ++i) {
    t.put(expectData[i].d, expectData[i].v);
  }
  t = new HistoryStorage(4);
  t.put(expectData[4].d, expectData[4].v);
  t.put(expectData[5].d, expectData[5].v);
  t = new HistoryStorage(4);
  expect(DATA).toMatchObject(
    createExpectData(
      [expectData[4], expectData[5], expectData[2], expectData[3]],
      2
    )
  );

  t = new HistoryStorage(6);
  t.put(expectData[6].d, expectData[6].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [
        expectData[4],
        expectData[5],
        expectData[2],
        expectData[3],
        expectData[6],
      ],
      5
    )
  );

  t = new HistoryStorage(6);
  t.put(expectData[7].d, expectData[7].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [
        expectData[4],
        expectData[5],
        expectData[2],
        expectData[3],
        expectData[6],
        expectData[7],
      ],
      6
    )
  );

  t = new HistoryStorage(6);
  t.put(expectData[8].d, expectData[8].v);
  expect(DATA).toMatchObject(
    createExpectData(
      [
        expectData[8],
        expectData[5],
        expectData[2],
        expectData[3],
        expectData[6],
        expectData[7],
      ],
      1
    )
  );
});
