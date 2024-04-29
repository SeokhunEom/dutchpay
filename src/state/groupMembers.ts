import { atom } from 'recoil';

const groupMembersState = atom({
  key: 'groupMembers',
  default: [] as string[],
});

export default groupMembersState;
