import React from "react";
import numeral from "numeral";

export function MapRadiantOffLaneIcon(hero, index) {
  return (
    <img
      className="overlay"
      style={{
        marginLeft: `-370px`,
        marginTop: `${150 + index * 30}px`
      }}
      src={`${hero.heroMinimapIcon}`}
    />
  );
}

export function MapRadiantSafeLaneIcon(hero, index) {
  return (
    <img
      className="overlay"
      style={{
        marginLeft: `${-110 - index * 30}px`,
        marginTop: `335px`
      }}
      src={`${hero.heroMinimapIcon}`}
    />
  );
}

export function MapRadiantMidLaneIcon(hero, index) {
  return (
    <img
      className="overlay"
      style={{
        marginLeft: `${-265 - index * 20}px`,
        marginTop: `${220 + index * 20}px`
      }}
      src={`${hero.heroMinimapIcon}`}
    />
  );
}

export function MapRadiantJungleIcon(hero, index) {
  if (index < 3) {
    return (
      <img
        className="overlay"
        style={{
          marginLeft: `${-200 + index * 30}px`,
          marginTop: `280px`
        }}
        src={`${hero.heroMinimapIcon}`}
      />
    );
  } else {
    return (
      <img
        className="overlay"
        style={{
          marginLeft: `${-275 + index * 30}px`,
          marginTop: `300px`
        }}
        src={`${hero.heroMinimapIcon}`}
      />
    );
  }
}

export function MapDireOffLaneIcon(hero, index) {
  return (
    <img
      className="overlay"
      style={{
        marginLeft: `-65px`,
        marginTop: `${220 - index * 30}px`
      }}
      src={`${hero.heroMinimapIcon}`}
    />
  );
}

export function MapDireSafeLaneIcon(hero, index) {
  return (
    <img
      className="overlay"
      style={{
        marginLeft: `${-330 + index * 30}px`,
        marginTop: `35px`
      }}
      src={`${hero.heroMinimapIcon}`}
    />
  );
}

export function MapDireMidLaneIcon(hero, index) {
  return (
    <img
      className="overlay"
      style={{
        marginLeft: `${-195 + index * 20}px`,
        marginTop: `${165 - index * 20}px`
      }}
      src={`${hero.heroMinimapIcon}`}
    />
  );
}

export function MapDireJungleIcon(hero, index) {
  if (index < 3) {
    return (
      <img
        className="overlay"
        style={{
          marginLeft: `${-270 + index * 30}px`,
          marginTop: `80px`
        }}
        src={`${hero.heroMinimapIcon}`}
      />
    );
  } else {
    return (
      <img
        className="overlay"
        style={{
          marginLeft: `${-345 + index * 30}px`,
          marginTop: `100px`
        }}
        src={`${hero.heroMinimapIcon}`}
      />
    );
  }
}

export function SelectLaneWinRate(hero) {
  switch (hero.position) {
    case 1:
      if (hero.offWinRate === 0) {
        return "NO DATA";
      } else {
        return numeral(hero.offWinRate).format("0.00%");
      }
    case 2:
      if (hero.midWinRate === 0) {
        return "NO DATA";
      } else {
        return numeral(hero.midWinRate).format("0.00%");
      }
    case 3:
      if (hero.safeWinRate === 0) {
        return "NO DATA";
      } else {
        return numeral(hero.safeWinRate).format("0.00%");
      }
    case 4:
      if (hero.jungleWinRate === 0) {
        return "NO DATA";
      } else {
        return numeral(hero.jungleWinRate).format("0.00%");
      }
    case 5:
      if (hero.roamingWinRate === 0) {
        return "NO DATA";
      } else {
        return numeral(hero.roamingWinRate).format("0.00%");
      }
  }
}
