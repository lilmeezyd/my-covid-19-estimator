const covid19ImpactEstimator = (data) => {
  const { periodType } = data;

  const timeNormalize = (period) => {
    let { timeToElapse } = data;
    if (period === 'days') {
      timeToElapse *= 1;
    } else if (period === 'weeks') {
      timeToElapse *= 7;
    } else {
      timeToElapse *= 30;
    }

    return timeToElapse;
  };

  const impact = {};
  const severeImpact = {};
  const periodTime = timeNormalize(periodType);
  const factor = Math.trunc(periodTime / 3);
  const { totalHospitalBeds } = data;
  const availableBeds = totalHospitalBeds * 0.35;
  const { region } = data;
  const { avgDailyIncomeInUSD } = region;
  const { avgDailyIncomePopulation } = region;
  let severeCasesByRequestedTime;
  let hospitalAvailableBeds;
  let ICUByRequestedTime;
  let VentilatorsByRequestedTime;
  let avgDailyIncome;
  let dollarsLost;

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.severeCasesByRequestedTime = Math.trunc(severeCasesByRequestedTime);
  hospitalAvailableBeds = availableBeds - impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);
  ICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForICUByRequestedTime = Math.trunc(ICUByRequestedTime);
  VentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  impact.casesForVentilatorsByRequestedTime = Math.trunc(VentilatorsByRequestedTime);
  avgDailyIncome = impact.infectionsByRequestedTime * avgDailyIncomePopulation;
  dollarsLost = (avgDailyIncome * avgDailyIncomeInUSD) / periodTime;
  impact.dollarsInFlight = Math.trunc(dollarsLost);

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeCasesByRequestedTime);
  hospitalAvailableBeds = availableBeds - severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);
  ICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = Math.trunc(ICUByRequestedTime);
  VentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(VentilatorsByRequestedTime);
  avgDailyIncome = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation;
  dollarsLost = (avgDailyIncome * avgDailyIncomeInUSD) / periodTime;
  severeImpact.dollarsInFlight = Math.trunc(dollarsLost);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
