import * as types from './mutation-types';

export default {
  // 新增计划
  [types.SAVE_PLAN] (state, plan) {
    state.list.push(
      Object.assign({}, plan)
    );
  }
};
