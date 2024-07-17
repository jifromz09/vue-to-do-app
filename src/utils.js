export const saveDataToLocalStorage = (todos) => {

    localStorage.setItem("todos", JSON.stringify(todos));

}

export const retrivedDataFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('todos'));

}

export const headersName = () => {
    return ["Name", "Status", "Date completed", "Action"];
};