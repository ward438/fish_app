
Install Docker-Compose: <br/>
  &emsp;<ins>Windows</ins>: https://docs.docker.com/desktop/install/windows-install/ <br/>
  &emsp;<ins>MacOS</ins>: https://docs.docker.com/desktop/install/mac-install/ <br/>
  &emsp;<ins>Linux</ins>: https://docs.docker.com/desktop/install/linux-install/ <br/>

<H1>Clone from repository</H1>: <br/>
  &emsp;Choose directory where app will be installed, use command line interface. <br/>
  &emsp;<ins>Enter in Terminal</ins>: git@github.com:ward438/fish_app.git <br/>
  &emsp;<img width="372" alt="image" src="https://github.com/ward438/fish_app/assets/75048548/76c3aaba-bc21-4bda-a505-b82750294927"></br>
  &emsp;<ins>After app installation, Enter in terminal:</ins> docker-compose up <br/>
  &emsp;<img width="149" alt="image" src="https://github.com/ward438/fish_app/assets/75048548/28a591ec-8956-4b80-9c64-8c16fb2cabe8"> </br>
  &emsp;This will initialize Docker-Compose and start building the frontend and backend images. 

This application leverages:</br>
  &emsp;<ins>Django-Rest-Framework(Python)</ins>: Used for building custom API. Allows for easy building of Serializers, views and viewsets, data modeling, routing, and more.</br>
  &emsp;<ins>NextJS(Javascript)</ins>: Javascript/REACT front end framework that allows construction of reusable components, integrated routing via folder and file structure, state management, and more. Provides the UI for the user. </br> 
  &emsp;<ins>Material UI</ins>: Styling library that works around REACT based styling components. </br>
  &emsp;<ins>Docker-Compose</ins>: Is a tool for defining and running multi-container applications. It allows you to define a multi-container environment in a single file. </br>

After Installation: </br>
  &emsp;After running <ins>docker-compose up</ins> in terminal, both frontend and backend will spool up and initialize. Both frontend and backend will automatically install required libraries dependencies. </br> 
  <img width="149" alt="image" src="https://github.com/ward438/fish_app/assets/75048548/28a591ec-8956-4b80-9c64-8c16fb2cabe8"> </br>

  &emsp;<ins>Frontend location</ins>: http://localhost:3000 <br/>
  &emsp;<ins>Backend location</ins>: http://localhost:8000 <br/>

  User experience: </br>
    &emsp;Dummy data will be randomized and inserted into the database upon initialization. </br>
    &emsp;User has the ability to create a catch. A catch contains a fish, water system data, fly data, and regional data. </br>
    &emsp;User can also enter their own data into the appropriate area. User can enter their own water system data, fly data, and regional data. This data then can be used to create a catch. User will return to the catch menu and select from the drop down menus. </br>
    &emsp;Note: CFS is Cubic Feet Per Secod. CFS input is an integer.

<img width="1440" alt="image" src="https://github.com/ward438/fish_app/assets/75048548/f0c837b4-49e0-4559-bfba-9ad29fcd6231"></br>
<img width="1440" alt="image" src="https://github.com/ward438/fish_app/assets/75048548/028e2196-6987-4b70-8e9b-0c7ae15d396e"></br>
<img width="1440" alt="image" src="https://github.com/ward438/fish_app/assets/75048548/644332e4-5e16-46ab-b6a0-668ff6d0d1a4"></br>
<img width="1440" alt="image" src="https://github.com/ward438/fish_app/assets/75048548/07afc160-50f3-41ac-822d-9413d0b9898d">




  
