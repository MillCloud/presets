import { Layout } from 'antd';
import { LayoutNetwork, LayoutVersion } from './components';

const { Footer, Content } = Layout;

export const DefaultLayout = memo(({ children }: { children?: React.ReactNode }) => {
  // const [token] = useToken();
  // const navigate = useNavigate();
  // const location = useLocation();
  // console.log('location', location);

  // useEffect(() => {
  //   if (!token && location.pathname !== '/SignIn') {
  //     navigate('/SignIn');
  //   }
  // }, [token, navigate, location]);

  return (
    <Layout className="relative h-screen">
      <Content className="p-20">{children}</Content>
      <Footer className="flex items-center justify-center">
        <LayoutNetwork />
        <LayoutVersion />
      </Footer>
    </Layout>
  );
});

export default DefaultLayout;
