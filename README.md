# TechPulse — Technology News & Blog Website

TechPulse is a complete responsive multi-page technology news/blog website created as a Week 4 web development project.

## Pages
- `index.html` — Home page with latest stories, search and category filters
- `about.html` — About and mission page
- `services.html` — Technology categories
- `contact.html` — Contact page with client-side form validation

## Features
- Responsive mobile-first layout
- Semantic HTML structure
- Modern CSS design with responsive breakpoints
- JavaScript mobile navigation
- Article search and category filtering
- Clickable news cards with article detail modal
- Newsletter form validation
- Contact form validation
- Accessible labels and keyboard-friendly controls
- Local SVG-style CSS artwork, so no external image dependency is required
- Clean folder structure suitable for GitHub Pages

## Technologies
HTML5 · CSS3 · JavaScript (ES6)

## How to run
Open `index.html` in a browser, or use VS Code Live Server.

## Real contact form setup
The contact page is prepared for Formspree, which provides a backend for static HTML forms. Create a form in your Formspree account and replace `YOUR_FORM_ID` in `contact.html` with your form ID. Formspree's official setup requires an `action` endpoint and named form fields. See the official guide: https://formspree.io/html/

## Deployment
This project can be deployed directly with GitHub Pages or another static hosting service.

## Project Structure
```text
TechPulse-News/
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── README.md
```

## Note
This is an educational/demo project. The contact and newsletter forms validate data in the browser but do not send data to a backend server.
