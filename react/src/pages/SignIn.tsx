import { Row, Button } from 'antd';
import { DefaultLayout } from '@/layouts';

const SignIn = memo(() => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Row className="flex flex-col items-center justify-center">
        <Row>sign-in</Row>
        <Row className="mt-4">
          <Button onClick={() => navigate('/')}>INDEX</Button>
        </Row>
      </Row>
    </DefaultLayout>
  );
});

export default SignIn;
