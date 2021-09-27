import { createContext, useState } from "react";

const GeneralContext = createContext({
  heroes: [],
  totalHeroes: 0,
  addHero: (hero) => {},
  removeHero: (heroId) => {},
  itemIsHero: (heroId) => {},
});

export function GeneralContextProvider(props){
    const [userHeroes, setUserHeroes] = useState([]);
    
    function addHeroHandler(hero){
        setUserHeroes((prevUserHeroes) => {
            return prevUserHeroes.concat(hero);
        });
    }

    function removeHeroHandler(heroId){
        setUserHeroes(prevUserHeroes => {
            return prevUserHeroes.filter(hero => hero.id !== heroId);
        });
    }

    function itemIsHeroHandler(heroId){
        return userHeroes.some(hero => hero.id === heroId);
    }

    const context = {
        heroes: userHeroes,
        totalHeroes: userHeroes.length,
        addHero: addHeroHandler,
        removeHero: removeHeroHandler,
        itemIsHero: itemIsHeroHandler
    };

    return (
    <GeneralContext.Provider value={context}>
        {props.children}
    </GeneralContext.Provider>);
}

export default GeneralContext;