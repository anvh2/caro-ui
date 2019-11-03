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

export const undo = step => ({
  type: 'UNDO',
  step
});

export const handleClick = (i, j) => ({
  type: 'HANDLE_CLICK',
  i,
  j
});

export const turnBot = () => ({
  type: 'TURN_BOT'
});

export const login = () => ({
  type: 'LOGIN'
});

export const logout = () => ({
  type: 'LOGOUT'
});
