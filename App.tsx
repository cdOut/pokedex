import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import AppView from './src/components/AppView';
import {IPokemon} from './src/screens/ListScreen';
import {getStorageData, STORAGE_FAVORITE} from './src/utils/Storage';

interface IContext {
  favorite: IPokemon | undefined;
  setFavorite: Dispatch<SetStateAction<IPokemon | undefined>>;
}

export const AppContext = createContext<IContext>({
  favorite: undefined,
  setFavorite: () => {},
});

const App = () => {
  const [favorite, setFavorite] = useState<IPokemon | undefined>();

  const getFavoritePokemon = useCallback(async () => {
    let result = await getStorageData(STORAGE_FAVORITE);
    if (result) {
      setFavorite(JSON.parse(result));
    } else if (result === undefined) {
      setFavorite(result);
    }
  }, []);

  useEffect(() => {
    getFavoritePokemon();
  }, [getFavoritePokemon]);

  return (
    <AppContext.Provider
      value={{
        favorite: favorite,
        setFavorite: setFavorite,
      }}>
      <AppView />
    </AppContext.Provider>
  );
};

export default App;
