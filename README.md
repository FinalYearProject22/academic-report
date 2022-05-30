A Project Report On

CAMPUS AUTOMATION USING CLOUD

Submitted By

Vishal Mundhra(16900218008)
Taniya Chanda(16900218010)
Ranjan Yadav(16900218026)
Rahul Kumar Singh(16900218030)
Roshan Jha(16900219056)
 
Department- IT, Semester- 7th
Subject: Project-II (PROJ-IT781)
 
Under the guidance of
 Prof. …………………….


A Project Report
To be submitted in the partial fulfillment of the requirements
For the degree of
Bachelor of Technology in Information Technology




Department of Information Technology,
	Academy of Technology	


Affiliated to



       Maulana Abul Kalam Azad University of Technology, West Bengal
2021-22




CERTIFICATE

This is to certify that the project entitled: Campus Automation using cloud submitted to MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY in the partial fulfillment of the requirement for the award of the B.TECH degree in INFORMATION TECHNOLOGY of Project-II (PROJ-IT781) is carried out by 

Vishal Mundhra(16900218008)
Taniya Chanda(16900218010)
Ranjan Yadav(16900218026)
Rahul Kumar Singh(16900218030)
Roshan Jha(16900219056) 


under my guidance. The matter embodied in this project is genuine work done by the students and has not been submitted whether to this University or to any other University/Institute for the fulfillment of the requirement of any course of study.



                                                                                             Prof. …………………. (Guide)                                                     
Department of ……..
             						Academy of Technology, Aedconagar,
Hooghly-712121, West Bengal, India

	

Dated:

Countersigned By



	




STATEMENT BY THE CANDIDATES


Vishal Mundhra Roll 16900218008
Taniya Chanda Roll 16900218010
Ranjan Yadav Roll 16900218026
Rahul Kumar Singh Roll 16900218030
Roshan Jha Roll 16900219056


B. Tech 7th Semester
Dept. of Information Technology
Academy of Technology


We hereby state that the Project Report entitled Campus Automation using Cloud has been prepared by us to fulfill the requirements of Project-II (PROJ-IT781) during the period August 2021 to January 2022.

_______________
_______________
_______________
_______________
Signature of the students



















LIST OF FIGURES


       
 Figures 							                Page No  



Fig.1: Proposed System diagram……………………………………………………..6

Fig.2 : Software Engineering Paradigm applied……………………………………...7

Fig.3 : Root directory of Database……………………………………………………9

Fig.3 : Batches directory of Database………………………………………………...9

Fig.3 : Student directory of Database………………………………………………...10

Fig.3 : Teachers directory of Database……………………………………………….10

Fig.3 : Users directory of Database…………………………………………………..10















     






ABSTRACT




Covid Pandemic has affected every area known to humans, Some fields coped with the pandemic smoothly while others were hit hard and knew that they had to course correct their trajectory for being able to move forward. The Indian education system was one of them..

Covid showed us the real gaps in the Indian education system with the whole system switching to online mode of education. Those schools, colleges which had the infrastructure already in place faced little to no problem but a large number of them had to adjust. This project gives a take on how we bring more institutions on the digital infrastructure using cloud and hence reap benefits of economy of scale.
 













TABLE OF CONTENTS 

               
    Contents                					 		     Page No

Chapter 1           Introduction…………………………………………………1

Chapter 2           Literature Overview………………………………….......… 2                                                                       

Chapter 3           Problem Definition & Objectives.…………………………..3

Chapter 4           Feasibility Study ..…………………………………………..4

Chapter 5           Proposed Scheme ..………………………………………….5

Chapter 6           Software Engineering Paradigm Applied ……………….….7 

Chapter 7           Software and Hardware Requirement Specifications……….8   

Chapter 8           Database Design ……….……………………………...……9

Chapter 9           Conclusion ..………………………………………………..11

   10. Chapter 10         References ………………………………………………….12












Chapter 1








 The Indian education system serves the second largest population in the world. Adding to that Half of its population of 1.3 billion is below the age of 25, and a quarter is below the age of 14. In that case it becomes even more important to provide/encourage innovation in the field. Even before the covid pandemic, the schools and universities lacked the digital infrastructure required or beneficial to the students part of the large system, After Covid the situation became worse.
Covid showed us the real gaps in the system with the whole system switching to online mode of education. Those schools, colleges which had the infrastructure already in place faced little to no problem but a large number of them had to adjust. This project gives a take on how we bring more institutions on the digital infrastructure using cloud and hence reap benefits of economy of scale.


Purpose of This Study

    This study attempts to create a cloud based platform to store, allocate and view scores of students in user friendly, efficient and cheap manner. 



page 1

Chapter 2







Walter Stone [1] in his Blog post on cloudacademy.com [2] gives us a list 8 ways in which cloud computing can benefit education . These include:
Strong virtual classroom environments
Ease of accessibility
Extensive cost-savings
Secure data storage
Scalability
Agility and innovation
Greater reach for the students
Minimal hardware requirements

