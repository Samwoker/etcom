/**
 * Addis Ababa neighborhood proximity and distance calculator.
 * Used for deterministic ranking by distance in "Need Now" dispatch mode.
 */

const DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  Bole: {
    Bole: 0.8,
    Gerji: 2.1,
    Kazanchis: 2.6,
    Sarbet: 4.2,
    CMC: 4.8,
    Piassa: 5.7,
    Akaki: 9.4,
  },
  Kazanchis: {
    Kazanchis: 0.6,
    Piassa: 2.2,
    Bole: 2.6,
    Sarbet: 3.5,
    Gerji: 4.1,
    CMC: 5.2,
    Akaki: 10.1,
  },
  Piassa: {
    Piassa: 0.7,
    Kazanchis: 2.2,
    Sarbet: 3.8,
    Bole: 5.7,
    Gerji: 6.8,
    CMC: 7.9,
    Akaki: 12.3,
  },
  CMC: {
    CMC: 0.9,
    Gerji: 3.2,
    Bole: 4.8,
    Kazanchis: 5.2,
    Piassa: 7.9,
    Sarbet: 8.5,
    Akaki: 11.0,
  },
  Sarbet: {
    Sarbet: 0.8,
    Kazanchis: 3.5,
    Piassa: 3.8,
    Bole: 4.2,
    Gerji: 5.9,
    CMC: 8.5,
    Akaki: 8.8,
  },
  Gerji: {
    Gerji: 0.7,
    Bole: 2.1,
    CMC: 3.2,
    Kazanchis: 4.1,
    Sarbet: 5.9,
    Piassa: 6.8,
    Akaki: 8.9,
  },
};

export function getDistanceKM(fromSubCity: string = 'Bole', toSubCity: string = 'Bole'): number {
  const fromClean = fromSubCity.trim();
  const toClean = toSubCity.trim();

  if (DISTANCE_MATRIX[fromClean]?.[toClean] !== undefined) {
    return DISTANCE_MATRIX[fromClean][toClean];
  }

  if (DISTANCE_MATRIX[toClean]?.[fromClean] !== undefined) {
    return DISTANCE_MATRIX[toClean][fromClean];
  }

  return fromClean === toClean ? 0.9 : 3.8;
}

export function formatDistance(distanceKM: number): string {
  return `${distanceKM.toFixed(1)} km`;
}
