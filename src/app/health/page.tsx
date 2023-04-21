import { Metadata } from 'next';

import Health from '../../Features/Health/Health';

export const metadata: Metadata = {
  title: 'Health',
};

export default function page() {
  return <Health />;
}
