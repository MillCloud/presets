import { Icon } from '@iconify/react';
import { Button } from 'antd';

export const BackButton = memo(() => {
  const navigate = useNavigate();
  return (
    <Button type="text" onClick={() => navigate(-1)}>
      <Icon className="anticon" icon="ant-design:left-outlined" />
      返回
    </Button>
  );
});

export default BackButton;
