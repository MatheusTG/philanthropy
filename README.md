![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-Legacy-darkblue)

# ❤️ Philanthropy

Philanthropy is a legacy project developed in early 2024 with the purpose of promoting the philanthropic campaign of the UTFPR-CM Technical Program. The campaign annually supports the donation of tons of food and pet supplies, as well as wheelchairs, blood, bone marrow, and hair.

This project was built during my learning process with the Django framework (Python) and represents my first real-world application developed using this technology.

> Note: This is a legacy project and is no longer under active development. It remains available for learning and reference purposes.

---

## 🚀 Technologies Used

| Technology                                                                                                        | Description                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)             | High-level programming language used for building the backend and application logic.        |
| ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)             | Python web framework used to develop the backend with a clean and scalable architecture.    |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | Strongly typed superset of JavaScript used to improve code reliability and maintainability. |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)                | Markup language used to structure the application’s web pages.                              |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)                   | Styling language used to design and visually enhance the user interface.                    |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                   | Modern frontend build tool providing fast development and optimized production builds.      |

---

## 🎯 Purpose

This project was built to demonstrate:

- A real-world philanthropic web application developed for an academic campaign
- Practical use of Django and Python in a first production-level project using these technologies.
- Integration of frontend technologies to deliver a simple and functional user experience

---

## 🎨 Design (Figma)

The visual design and interface prototypes for this project were created in Figma.

👉 **[View the Figma design](https://www.figma.com/design/tTvYstHPaVJ1COd5q2WNkw/UTFPR?node-id=0-1&t=Wljy7j5BzJFbbXC1-1)**

---

## 🎬 Demo

https://github.com/user-attachments/assets/20413b3f-b518-4944-bd41-a3140d19c8c3

---

## 📋 Requirements

Before running the project locally, make sure your environment meets the following requirements:

### 🧰 System & Runtime

- **Python ≥ 3.12**  
  Required to run the Django backend and its dependencies.

- **Node.js ≥ 18**  
  Required for Vite, TypeScript, and frontend tooling.

- **npm**  
  Package manager used to install and run frontend dependencies.

### 🧑‍💻 Development Environment (Optional)

- Visual Studio Code  
  Recommended editor for full-stack development with Python and TypeScript.

---

## 🛠️ Installation & Usage

Follow the steps below to run the project locally.

### 1️⃣ Clone the repository

Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/MatheusTG/philanthropy.git
cd philanthropy
```

### 2️⃣ Create and activate a virtual environment

Create a Python virtual environment and activate it according to your terminal:

```bash
python -m venv venv
```

#### Windows (PowerShell)

```
venv/Scripts/activate
```

#### Windows (Git Bash)

```
source venv/Scripts/activate
```

### 3️⃣ Install dependencies

Install backend and frontend dependencies:

```bash
pip install -r requirements.txt
npm install
```

### 4️⃣ Configure environment variables

Create a `.env` file in the project root with the following variables:

```bash
DEBUG=true

SECRET_KEY='your_secret_key'

# Database
PGDATABASE=your_database
PGUSER=your_user
PGPASSWORD=your_password
PGHOST=your_host
PGPORT=your_port
```

### 5️⃣ Apply database migrations

Run Django migrations to set up the database schema:

```bash
python manage.py migrate
```

### 6️⃣ Run the project

Start the Django backend and Vite frontend concurrently:

```bash
npm start
```

### 7️⃣ Access the application

Open your browser and navigate to:

```bash
http://localhost:8000
```

---

## 📜 Available Scripts

- `npm run start` – Starts the Django backend and Vite frontend concurrently in development mode
- `npm run build` – Compiles TypeScript and builds the frontend for production using Vite

---

## 📁 Project Structure

```bash
philanthropy
├── accounts/                 # Django app responsible for user-related features
│   ├── migrations/           # Database migration files
│   ├── admin.py              # Django admin configurations
│   ├── apps.py               # App configuration
│   ├── forms.py              # Django forms
│   ├── models.py             # Database models
│   ├── tests.py              # Application tests
│   ├── urls.py               # App-level routes
│   └── views.py              # View functions / controllers
│
├── core/                     # Core Django app with shared features
│   ├── migrations/           # Database migration files
│   ├── templates/            # App-specific templates
│   ├── templatetags/         # Custom Django template tags
│   ├── admin.py              # Admin configurations
│   ├── apps.py               # App configuration
│   ├── models.py             # Shared models
│   ├── tests.py              # Tests
│   ├── urls.py               # Core routes
│   └── views.py              # Core views
│
├── philanthropy/             # Django project configuration
│   ├── asgi.py               # ASGI application entry point
│   ├── settings.py           # Global Django settings
│   ├── urls.py               # Project-level URL configuration
│   └── wsgi.py               # WSGI application entry point
│
├── src/
│   ├── css/                  # Global stylesheets
│   ├── img/                  # Static image assets
│   └── ts/                   # TypeScript source files
│
├── templates/                # Global Django templates
│   ├── partials/             # Reusable template fragments
│   └── base.html             # Base HTML layout
│
├── build_files.sh            # Build script
├── db.sqlite3                # SQLite database (development)
└── index.html                # Frontend entry HTML
```

---

## 🤝 Contributing

Contributions are welcome and appreciated!

If you want to contribute to this project, please follow the steps below:

1. Fork the repository
2. Create a new branch (`git checkout -b feat/your-feature-name`)
3. Make your changes
4. Commit your changes following the Conventional Commits standard
5. Push your branch (`git push origin feat/your-feature-name`)
6. Open a Pull Request

### Commit Convention

This project follows the Conventional Commits specification:

- feat: A new feature
- fix: A bug fix
- refactor: Code refactoring without behavior change
- test: Adding or updating tests
- chore: Maintenance tasks and tooling changes
- docs: Documentation changes

Please make sure your code is well-tested and follows the existing project structure and linting rules.

---

## 📄 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software, provided that the original copyright
and license notice are included in all copies or substantial portions of the software.
