export const saveDataToLocalStorage = (todos) => {

    localStorage.setItem("todos", JSON.stringify(todos));

}

export const retrivedDataFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('todos'));

}

export const headersName = () => {

    return ["Name", "Status", "Date completed", "Action"];

};

export const DEFAULT_FIRST_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 3;

export const firstDataIndex = (currentPage) => {

  return  (Number(currentPage) - 1) * DEFAULT_PAGE_SIZE;

}

export const lastDataIndex = (firstIndex) => {

  return  Number(firstIndex) + DEFAULT_PAGE_SIZE;
  
}

