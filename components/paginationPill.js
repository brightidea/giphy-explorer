import React from 'react';
import styles from '../styles/PaginationPill.module.css';

const PaginationPill = (props) => {
  let currentCount = props.pagination.count + props.pagination.offset;
  return (
      <div className={styles.pill}>
        Showing {currentCount} of {props.pagination.total_count} results
      </div>
  );
}

export default PaginationPill;


