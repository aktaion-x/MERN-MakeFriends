import { createContext, useReducer } from "react";

export const HelperContext = createContext();

export const helperReducer = (state, action) => {
  switch (action.type) {
    case 'CLICK_MENUS':
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu') && !document.querySelector('.navbar > ul').contains(e.target)) {
          const menus = document.querySelectorAll('.menu');
          menus.forEach(menu => menu.classList.remove('active'));
        }
      });
      return;
    default:
      return null;
  }
};

export const HelperContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(helperReducer, {
    user: null
  });
  return (
    <HelperContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HelperContext.Provider>
  );
};