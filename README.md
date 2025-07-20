
# Dynamic Form Creator

This project is a **Dynamic Form Creator** built using **React.js**. It generates a complete form layout based on a JSON schema and includes support for:

- Real-time and on-submit validation
- Nested forms (using cards)
- File uploads with mock support
- Fully dynamic rendering (no hardcoded fields)
- JSON output on submission

---

## Features

- Render fields dynamically from JSON
- Support for input types like text, number, email, date, select, multiselect, file
- Nested cards for grouped fields
- Validation with regex, min/max, required
- File upload (mocked)
- Final output displayed as a JSON object

---

## Technologies Used

- **Frontend:** React.js
- **Styling:** CSS
- **Backend:** Node.js with Express.js (optional for bonus)
- **File Upload:** Axios (Mocked upload)

---

## Folder Structure

```
dynamic-form-creator/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
│
├── server/ (Optional Backend)
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## How to Run the Project

### Prerequisites

Make sure Node.js and npm are installed.

### 1. Clone or Download the Project

```bash
git clone https://github.com/Shivani100604/Dynamic-Form-Creator.git
cd Dynamic-Form-Creator
```

### 2. Run the Client (React App)

```bash
cd client
npm install
npm start
```

Open browser at: [http://localhost:3000](http://localhost:3000)

### 3. (Optional) Run Backend Server

```bash
cd server
npm install
node index.js
```

Runs at: [http://localhost:5000](http://localhost:5000)

---

## Sample JSON Schema

```json
[
  {
    "title": "Name",
    "name": "name",
    "type": "text",
    "placeholder": "Enter your name",
    "validator": "^[a-zA-Z ]{3,}$",
    "required": true,
    "error": "Name must be at least 3 letters."
  },
  {
    "title": "Email",
    "name": "email",
    "type": "email",
    "placeholder": "you@example.com",
    "required": true,
    "error": "Invalid email format."
  }
]
```

---

## Submission Output

On successful form submission, the filled data is displayed below the form as JSON.

Example:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## Who Can Use This?

Perfect for:

- Beginners learning dynamic forms
- Students working on frontend + backend integration
- Assignments for web development

---

## Author

**Shivani**  
_Fresher Web Developer_  
GitHub: [shivani100604](https://github.com/shivani100604)

---

## Assignment Note

This project fulfills the assignment requirements:

- Dynamic rendering from JSON
- Real-time + submit-time validation
- File uploads supported
- Nested forms/cards
- JSON output submission
