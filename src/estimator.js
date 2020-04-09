const covid19ImpactEstimator = (data) => {
	const impact = {};
	const severeImpact = {};
	const factor = Math.trunc(data.timeToElapse/3);

	impact.currentlyInfected = data.reportedCases * 10;
	impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;

	severeImpact.currentlyInfected = data.reportedCases * 50;
	severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;

	return { data, impact, severeImpact }
}

export default covid19ImpactEstimator;
