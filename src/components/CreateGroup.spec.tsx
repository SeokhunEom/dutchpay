import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import CreateGroup from './CreateGroup';

const renderComponent = () => {
  render(
    <RecoilRoot>
      <CreateGroup />
    </RecoilRoot>,
  );
  const user = userEvent.setup();
  const input = screen.getByPlaceholderText('그룹 이름을 입력해 주세요');
  const saveButton = screen.getByText('저장');
  const errorMessage = screen.queryByText('그룹 이름을 입력해 주세요.');

  return {
    user,
    input,
    saveButton,
    errorMessage,
  };
};

describe('그룹 생성 페이지', () => {
  test('그룹 이름 입력 컴포넌트가 렌더링 되는가', () => {
    const { input, saveButton } = renderComponent();
    expect(input).not.toBeNull();
    expect(saveButton).not.toBeNull();
  });

  test('그룹 이름을 입력하지 않고 "저장" 버튼을 클릭시, 에러 메세지를 노출한다', async () => {
    const { user, saveButton, errorMessage } = renderComponent();

    await user.click(saveButton);
    expect(errorMessage && errorMessage.getAttribute('data-valid')).toBe('false');
  });

  test('그룹 이름을 입력 후, "저장" 버튼을 클릭시, 저장 성공', async () => {
    const { user, input, saveButton, errorMessage } = renderComponent();

    await user.type(input, '테스트 그룹');
    await user.click(saveButton);
    expect(errorMessage && errorMessage.getAttribute('data-valid')).toBe('true');
  });
});
