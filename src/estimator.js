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
  let hospitalAvailableBeds;
  let avgDailyIncomeByRequestedTime;
  let dollarsInFlight;

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  hospitalAvailableBeds = availableBeds - impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  avgDailyIncomeByRequestedTime = impact.infectionsByRequestedTime * avgDailyIncomePopulation;
  dollarsInFlight = avgDailyIncomeByRequestedTime * avgDailyIncomeInUSD * periodTime;
  impact.dollarsInFlight = dollarsInFlight;

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  hospitalAvailableBeds = availableBeds - severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  avgDailyIncomeByRequestedTime = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation;
  dollarsInFlight = avgDailyIncomeByRequestedTime * avgDailyIncomeInUSD * periodTime;
  severeImpact.dollarsInFlight = dollarsInFlight;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
