import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { meterReadingsData } from './data/meterReadingsSample';

export default () => {
  const sampleMeterReadings = meterReadingsData[0].readings;
  const meterReadingsRows = sampleMeterReadings.map(reading => (
    <tr key={reading.readingDate}>
      <td>{reading.readingDate}</td>
      <td>{reading.cumulative}</td>
      <td>{reading.quality}</td>
    </tr>
  ));

  const getEnergyUsage = meterReadings => {
    return meterReadings.reduce((acc, meterReading, i) => {
      const hasNextReading = meterReadings[i+1];
      if (!hasNextReading) return acc;

      const energyUsage = meterReadings[i+1].cumulative - meterReading.cumulative;
      if (energyUsage < 0) return acc;
      acc.push({
        energyUsage,
        date: meterReading.readingDate.slice(0, 10)
      });

      return acc;
    }, []);
  };
  const energyUsage = getEnergyUsage(sampleMeterReadings);

  return (
    <div>
      <h2>Energy Usage</h2>
      <BarChart width={1400} height={400} data={energyUsage}>
        <XAxis dataKey="date" />
        <YAxis dataKey="energyUsage"/>
        <CartesianGrid horizontal={false} />
        <Tooltip />
        <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
      </BarChart>
      <h2>Meter Readings</h2>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Reading</th>
            <th>Type</th>
          </tr>
          {meterReadingsRows}
        </tbody>
      </table>
    </div>
  );
};
