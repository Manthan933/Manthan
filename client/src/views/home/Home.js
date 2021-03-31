import React from 'react'
import logo from '../../assets/images/logo.svg'
import bookPenImg from '../../assets/images/book-pen.png'
import styles from './home.module.css'
import {Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'
const Home = () =>{
    return(
        <div className={styles.container}>
        <div className={styles.sideDiv}></div>
        <div className={styles.header}>
            <Link to="/" className={styles.brand}>
                <img src={logo} alt="logo" className={styles.brandLogo}/>
                <span className={styles.brandName}>MANTHAN</span>
            </Link>
            <Link to="/home" className={styles.getStarted}>Get Started</Link>
        </div>
        <Grid container className={styles.grid}>
            <Grid item md={6} xs={12} sm={12}>
            <img src={bookPenImg} alt={bookPenImg} className={styles.bookPenImg} />
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
            <div className={styles.desc}>
               <h1 className={styles.descHeading}>A <strong>secure platform</strong> for online testing</h1>
               <p className={styles.descInfo}>We provide an online testing platform that can be used to conduct tests that are wrapped with all the necessary precautions to reduce the chances of cheating. Here, the educator can create classes and tests on a web portal and all the entered questions will be randomly distributed among the students resulting in a large number of sets.</p>
            </div>
            </Grid>
        </Grid>
        <footer>
            <p>All rights reserved. Copyright Manthan</p></footer>
        </div>
    )
}

export default Home