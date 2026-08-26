# 🏢 TenantIQ Backend

A **scalable and modular backend system** for managing tenants, properties, rent operations, grievances, and reporting in a rental management platform.

## 🧱 Architecture Principles and Design Direction

This project should remain a **module-based monolith** rather than adopting a distributed architecture by default. The goal is to keep one deployable application with strong internal boundaries, clear module ownership, and clean interfaces.

### SOLID Principles to Follow
- **Single Responsibility Principle (SRP):** each module, service, controller, or DTO should have one clear purpose.
- **Open/Closed Principle (OCP):** extend modules through new logic and contracts rather than rewriting existing core behavior.
- **Liskov Substitution Principle (LSP):** interfaces and service contracts should remain dependable and interchangeable.
- **Interface Segregation Principle (ISP):** keep contracts focused and avoid forcing unrelated dependencies into a single abstraction.
- **Dependency Inversion Principle (DIP):** higher-level modules should depend on abstractions and stable interfaces, not on concrete implementations.

### Module-Based Monolith Rules
- Keep the system as a single deployable application with well-defined internal modules.
- Each module should own its own routes, controllers, services, DTOs, and data access concerns.
- Cross-module communication should happen through explicit contracts and shared abstractions.
- Shared concerns such as authentication, validation, logging, notifications, and audit should live in a shared kernel or common infrastructure layer.
- Avoid circular dependencies and keep module boundaries clear.
- Do not introduce microservices or distributed patterns unless the domain complexity clearly justifies it.

### Core Modules
- **Auth & Access**
- **User & Role Management**
- **Property & Ownership**
- **Complaints & Escalations**
- **Payments & Billing**
- **Leads & Approvals**
- **Notifications & Reporting**
- **Permissions & Audit**

### Development Guardrails
- Controllers should stay thin and delegate business logic to services.
- Services should contain business rules and orchestrate workflows.
- Routes should focus on HTTP concerns only.
- DTOs should validate and shape request/response payloads.
- Keep business logic inside the appropriate module rather than mixing it across layers.

## Run with Docker

1. Copy `.env.example` to `.env` and set strong `POSTGRES_PASSWORD` and `JWT_SECRET` values.
2. Start the complete stack:

   ```bash
   docker compose up --build
   ```

   The API is available at `http://localhost:4000`, the web frontend at
   `http://localhost:8080`, PostgreSQL on `localhost:5432`, and Redis is kept
   internal to Docker. The backend applies Sequelize migrations before it starts.

3. Stop containers while keeping database data:

   ```bash
   docker compose down
   ```

   To also remove database and Redis data, use `docker compose down -v`.

Never commit `.env`. Rotate the SMTP app password that was previously stored in
`Backend/.env` before using this deployment.

Import `postman/TenantIQ.postman_collection.json` into Postman to test the
active APIs. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` before starting
Docker; the startup seed creates or updates that active administrator.

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

(../transfer_project/backend/doc/<img width="1792" height="1402" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/23588b8a-d93a-4b49-ab0c-1e0ceb398498" />
)

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

© 2026 Abhishek Yadav. All rights reserved.

This project is for educational and demonstration purposes only.
Unauthorized use, copying, or distribution is prohibited without permission.
