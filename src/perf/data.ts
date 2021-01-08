import { Chart } from '../index';
import { MeasureResults } from './types';

function generateData(size: number): Array<{ x: string; y: number }> {
  return new Array(size).fill(0).map((v, idx) => ({ x: `${idx}`, y: Math.random() * 100 }));
}

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function measureUnit(geometry: string[], size: number, label: boolean | object): Promise<number> {
  const data = generateData(size);
  const container = document.getElementById('app');

  const start = performance.now();
  const chart = new Chart({
    container,
    width: 600,
    height: 400,
  });
  chart.data(data);
  chart.scale({
    x: {
      type: 'cat',
    },
    y: {
      type: 'linear',
      nice: true,
    },
  });
  const geoms = [];
  geometry.forEach((geom) => {
    geoms.push(chart[geom]().position('x*y'));
  });

  if (label) {
    if (typeof label === 'boolean') {
      geoms[0].label('y');
    } else {
      geoms[0].label('y', label);
    }
  }

  chart.render();
  const end = performance.now();

  chart.destroy();
  await wait(200);

  const interval = end - start;

  console.log(`measure unit for size = ${size} time = ${interval}`);

  return interval;
}

export async function measure(geometry: string[], label: boolean | object): Promise<MeasureResults> {
  const result: MeasureResults = [];

  for (let size = 100; size <= 20000; size += 100) {
    const time = await measureUnit(geometry, size, label);
    result.push({
      geometry: geometry.join('-') + (label ? (typeof label === 'boolean' ? '-label' : '-label-layout') : ''),
      unit: `${size}`,
      time,
    });
  }
  return result;
}
