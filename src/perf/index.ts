import { Chart } from '../index';
import { MeasureResults } from './types';
import { measure as measureData } from './data';

function displayMeasureResult(results: MeasureResults) {
  const chart = new Chart({
    container: 'main',
    width: 800,
    height: 600,
  });
  chart.data(results);
  chart.scale({
    unit: {
      type: 'cat',
    },
    time: {
      type: 'linear',
      nice: true,
    },
  });
  chart.line().position('unit*time').color('geometry');
  chart.render();
}

async function main() {
  let results: MeasureResults = [];
  results = results.concat(await measureData(['line'], false));
  // results = results.concat(await measureData(["line"], true));
  // results = results.concat(
  //   await measureData(["line"], { layout: "fixed-overlap" })
  // );
  // results = results.concat(await measureData(["area"]));
  // results = results.concat(await measureData(["line", "point"]));
  // results = results.concat(await measureData(["area", "point"]));
  // results = results.concat(await measureData(["point"]));
  console.log(JSON.stringify(results));
  displayMeasureResult(results);
}

main();
