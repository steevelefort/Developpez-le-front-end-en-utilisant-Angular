# Olympic Games Dashboard for Télésport

## 📋 Description
Interactive dashboard application for visualizing Olympic Games statistics. Built with Angular for Télésport to display medal counts, country participation data, and historical performance through interactive charts.

**Features:**
- 📊 Interactive pie chart showing medals per country
- 📈 Line chart displaying medal evolution over time (by country)
- 📱 Responsive design

## 🛠️ Stack
- **Framework:** Angular 20.1.2
- **Charts:** ngx-charts (swimlane)
- **Styling:** SCSS with responsive design
- **Data:** Local JSON mock data
## 📋 Prerequisites
- Node.js (version 20 or higher)
- npm (comes with Node.js)
- Angular CLI: `npm install -g @angular/cli`

## Run this app locally with the development server 

- Clone this repository : `git clone https://github.com/steevelefort/Developpez-le-front-end-en-utilisant-Angular.git`.
- Install node_modules before starting with `npm install` inside the folder.
- Run `npm start` at the root of the created folder.
- Navigate to `http://localhost:4200/`.

The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project structure

```text
├── README.md
├── src
│   ├── app
│   │   ├── app.component: Starting component
│   │   ├── components
│   │   │   └── tag: A little badge component to show a label with value
│   │   ├── core
│   │   │   ├── models
│   │   │   │   ├── LineChartData.ts: Type interface for ngx-line-charts
│   │   │   │   ├── Olympic.ts: Type interface to map JSON data
│   │   │   │   ├── Participation.ts: Type interface to map JSON data
│   │   │   │   └── PieChartData.ts: Type interface for ngx-pie-chart
│   │   │   └── services
│   │   │       ├── olympic.service.ts: Providing data (Olympics)
│   │   │       └── viewport.service.ts: Providing responsive capability
│   │   └── pages
│   │       ├── detail: show the details for one country
│   │       ├── home: main page with all countries
│   │       └── not-found: error page for 404 http errors
│   ├── assets
│   │   ├── images
│   │   │   ├── medal.svg: a medal icon (free)
│   │   │   └── retour.svg: a right arrow icon (free)
│   │   └── mock
│   │       └── olympic.json: given data
│   ├── favicon.ico
│   ├── index.html: starting html page
│   ├── main.ts: Typescript bootstrap
│   ├── styles.scss: main CSS style
```
