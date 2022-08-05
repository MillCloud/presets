import { Row, Button } from 'antd';
import { DefaultLayout } from '@/layouts';

const Index = memo(() => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Row className="flex flex-col items-center justify-center">
        <Row>index</Row>
        <Row className="mt-4">
          <Button onClick={() => navigate('SignIn')}>SIGN IN</Button>
        </Row>
      </Row>
    </DefaultLayout>
  );
});

export default Index;
