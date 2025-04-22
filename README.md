✅ `README.md`

```md
💰 Expense Manager Application

A full-stack expense management application built with **React.js** (frontend) and **Node.js + Express + MySQL** (backend). Users can register, log in, add income/expense transactions, view summaries, and export reports in PDF format.

```
/client        - React frontend (Tailwind + Shadcn UI)
/server        - Node.js backend (Express, MySQL, JWT)
/database      - SQL schema & seed data
```

---

🔐 Features

- User Authentication (JWT based)
- Add / View / Delete Expense Transactions
- Transaction Categories (Income / Expense)
- PDF Export with Summary & Paginated Table
- Token Refresh & Middleware-based Protection
- Clean UI with Tailwind CSS + Shadcn UI

---

🚀 Tech Stack

| Frontend                | Backend                       |
|-------------------------|-------------------------------|
| React.js                | Node.js (Express.js)          |
| React Router DOM        | MySQL                         |
| Tailwind CSS            | bcrypt (password hashing)     |
| Shadcn UI Components    | jsonwebtoken (JWT auth)       |
| Axios + Toastify        | PDFKit (PDF report export)    |

---

⚙️ Backend Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=expense_manager
   JWT_SECRET=your_secret
   TOKEN_EXPIRY=1d
   ```

3. **Run server**
   ```bash
   npm start
   ```

4. **Endpoints Overview**
   - `POST /auth/register` – Register user
   - `POST /auth/login` – Login user
   - `GET /expenses` – Get user's expenses
   - `POST /expenses` – Add expense
   - `DELETE /expenses/:id` – Delete expense
   - `GET /expenses/export/pdf` – Export report as PDF

---

## 💾 MySQL Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  token TEXT
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category ENUM('Income', 'Expense') NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🧩 Frontend Setup

1. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```

3. **Routes Overview**
   - `/login` – User login
   - `/register` – User registration
   - `/dashboard` – View/Add transactions
   - `/export/pdf` – Export button triggers report

4. **Token Handling**
   - JWT token is stored in `sessionStorage`
   - Authenticated routes use Axios with token in headers
   - Errors (like 401) are shown using `react-toastify`

---

## 📄 PDF Export Preview

The PDF includes:

- Report title + generation date
- Summary section (total income, expense, balance)
- Paginated table with:
  - Transaction ID
  - Type (Income/Expense)
  - Amount
  - Description
  - Date

---

## 🛡️ Middleware

- Token validation middleware (`authMiddleware.js`) verifies JWT before allowing access to protected routes like `/expenses`.

---

## 🧪 Future Improvements

- Search, filter, and sort transactions
- Monthly analytics / charts
- Recurring expense support
- Multi-device sync (PWA)
- Dark mode support

---

## 🧑‍💻 Author

Yash Jangid
