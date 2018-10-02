import { GetMatchup } from "../Services/HeroService";

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

  returnObj.heroObj.drafted = true;
  returnObj.heroObj.isRadiant = true;

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

export function setMatchup(strHeroes, agiHeroes, intHeroes, matchId) {
  return new Promise((resolve, reject) => {
    let tempRadiantArray = [];
    let tempRadIcons = [];
    let tempDireArray = [];
    let tempDireIcons = [];

    //Resetting the drafted state of all heroes when new matchup is called
    strHeroes.forEach(strHero => (strHero.drafted = false));
    agiHeroes.forEach(agiHero => (agiHero.drafted = false));
    intHeroes.forEach(intHero => (intHero.drafted = false));

    let grabMatchup = GetMatchup(matchId);

    grabMatchup.then(response => {
      response.data.forEach(hero => {
        if (hero.isRadiant) {
          tempRadiantArray.push(hero);
          tempRadIcons.push(hero.heroMinimapIcon);
        } else {
          tempDireArray.push(hero);
          tempDireIcons.push(hero.heroMinimapIcon);
        }
      });
      tempRadiantArray.forEach(heroToCheckDraft => {
        strHeroes.forEach(strHero => {
          if (heroToCheckDraft.heroId === strHero.heroId) {
            strHero.drafted = true;
          }
        });
        agiHeroes.forEach(agiHero => {
          if (heroToCheckDraft.heroId === agiHero.heroId) {
            agiHero.drafted = true;
          }
        });
        intHeroes.forEach(intHero => {
          if (heroToCheckDraft.heroId === intHero.heroId) {
            intHero.drafted = true;
          }
        });
      });
      tempDireArray.forEach(heroToCheckDraft => {
        strHeroes.forEach(strHero => {
          if (heroToCheckDraft.heroId === strHero.heroId) {
            strHero.drafted = true;
          }
        });
        agiHeroes.forEach(agiHero => {
          if (heroToCheckDraft.heroId === agiHero.heroId) {
            agiHero.drafted = true;
          }
        });
        intHeroes.forEach(intHero => {
          if (heroToCheckDraft.heroId === intHero.heroId) {
            intHero.drafted = true;
          }
        });
      });
      let returnObj = {
        radiantTeam: tempRadiantArray,
        radIcons: tempRadIcons,
        direTeam: tempDireArray,
        direIcons: tempDireIcons,
        strHeroes: strHeroes,
        agiHeroes: agiHeroes,
        intHeroes: intHeroes
      };
      returnObj ? resolve(returnObj) : reject("Error");
    });
  });
}
