import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import AppView from './src/components/AppView';

interface IContext {
  favorite: {name: string; id: string} | undefined;
  setFavorite: Dispatch<SetStateAction<undefined>>;
}

export const AppContext = createContext<IContext>({
  favorite: undefined,
  setFavorite: () => {},
});

const App = () => {
  const [favorite, setFavorite] = useState();

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
