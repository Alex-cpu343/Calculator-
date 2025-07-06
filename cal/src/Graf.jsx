import React, { useState,useEffect } from 'react';

import { evaluate } from 'mathjs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graf() {

  const [expr, setExpr] = useState('sin(x)');
  const [data, setData] = useState(null);
  
 

  const buildGraph = () => {
    const xVal = [];
    const yVal = [];

    for (let x = -10; x <= 10; x += 0.1) {
      xVal.push(x.toFixed(1));
      try {
        const y = evaluate(expr, { x: parseFloat(x.toFixed(2)) });
        yVal.push(Number(y.toFixed(2)));
      } catch {
        yVal.push(null); 
      }
    }

    setData({
      labels: xVal,
      datasets: [
        {
          label: `y = ${expr}`,
          data: yVal,
          borderColor: 'blue',
          fill: false,
          tension: 0.1,
        },
      ],
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: data ? `Графік функції y = ${expr}` : 'Графік функції',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'x' },
      },
      y: {
        title: { display: true, text: 'y' },
      },
    },
  };

  return (
    <main style={{ padding: 20 }}>
      <h1 className='font-bold text-2xl text-center'>Побудова математичного графіка</h1>
      <div className='relative top-2 left-20'> 
      <input
        type="text"
        placeholder="Введіть функцію, наприклад sin(x)"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        className='border-2 rounded-lg text-xl shadow-lg focus:border-blue font-bold w-100'
      />
     <button
          onClick={buildGraph}
          className={`w-28 h-10 rounded-lg transition font-bold shadow-lg 
            `}
        >
          Побудувати
        </button>
</div>
      {data && (
        <div style={{ marginTop: '10px', maxWidth: '100%' }}>
          <Line data={data} options={options} />
        </div>
      )}
    </main>
  );
}
