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
  let hospitalAvailableBeds;

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  hospitalAvailableBeds = availableBeds - impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  hospitalAvailableBeds = availableBeds - severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(hospitalAvailableBeds);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
