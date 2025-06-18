const UNIT_LEVEL_MULTIPLIERS = [1000, 60, 60];

export function convertToUnitLevel(milliseconds, targetUnitLevel) {
  let converted = milliseconds;

  for (let unitLevel = 0; unitLevel <= targetUnitLevel; unitLevel++) {
    converted /= UNIT_LEVEL_MULTIPLIERS[unitLevel]
  };

  return converted
};

export function decomposeTime(milliseconds) {
  const decomposed = []

  for (let unitLevel = 0; unitLevel <= UNIT_LEVEL_MULTIPLIERS.length; unitLevel++) {
    decomposed[unitLevel] = Math.floor(
      convertToUnitLevel(milliseconds, unitLevel) %
      (UNIT_LEVEL_MULTIPLIERS[unitLevel + 1] || Number.MAX_VALUE)
    )
  };

  return decomposed
};