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


5. Open the browser at:

http://localhost:4200
