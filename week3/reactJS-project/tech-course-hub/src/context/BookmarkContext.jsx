// will use 
// createContext()
// useContext()

// yaha bookmark globally store hoga


import { createContext, useState } from "react";

export const BookmarkContext = createContext();

function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        setBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;