Neha Lad [3] writes in her blog post on esds.co.in [4]  how cloud can be a better solution than all other alternatives currently in consideration. These include:
Diminished Costs
Easy Access
Security
Shareability
No costly programming required
Practice environmental safety
Easy Update
AWS, the leading cloud services provider in the world, on their youtube [5] channel uploaded a video on how Arizona State University uses Cloud to innovate in education. [6]
page 2

Chapter 3










Problem Definition

	In this project we will be attempting to create a portal for an institution for allocating, storing and viewing scores of all students in their respective courses. We will be attempting to  create the portal using cloud services provided by Google Cloud Services through firebase. The reason to do it with cloud is to reduce the costs which have to be paid by institutions to create and manage such an infrastructure.


Objectives

             Our main objective is to create the portal with minimum cost and have minimal managing costs associated with it due to the economy of scale provided by cloud platforms. They can be further divided into the following points:

Create a user friendly portal
Have minimum operating costs
Achieve minimal developing costs
Prove that a cloud can be a viable way to provide digital infrastructure to students.
Data is secure and can be used for future tasks
page 3


Chapter 4







Economic Feasibility
	Due to inherent advantages of a large scale cloud platform like Google Cloud Platform (GCP)[7] the economic cost of developing a web based platform can be reduced a lot. As much as that, the cost of development can be reduced to only the time of developers developing the platform.

Technical Feasibility
The technical aspect of the project has been taken care of by the apis provided by FireBase platform[8]. They provide APIs for accessing the database in the cloud as well as hosting services for the website. We will be using github pages to host our project because it provides easier access to the source code.

Operational Feasibility
One of the major goals of the project is to minimise the operational cost of the platform. The platform can be hosted on github free of cost and the cost of using databases will increase with increase in the user base. That too will be minimal as compared to hosting the platform with its own servers.




page 4


Chapter 5










The proposed scheme is to create a website to act as a platform for all the academic members of the institution to communicate regarding their academic performances in a clear and transparent manner as well as digitally storing the marks of the student in a readable and future proof way.

 The website will be hosted on github pages[9] which provides a free hosting platform to all websites. The back end of the project will be handled by Firebase platform which is a subsidiary of Google Cloud Platform. We  will use the NOSQL database of the platform in order to store the marks and data of students. The reason for using NO SQL  database is that these types of databases use horizontal scalability rather than vertical scalability. As a result they can handle large amounts of data easily.


Teachers of the institution will be able to update scores of students and students will be able to view their score in orderly  fashion. Admins of the system will be able to give and provide various privileges to teachers and students and maintain the platform as well.

We will try to make this project as modular as possible so that any institution can add or remove features as they desire with little effort. This will immensely increase the scope of improvement and innovation in the project.

page 5








Fig.1 : Proposed System diagram





page 6


Chapter 6













Fig.2 : Software Engineering Paradigm applied

page 7
                                                                                                                             Chapter 7







Development

React js[10] (Frontend Framework by Facebook for managing frontend resources)
Firebase[8](Cloud Platform by Google used for project development)
Realtime Database ( NOSQL Database)
Authentication (Authentication)
Storage (Storage of files)
Hosting (Hosting of websites)
Git (For version control)
GitHub (For Storing and sharing of source code and hosting)
HTML (Basic scripting language for web development)
CSS (Styling language for web development)
JavaScript (Language for adding interactivity in web pages)
Bootstrap[11] (Frontend styling framework)


Users
Working internet connection
A device for accessing internet

page 8


Chapter 8






Fig.3 : Root directory of Database


Fig.4 : Batches directory of Database
page 9



Fig.5 : Students directory of Database




Fig.6 : Teachers directory of Database



Fig.7 : Users directory of Database

page 10

Chapter 9










The Indian Education system serves the world's second largest population. Adding to that a population which is mostly/predominantly young and education seeking. In this kind of scenario we should not overlook the need for innovation and digital infrastructure in our schools which we are lacking.This gap was brought to the top by the covid pandemic .

This project tries to highlight that cloud is a very cheap, powerful and readily available solution to the problems we are facing right now. Cloud platforms like Azure, Google cloud platform, and AWS can prove to be the way forward for our institutions in order to provide digital infrastructure to the future of our country.

This project highlights that a modular platform for institutions which can be designed and redesigned according to our need efficiently, can prove to be one of the ways we can move forward.





page 11

Chapter 10







https://cloudacademy.com/blog/surprising-ways-cloud-computing-is-changing-education/
https://cloudacademy.com/
https://cloudtweaks.com/2014/12/cloud-computing-education-2/
https://www.esds.co.in/
https://www.youtube.com/
https://www.youtube.com/watch?v=EBRkvhQyr_k
https://cloud.google.com/
https://firebase.google.com
https://pages.github.com/
https://reactjs.org
https://getbootstrap.com




page 12
