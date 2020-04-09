const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const periodType = data.periodType;
  const timeToElapse = timeNormalize(periodType);
  const factor = Math.trunc(timeToElapse / 3);

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;

  return { data, impact, severeImpact };
};

const timeNormalize = (periodType) => {
  if (periodType === 'days') {
  	timeToElapse = data.timeToElapse;
  } else if (periodType === 'weeks') {
  	timeToElapse = data.timeToElapse * 7;
  } else {
  	timeToElapse = data.timeToElapse * 30;
  }
  return timeToElapse;
  }

export default covid19ImpactEstimator;
