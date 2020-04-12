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
  let avgDailyIncome;
  let ICUByRequestedTime;
  let VentilatorsRequestedTime;
  let dollarsLost;

  const impactOnEconomy = () => {
    avgDailyIncome = (impact.infectionsByRequestedTime * avgDailyIncomePopulation);
    dollarsLost = (avgDailyIncome * avgDailyIncomeInUSD * periodTime);
    impact.dollarsInFlight = Math.trunc(dollarsLost);
    return impact.dollarsInFlight;
  };

  const severeImpactOnEconomy = () => {
    avgDailyIncome = (severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation);
    dollarsLost = (avgDailyIncome * avgDailyIncomeInUSD * periodTime);
    severeImpact.dollarsInFlight = Math.trunc(dollarsLost);
    return severeImpact.dollarsInFlight;
  };

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.severeCasesByRequestedTime = Math.trunc(severeCasesByRequestedTime);
  hospitalAvailableBeds = availableBeds - impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);
  ICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForICUByRequestedTime = Math.trunc(ICUByRequestedTime);
  VentilatorsRequestedTime = impact.infectionsByRequestedTime * 0.02;
  impact.casesForVentilatorsByRequestedTime = Math.trunc(VentilatorsRequestedTime);
  impact.dollarsInFlight = impactOnEconomy();

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeCasesByRequestedTime);
  hospitalAvailableBeds = availableBeds - severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);
  ICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = Math.trunc(ICUByRequestedTime);
  VentilatorsRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(VentilatorsRequestedTime);
  severeImpact.dollarsInFlight = severeImpactOnEconomy();

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator; 
