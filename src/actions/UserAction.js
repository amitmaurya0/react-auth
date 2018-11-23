export const add_user = user => ({
    type: 'SET_USER_DETAIL',
    payload: user,
});

export const remove_user = user => ({
    type: 'REMOVE_USER_DETAIL',
    payload: user,
});
