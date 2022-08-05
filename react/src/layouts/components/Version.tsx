import { Icon } from '@iconify/react';
import pkg from '@/../package.json';

export const LayoutVersion = memo(() => (
  <div className="flex h-8 items-center justify-center">
    <Icon icon="carbon:version" className="anticon mx-2" />
    <span className="mr-2">v{pkg.version}</span>
  </div>
));

export default LayoutVersion;
