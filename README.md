This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Summary of technologies/frameworks/libraries
In this project, I have used Next.js to create a component, Leave Management for an Employee Web Portal. I have styled the application with Tailwind CSS and some custom, in-line CSS/styling. In addition, I have used `chart.js` and `react-chartjs-2` libraries to develop and render a Bar chart for leaves. I have also used `react-icons` for icons and the `react-toastify` library to display toast notifications. 

### Technologies/Frameworks/Libraries
1. Next.js - Framework for React.js
2. Tailwind CSS - CSS framework
3. Chart.js - JavaScript library for creating charts
4. `react-chartjs-2` - React wrapper for Chart.js
5. `react-icons` - Library for icons in React
6. `react-toastify` - Library for displaying toast notifications in React


## Additional features
1. Filter on Leave Type for Upcoming Leaves and Pending Approvals
2. Search functionality in the Pending Approvals table to search approvals based on Employee name
3. On login, store the token in local storage for authorization
4. Show toast notifications if login fails or succeeds

## Setup and Run the Application

1. First, clone the project to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies using the following command:
```bash
npm install
```
4. Run the development server

```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
6. After logging-in, navigate to the Leave Management->Overview tab to see the output.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
