import React from 'react';
import bookPenImg from '../../img/book-pen.png';
import styles from './landing.module.css';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sideDiv}></div>
      <Grid container className={styles.grid}>
        <Grid item md={6} xs={12} sm={12}>
          <img src={bookPenImg} alt={bookPenImg} className={styles.bookPenImg} />
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
          <div className={styles.desc}>
            <h1 className={styles.descHeading}>
              A <strong>secure platform</strong> for online testing
            </h1>
            <p className={styles.descInfo}>
              We provide an online testing platform that can be used to conduct tests that are
              wrapped with all the necessary precautions to reduce the chances of cheating. Here,
              the educator can create classes and tests on a web portal and all the entered
              questions will be randomly distributed among the students resulting in a large number
              of sets.
            </p>
          </div>
        </Grid>
      </Grid>
      <div className={styles.footer}>
        <p className={styles.footerp}>
          All rights reserved. Copyright ©{' '}
          <Link className={styles.link} to="http://www.manthan-app.org/">
            Manthan
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </p>
      </div>
    </div>
  );
};

export default Landing;
