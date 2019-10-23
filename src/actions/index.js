export const HANDLE_CLICK = 'HANDLE_CLICK';
export const RESET = 'RESET';

export const reverse = () => ({
  type: 'REVERSE'
});

export const reset = () => {
  return {
    type: 'RESET'
  };
};

export const undoTo = step => ({
  type: 'UNDO_TO',
  step
});

export const handleClick = (i, j) => ({
  type: 'HANDLE_CLICK',
  i,
  j
});

export const login = () => ({
  type: 'LOGIN'
});

export const logout = () => ({
  type: 'LOGOUT'
});
