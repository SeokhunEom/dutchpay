import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import AddMembers from './AddMembers';

const renderComponent = () => {
  render(
    <RecoilRoot>
      <AddMembers />
    </RecoilRoot>,
  );
  const user = userEvent.setup();
  const input = screen.getByTestId('input-member-names');
  const saveButton = screen.getByText('저장');

  return {
    user,
    input,
    saveButton,
  };
};

describe('그룹 멤버 추가 페이지', () => {
  test('그룹 멤버 입력 컴포넌트가 렌더링 되는가', () => {
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveButton).not.toBeNull();
  });

  test('그룹 멤버를 입력하지 않고 "저장" 버튼을 클릭시, 에러 메세지를 노출한다', async () => {
    const { user, saveButton } = renderComponent();

    await user.click(saveButton);
    const errorMessage = await screen.findByText('그룹 멤버들의 이름을 입력해 주세요.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('그룹 멤버을 입력 후, "저장" 버튼을 클릭시, 저장 성공', async () => {
    const { user, input, saveButton } = renderComponent();

    await user.type(input, '철수 영희 영수');
    await user.click(saveButton);
    const errorMessage = screen.queryByText('그룹 멤버들의 이름을 입력해 주세요.');
    expect(errorMessage).toBeNull();
  });
});
