import { createContext, useContext, useEffect, useState } from "react";

const MyListContext = createContext();

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("myList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (movie) => {
    if (!myList.find((m) => m.id === movie.id)) {
      setMyList([...myList, movie]);
    }
  };

  const removeFromMyList = (id) => {
    setMyList(myList.filter((m) => m.id !== id));
  };

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => useContext(MyListContext);
