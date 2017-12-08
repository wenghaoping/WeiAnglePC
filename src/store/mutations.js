export default {
  checkboxChange (state, playLoad) {
    state.pushProject.myCheckList[playLoad.thisName] = playLoad.isCheck;
  },
  checkboxChange2 (state, playLoad) {
    state.pushProject.netCheckList[playLoad.thisName] = playLoad.isCheck;
  }
};
