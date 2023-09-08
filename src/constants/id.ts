import { MS__EROR } from './messages';

export const randomId = () => Math.floor(Math.random() * 999);

export const confirm = () => window.confirm(MS__EROR);
export const alertInput = () => alert('Vui lòng nhập...');
