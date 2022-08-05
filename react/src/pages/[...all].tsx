import { Row, Button } from 'antd';
import { DefaultLayout } from '@/layouts';

const All = memo(() => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Row className="flex flex-col items-center justify-center">
        <Row>404 我们是怎么来到这里的？</Row>
        <Row className="mt-4">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Row>
      </Row>
    </DefaultLayout>
  );
});

export default All;
