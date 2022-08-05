import { Dayjs } from 'dayjs';
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';
import { DatePicker } from './DatePicker';

export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {}

export const TimePicker = forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;
