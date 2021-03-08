<p align="center">
  <a href="https://github.com/Manthan933">
    <img src="https://avatars3.githubusercontent.com/u/74331410?s=400&u=7b6f3cd00fcf7091d337c377229c359d7c3c5639&v=4" alt="Logo" width="150">
  </a>

  <h3 align="center">MANTHAN</h3>
  <h3 align="center">उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत।</h3>
  <p align="center">
    <a href="https://github.com/Manthan933/Manthan/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://www.manthan-app.org/">View Demo</a>
    ·
    <a href="https://github.com/Manthan933/Manthan/issues">Report Bug</a>
    ·
    <a href="https://github.com/Manthan933/Manthan/issues">Request Feature</a>
  </p>
</p>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->

## Table of Contents 📕 

- [About the Project](#about-the-project)
  - [Description](#description)
  - [Features](#features)
  - [Built With](#built-with)
  <!---* [Live App](#live-app)--->
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [Contact Us](#contact)

<!-- ABOUT THE PROJECT -->


## About The Project
<img src="https://media.giphy.com/media/QvXUg57xakpdZiOJof/giphy.gif" width="50%">

### Description 👇

We will provide an online testing platform which can be used to conduct tests wrapped with all necessary precautions to reduce the chances of cheating. Here the educator will can create classes and test on web portal and all the questions will be randomly distributed among the students resulting in large number of sets.

### Features 🔎

- A secure platform for online testing.
- Interactive and easy to use.
- Grades can be accessed/ changed even after the completion of test.
- Teacher can decide if a particular question is compulsary in all the tests or not.
- Application is in locked mode so no transition between other applications (as Whatsapp,call,etc.).
- A basic facility like calculator will be present in the application so to do basic math operations.
- A list of the marks will be sent to the educator just after the completion of the test.
- Use Gmail or Student mail Id's to save student marks.
- Test will be automatically submitted after the time frame.
- We'll try to block incoming calls/ messages/ screen capture and all the unnecessary activities during the test.

### Built With 💻

- [ReactJs](https://reactjs.org/)
- [Expressjs](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com/)

<!-- LIVE APP
## Live App
[Android App for students and teachers]() and [Web app for teachers to add and access classes and tests](https://manthan-app.herokuapp.com/)
-->

<!-- GETTING STARTED -->

## Getting Started ✅

To get a local copy up and running follow these simple steps.

### Prerequisites 📖

These are the prerequisites required to run this application.

- Node
- npm
- docker
- mongo-uri

### Installation

<img src="https://media.giphy.com/media/kdiLau77NE9Z8vxGSO/giphy.gif" width="40%"><br>

1. Clone the Manthan repository form github

```sh
  git clone https://github.com/Manthan933/Manthan.git
  cd Manthan
```

2. Get the mongo-uri from [MongoDB-Atlas](https://www.mongodb.com/cloud/atlas) and create .env file in server ( refer [.env.example](server/.env.example) )

3. To run the application in development server

```sh
  cd server
  npm install
  nodemon
```
```sh
  cd client
  npm install
  npm start
```

4. To run the application using Docker in server
we first build app container using 
```
  docker build -t getting started
```
for running the app 
```
  docker run getting started
```  


<!-- USAGE EXAMPLES -->
<!-- ## Screenshots -->

<!-- CONTRIBUTING -->

## Contributing 🖋

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## Contact Us 📞

Join our **slack channel [here]( https://join.slack.com/t/manthanorg/shared_invite/zt-lxf54p40-1yafKYq35Zj76ah_MRhnDQ)** for discussions and latest news.  
Follow our **linkedin page [here](https://www.linkedin.com/company/manthan933/)**.

## Programs We have been associated with 🤍

<a href="https://gssoc.girlscript.tech/" target="_blank"><img src="https://raw.githubusercontent.com/aavishkarmishra/portfolio/master/Method%20Draw%20Image(1).png" width="180px" height="180px"></a>
<a href="https://swoc.tech/index.html" target="_blank"><img src="https://raw.githubusercontent.com/HITK-TECH-Community/Community-Website/main/assets/SWoC.png" width="180px" height="180px"></a>

## Author 👨‍💻

### [Aavishkar Mishra](https://github.com/aavishkarmishra)

[<img src="https://image.flaticon.com/icons/svg/185/185964.svg" width="35" padding="10">](https://www.linkedin.com/in/aavishkarmishra/)
[<img src="https://www.flaticon.com/svg/static/icons/svg/1312/1312142.svg" width="35" padding="10">](https://www.twitter.com/aavishkarmishra)
[<img src="https://image.flaticon.com/icons/svg/185/185985.svg" width="35" padding="10">](https://www.instagram.com/aavishkar_mishra/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Manthan933/Manthan.svg?style=flat-square
[contributors-url]: https://github.com/Manthan933/Manthan/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Manthan933/Manthan.svg?style=flat-square
[forks-url]: https://github.com/Manthan933/Manthan/network/members
[stars-shield]: https://img.shields.io/github/stars/Manthan933/Manthan.svg?style=flat-square
[stars-url]: https://github.com/Manthan933/Manthan/stargazers
[issues-shield]: https://img.shields.io/github/issues/Manthan933/Manthan.svg?style=flat-square
[issues-url]: https://github.com/Manthan933/Manthan/issues
[license-shield]: https://img.shields.io/github/license/Manthan933/Manthan.svg?style=flat-square
[license-url]: https://github.com/Manthan933/Manthan/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/aavishkarmishra
[product-screenshot]: images/screenshot.png
## Our Contributors ✨:

<a href="https://github.com/Manthan933/Manthan/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Manthan933/Manthan" />
</a>
