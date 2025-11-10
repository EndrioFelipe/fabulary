# Fabulary

[🇧🇷 Leia em Português](README-PT.md)

---

Fabulary is a digital storytelling platform built with a modern microservices architecture.  
It offers an immersive environment for creating, listing, and reading stories — featuring a gothic-magical aesthetic and seamless integration between a Spring Boot backend and an Angular frontend.

## Overview

The project is being developed as a personal laboratory to explore:

- Microservices with Spring Boot (Java)
- Asynchronous communication using Kafka
- Authentication via JWT
- Angular frontend with a custom theme (two visual modes: **Frame mode** and **Table mode**)

---

## Frontend (Angular)

### Running the frontend (development)

**Prerequisites:**
- Node.js installed  
- Angular CLI installed globally (`npm install -g @angular/cli`)

**Steps:**

### 1. Open a terminal (PowerShell on Windows) in the root of the project.

### 2. Navigate to the `angular` folder:

   ```powershell
   cd .\angular
   ```

(If you cloned the repo somewhere else, it will look like:)
PS C:\...\spring_security\angular>

### 3. Install dependencies (first time only):

   ```powershell
   npm install
   ```

### 4. Start the development server:

   ```powershell
   ng serve
   ```


### 5. Open the browser at:

   http://localhost:4200

---

## Kafka Setup (Windows)

### Installing and running Apache Kafka locally

**Prerequisites:**
- Java installed (Kafka requires Java 8 or later)
- Kafka downloaded and extracted (for example: `C:\kafka\kafka_2.13-3.9.0`)


### 1. Start ZooKeeper

Kafka requires ZooKeeper to manage its brokers.  
Open a **PowerShell** or **Command Prompt** window and run:

```powershell
cd "C:\kafka\kafka_2.13-3.9.0\bin\windows"
.\zookeeper-server-start.bat ..\..\config\zookeeper.properties
```

Keep this window open — ZooKeeper must keep running in the background.

### 2. Start Kafka Server
Open a new PowerShell window and run:

```powershell
cd "C:\kafka\kafka_2.13-3.9.0\bin\windows"
.\kafka-server-start.bat ..\..\config\server.properties
```

Keep this window open as well.

---


## Backend (Spring Boot)

### Running the microservices (development)

**Prerequisites:**
- Java 17 or higher installed  
- Maven installed and configured in the system PATH  
- Kafka running locally (see the section above)

---

### 1. Install Maven dependencies

Before running the microservices for the first time, open a terminal and navigate to each backend folder to download the required dependencies.

   ```powershell
   cd "C:\...\spring_security\security"
   mvn clean install
   ```
   
   Then:
   
   ```powershell
   cd C:\...\spring_security\fabulary-stories-service
   mvn clean install
   ```

   This will download all necessary dependencies to your local Maven repository.

### 2. Start the security-service (port 8080)
Navigate to the security service folder and start Spring Boot:

   ```powershell
   cd C:\...\spring_security\security"
   mvn spring-boot:run -D"spring-boot.run.arguments=--server.port=8080
   ```

   Keep this window open.
   This service is responsible for authentication and JWT token management.

### 3. Start the fabulary-stories-service (port 8081)
Open another PowerShell window and navigate to the stories service folder:

   ```powershell
   cd C:\...\spring_security\fabulary-stories-service
   mvn spring-boot:run -D"spring-boot.run.arguments=--server.port=8081
   ```

   Keep this one open too.
   This service handles the CRUD operations for stories and publishes Kafka events when new stories are created.

### 4. Verify both services are running
After both commands are running successfully, you should be able to access:

   Security service: http://localhost:8080
   
   Stories service: http://localhost:8081/api/v1/stories
