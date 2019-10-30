import uuid from "uuid/v1";

export default {
  state: [],
  reducers: {
    add: (state, user) => [
      ...state,
      {
        id: uuid(),
        firstName: user.firstName,
        lastName: user.lastName
      }
    ]
  },
  effects: dispatch => ({
    async addUserAsync(user) {
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch.users.add(user);
    }
  })
};
