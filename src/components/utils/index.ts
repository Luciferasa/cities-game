export const getLastLetter = (city: string) => {
  const lastLetter = city[city.length-1];
  if (lastLetter === 'ь' || lastLetter === 'ъ' || lastLetter === 'ы') {
    return city[city.length-2];
  } else {
    return lastLetter;
  }
}
