const covid19ImpactEstimator = (data) => 
{
	const { periodType } = data;
	
	const timeNormalize = (periodType) => 
	{
		let { timeToElapse } = data;
		if (periodType === 'days') 
		{
  		timeToElapse = timeToElapse * 1;
  	} else if (periodType === 'weeks') 
  	{
  		timeToElapse = timeToElapse * 7;
  	} else 
  	{
  		timeToElapse = timeToElapse * 30;
  	}

  	return timeToElapse;
  };

  const impact = {};
  const severeImpact = {};
  const periodTime = timeNormalize(periodType);
  const factor = Math.trunc(periodTime / 3);

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
