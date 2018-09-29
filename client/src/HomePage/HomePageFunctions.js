export function addingToRadiant(
  radiantHeroesArray,
  radiantIconsArray,
  hero,
  strHeroes,
  agiHeroes,
  intHeroes
) {
  let heroObj = { ...hero, position: 1 };
  let returnObject = {
    radiantHeroesArray,
    radiantIconsArray,
    heroObj,
    strHeroes,
    agiHeroes,
    intHeroes
  };

  returnObject.heroObj.drafted = true;
  returnObject.heroObj.isRadiant = true;

  switch (returnObject.heroObj.primaryAttribute) {
    case 1:
      strHeroes[returnObject.heroObj.arrayPosition].drafted = true;
      returnObject.radiantHeroesArray.push(returnObject.heroObj);
      returnObject.radiantIconsArray.push(returnObject.heroObj.heroMinimapIcon);

      return returnObject;
    case 2:
      agiHeroes[returnObject.heroObj.arrayPosition].drafted = true;
      returnObject.radiantHeroesArray.push(returnObject.heroObj);
      returnObject.radiantIconsArray.push(returnObject.heroObj.heroMinimapIcon);

      return returnObject;
    case 3:
      intHeroes[returnObject.heroObj.arrayPosition].drafted = true;
      returnObject.radiantHeroesArray.push(returnObject.heroObj);
      returnObject.radiantIconsArray.push(returnObject.heroObj.heroMinimapIcon);

      return returnObject;
  }
}

export function addingToDire(
  direHeroesArray,
  direIconsArray,
  hero,
  strHeroes,
  agiHeroes,
  intHeroes
) {
  let heroObj = { ...hero, position: 1 };
  let returnObj = {
    direHeroesArray,
    direIconsArray,
    heroObj,
    strHeroes,
    agiHeroes,
    intHeroes
  };

  switch (returnObj.heroObj.primaryAttribute) {
    case 1:
      strHeroes[returnObj.heroObj.arrayPosition].drafted = true;
      returnObj.direHeroesArray.push(returnObj.heroObj);
      returnObj.direIconsArray.push(returnObj.heroObj.heroMinimapIcon);

      return returnObj;
    case 2:
      agiHeroes[returnObj.heroObj.arrayPosition].drafted = true;
      returnObj.direHeroesArray.push(returnObj.heroObj);
      returnObj.direIconsArray.push(returnObj.heroObj.heroMinimapIcon);

      return returnObj;
    case 3:
      intHeroes[returnObj.heroObj.arrayPosition].drafted = true;
      returnObj.direHeroesArray.push(returnObj.heroObj);
      returnObj.direIconsArray.push(returnObj.heroObj.heroMinimapIcon);

      return returnObj;
  }
}
