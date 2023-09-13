export const createReducer =
  (strategies: any, initialState: any) =>
  (state = initialState, { type, payload }: any) =>
    (strategies[type] ?? strategies.__default__)(state, payload);
