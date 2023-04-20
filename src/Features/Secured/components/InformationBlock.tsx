/* istanbul ignore file */

import Link from 'next/link';
import React from 'react';

import styles from '../../../../styles/Home.module.css';

interface Props {
  url: string;
  title: string;
  description: string;
}

export default function InformationBlock({ url, title, description }: Props) {
  return (
    <Link href={url} className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </Link>
  );
}
