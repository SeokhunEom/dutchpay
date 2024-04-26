import { atom } from 'recoil';

const groupNameState = atom({
  key: 'groupName',
  default: '',
});

export default groupNameState;
