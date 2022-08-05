import { Icon } from '@iconify/react';

export const LayoutNetwork = memo(() => {
  const network = useNetwork();
  const networkText = useMemo(() => {
    if (!network.online) {
      return '网络异常，请检查';
    }
    if (network.effectiveType !== '4g') {
      return '网络慢，请检查';
    }
    return '网络正常';
  }, [network]);
  const networkClass = useMemo(() => {
    if (!network.online) {
      return 'text-danger';
    }
    if (network.effectiveType !== '4g') {
      return 'text-warning';
    }
    return '';
  }, [network]);

  return (
    <div className={clsx('flex h-8 items-center justify-center', networkClass)}>
      <Icon icon="carbon:network-public" className="anticon mx-2" />
      <span className="mr-2">{networkText}</span>
    </div>
  );
});

export default LayoutNetwork;
