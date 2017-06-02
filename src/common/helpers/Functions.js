export const preventDefault = (e, func, ...args) => {
    e.preventDefault();

    if (!func) {
        return;
    }

    if (args) {
        func(...args);
    } else {
        func();
    }
};

export const makeActionCreator = (type, ...argNames) => (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index];
    });
    return action;
};