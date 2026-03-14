# Facility Booking and Management System – Frontend

## Project Summary
This is the frontend module of the Facility Booking and Management System.
It is developed using React and provides a user interface for booking
and managing facilities. The frontend communicates with the backend
using REST APIs.

## Technologies Used
- React
- JavaScript
- HTML, CSS
- GitHub Actions (CI)
- SonarCloud (Code Quality)
- Docker
- Vercel

## Tasks Completed
- Development frontend
- Build project using Node
- Sonar analysis
- Proper pull request workflow
- Docker image build
- Vercel deployment
- Vercel deployment with domain name

## Screenshots
![Api text]_(https://github.com/asikanasar/facility-booking-frontend/blob/main/Screenshot%20(553).png)

## Sonarqube

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e767e831-101e-40db-8f43-e840e49c27fc" />

## Docker 

<img width="1920" height="916" alt="docker-image png" src="https://github.com/user-attachments/assets/ddcbb56c-ddd1-4d92-af0a-852d42b9e8bb" />


## Presentation

[Facility-Booking-Management-System.pptx](https://github.com/user-attachments/files/25184306/Facility-Booking-Management-System.pptx)


## Deployment
Frontend is deployed on Vercel.

## Azure App Service (Node.js) Deployment

This project is a React (CRA) SPA served in production using `serve`.

### App settings
- Set `REACT_APP_API_URL` to your backend base URL, for example:
	`https://facility-booking-backend-b4fweaehged4fxda.southeastasia-01.azurewebsites.net`
- Set `SCM_DO_BUILD_DURING_DEPLOYMENT=true` so App Service runs install + build.

### Startup
- Use the default start command: `npm start` (runs `serve -s build -l $PORT`).
- Ensure the App Service **Startup Command** setting is empty (or explicitly `npm start`).

If you previously set the Startup Command to `bash startup.sh`, clear it — this repo does not use `startup.sh`.

### Notes
- CRA environment variables (`REACT_APP_*`) are injected at build time, so the app must be built after setting `REACT_APP_API_URL`.

## Author
Asika M
