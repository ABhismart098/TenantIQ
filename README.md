# 🏢 TenantIQ Backend

A **scalable and modular backend system** for managing tenants, properties, rent operations, grievances, and reporting in a rental management platform.

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **ORM:** Sequelize
* **Queue System:** Redis (Bull/BullMQ)
* **Containerization:** Docker *(PostgreSQL only)*

---

# 🧩 Business Modules

## 👤 User Management

* User registration & authentication
* Role-based access (`ADMIN`, `OWNER`, `TENANT`, `PROPERTY_MANAGER`)
* Account lifecycle (PENDING, ACTIVE, BLOCKED)

---

## 🏠 Property Management

* Property creation and management
* Ownership mapping (Owner → Property)
* Property activation/deactivation

---

## 💰 Rent Management

* Tenant assignment *(planned: property_tenants)*
* Rent calculation *(future)*
* Payment tracking *(future)*

---

## 🛠️ Grievance System

* Complaint registration by tenants
* Status lifecycle (OPEN → IN_PROGRESS → RESOLVED → CLOSED)
* Assignment to owner/property manager
* Comment & update tracking *(in progress)*

---

## 📊 Report Section

* User activity reports
* Complaint reports
* Property insights *(planned)*

---

## 🔐 Authentication & Security

* Password hashing (bcrypt)
* Secure reset tokens (hashed + expiry)
* Token reuse protection

---

## 🎭 RBAC (Role-Based Access Control)

* Role-based permissions
* Approval workflows handled at service layer

---

## 🔔 Notification System (Async)

* Redis-based queue
* Background email processing
* Non-blocking API execution

---

## 📊 Audit Logging

* User status logs
* Notification logs
* Approval logs

---

# 🏗️ Architecture Diagram

![Architecture Diagram](./docs/architecture.png)

---

## 🎬 Animated Flow (Coming Soon)

```md
![Architecture Flow](./docs/architecture.gif)
```

---

## 🧠 Architecture Explanation

### 🔹 Request Flow

Client → Routes → Controllers → Services

---

### 🔹 Data Layer

* Sequelize Models → PostgreSQL

---

### 🔹 Async Processing

* Redis Queue → Worker → Email/Notification

---

### 🔹 Validation & Security

* DTO / Validators
* Middleware (Auth & Role validation)

---

## 🔄 Flow Summary

```text
Client → Routes → Controllers → Services → Database
                               ↓
                        Redis Queue → Worker → Notification
```

---

# 🗂️ Project Structure

```bash
Backend/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── validations/
├── utils/
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── app.js
├── server.js
```

---

# 🧬 Database Overview

### Core Tables

* users
* roles
* properties

### Security

* reset_password_tokens

### Logs

* accounts_review_logs
* user_status_logs
* notification_logs

---

# ⚠️ Design Gap (Planned)

```sql
property_tenants
- id
- property_id
- user_id
- start_date
- end_date
```

---

# ⚙️ Setup & Installation

## 1. Clone Repository

```bash
git clone https://github.com/ABhismart098/TenantIQ.git
cd TenantIQ
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Environment Setup

Create `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

JWT_SECRET=your_secret_key
```

🔐 Do not commit `.env` file

---

## 4. Run PostgreSQL (Docker Only)

```bash
docker run --name tenantiq-db \
-e POSTGRES_PASSWORD=yourpassword \
-e POSTGRES_DB=your_db_name \
-p 5432:5432 \
-d postgres:18
```

---

## 5. Run Redis

```bash
redis-server
```

---

## 6. Run Project

```bash
npx sequelize db:migrate
npm run dev
```

---

# 📦 Current Setup

| Component  | Status |
| ---------- | ------ |
| Backend    | Local  |
| PostgreSQL | Docker |
| Redis      | Local  |

---

# 🔄 Example Flows

### User Registration

1. Register → `PENDING`
2. Approval required
3. Activated

---

### Password Reset

1. Request
2. Token generated
3. Job queued (Redis)
4. Email sent

---

# 🚀 Roadmap

* [ ] Property-Tenant Mapping
* [ ] Complete Grievance System
* [ ] Reporting Module Enhancement
* [ ] Full Docker Setup
* [ ] Payment Module

---

# 👨‍💻 Author

**Abhishek Yadav**

---

# 🏗️ Designed By

**TenantIQ**

---

# 📄 License

MIT License

---
