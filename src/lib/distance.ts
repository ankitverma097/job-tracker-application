export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in KM
  const dLat = toRad(lat2 - lat1); 
  const dLon = toRad(lon2 - lon1);
// converting in to radian beause of in javacript Math function(like sin, cos etc.) uses the radian  so i convert in to radian

  //after that here i have to write some logic to derived the distance for sherical surface
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}