import React from 'react';

import styles from '../../../../styles/Home.module.css';

interface Props {
  url: string;
  title: string;
  description: string;
}

export default function InformationBlock({ url, title, description }: Props) {
  return (
    <a href={url} className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </a>
  );
}
