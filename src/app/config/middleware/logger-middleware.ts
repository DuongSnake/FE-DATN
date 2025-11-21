/* eslint no-console: off */
export const loggerMiddleware = () => next => action => {
  if (import.meta.env.VITE_NODE_ENV !== 'production') {
    const { type, payload, meta, error } = action;

    console.groupCollapsed(type);
    console.log('Payload:', payload);
    if (error) {
      console.log('Error:', error);
    }
    console.log('Meta:', meta);
    console.groupEnd();
  }

  return next(action);
};
