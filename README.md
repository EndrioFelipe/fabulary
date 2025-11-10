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

1. Open a terminal (PowerShell on Windows) in the root of the project.

2. Navigate to the `angular` folder:

   ```powershell
   cd .\angular
   ```

(If you cloned the repo somewhere else, it will look like:)
PS C:\...\spring_security\angular>

3. Install dependencies (first time only):

   ```powershell
   npm install
   ```

4. Start the development server:

   ```powershell
   ng serve
   ```


5. Open the browser at:

   http://localhost:4200



## Kafka Setup (Windows)

### Installing and running Apache Kafka locally

**Prerequisites:**
- Java installed (Kafka requires Java 8 or later)
- Kafka downloaded and extracted (for example: `C:\kafka\kafka_2.13-3.9.0`)

---

### 1. Start ZooKeeper

Kafka requires ZooKeeper to manage its brokers.  
Open a **PowerShell** or **Command Prompt** window and run:

```powershell
cd "C:\kafka\kafka_2.13-3.9.0\bin\windows"
.\zookeeper-server-start.bat ..\..\config\zookeeper.properties
```

Keep this window open — ZooKeeper must keep running in the background.

2. Start Kafka Server
Open a new PowerShell window and run:

```powershell
cd "C:\kafka\kafka_2.13-3.9.0\bin\windows"
.\kafka-server-start.bat ..\..\config\server.properties
```

Keep this window open as well.

