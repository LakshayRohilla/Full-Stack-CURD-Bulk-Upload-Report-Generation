# Full-Stack-CURD-Bulk-Upload-Report-Generation
Full Stack Application with PERN(Postgres, Express, React, Node) stack. Includes features like CURD operations, Bulk upload and Report Generation

# Task :
**a.) Develop a system using React, Node.js, and an RDBMS (MySQL/PostgreSQL) with the following features:**

1 - User CRUD - Can create and update categories/products. 

2- Category CRUD - Manage categories efficiently.

3- Product CRUD - Products must belong to a category.

4- Bulk Upload - Handle large product data uploads without timeout errors (504).

5- Report Generation - Download product reports (CSV/XLSX) without timeout errors.

**b.) Product List API Requirements:**

1.) Server-side pagination.

2.) Sorting by price (asc/desc).

3.) Search by category and product names.

**c.) Database & API Requirements:**

1.) User: Email, Encrypted Password.

2.) Category: Name, UniqueID (auto-generated).

3.) Product: Name, Price, UniqueID (auto-generated), Category (belongs to a category).

# Postman Collection :
https://.postman.co/workspace/MERN-E-Commers~04eeba3d-8c40-4bf3-8997-43f2b824bbe4/collection/5202788-01f08698-57e4-4e31-9ab9-3c2b14dc2ea8?action=share&creator=5202788&active-environment=5202788-f487500d-c48c-4111-8fc8-bc0fff6cef72

# ⭐ Key features :
- Full CRUD for Products, Categories and Users (frontend + backend).
- Centralized, reusable table component with sorting, pagination, selection and toolbar actions (Edit / Delete).
- Edit forms with prefilled data (single form used for both create and edit).
- Bulk product upload from Excel (.xlsx/.xls) using Multer (file upload) and server validation; user receives detailed acknowledgement with success / failure rows.
- Report generation for products:
  - Preview filtered product list in UI.
  - Downloadable exports in CSV (fast-csv) and XLSX (exceljs) formats.
  - Category summary included (category name + product counts).
- State & data fetching handled by Redux Toolkit Query (RTK Query) — queries and mutations with cache invalidation.
- Robust success / error alerts and loading states in the UI (MUI).
- Sequelize ORM with migrations for PostgreSQL schema management.
- Codebase structured with routes, controllers and services (clear separation of presentation/business/data layers).

# 🧩 Technology stack :
- Frontend: React, Material‑UI (MUI), Redux Toolkit (RTK Query), React Router
- Backend: Node.js, Express.js
- Database: PostgreSQL, Sequelize ORM, Sequelize Migrations
- File handling & parsing: Multer (upload), exceljs (XLSX), fast-csv (CSV streaming)
- Build & tooling: npm / yarn

# 📐 Architecture & design principles :
- Separation of concerns:
  - Routes → lightweight HTTP layer.
  - Controllers → handle request/response and validation.
  - Services → business logic & DB interactions (reusable, testable).
  - Models → Sequelize models and migrations for DB schema.
- Centralized UI components (e.g., CentralizedTable) to maximize reuse and consistent UX.
- RTK Query for declarative data fetching, caching and mutation handling with tag-based invalidation.

# 🔁 Bulk upload (Excel):
- Client selects Excel file (.xlsx/.xls) → uploaded via multipart/form-data.
- Server receives file via Multer, parses rows with exceljs, validates per-row business rules.
- Server responds with an acknowledgement object:
  - successCount, failedCount, total, and an errors array with row-level reasons.
- UI shows success / error details and auto-scrolls to results.

# 📊 Report generation & download :
- Preview endpoint returns JSON with:
  - products: product rows (with category name)
  - categorySummary: array of { id, name, productCount }
- Download endpoint streams CSV (fast-csv) or writes XLSX workbook (exceljs) including products and category summary.
- Frontend uses RTK Query mutation to fetch Blob and triggers browser download.


# Navigation Drawer :
<img width="1916" height="971" alt="1" src="https://github.com/user-attachments/assets/6398ee2c-836a-417a-b3c4-136f56001182" />

# User CRUD :
<img width="1917" height="967" alt="2" src="https://github.com/user-attachments/assets/2104f40f-fc7a-4cf4-88fb-b272324b009f" />
<img width="1918" height="963" alt="3" src="https://github.com/user-attachments/assets/eaaa09c3-fb27-4f66-af37-f7c8f69c29e7" />
<img width="1918" height="968" alt="4" src="https://github.com/user-attachments/assets/c5096ee8-02f8-42e3-94f2-81dc33a23924" />
<img width="1912" height="967" alt="5" src="https://github.com/user-attachments/assets/a59deeeb-53ee-45c4-a5ec-b1073ab5ea69" />
<img width="1918" height="966" alt="6" src="https://github.com/user-attachments/assets/3c8075e4-36fe-42e0-9971-92274ed52290" />
<img width="1917" height="973" alt="7" src="https://github.com/user-attachments/assets/e4ce0a0f-670c-430d-9b13-83bdcff7b75b" />
<img width="1918" height="970" alt="8" src="https://github.com/user-attachments/assets/734948e7-20e6-4e65-85dc-32a01d74eec7" />
<img width="1918" height="967" alt="9" src="https://github.com/user-attachments/assets/7f5019a9-8eb1-4e0d-9673-97b66d70e296" />

# Category CRUD :
<img width="1918" height="970" alt="c1" src="https://github.com/user-attachments/assets/e4857582-9e4e-42e5-8481-ceb7c5f1cc06" />
<img width="1918" height="966" alt="c2" src="https://github.com/user-attachments/assets/5fd2f2f2-ff86-41b2-a7ff-08428c3a551e" />
<img width="1918" height="972" alt="c3" src="https://github.com/user-attachments/assets/1e0add35-7991-4e05-b8b9-143528240e83" />
<img width="1918" height="968" alt="c4" src="https://github.com/user-attachments/assets/03e74e25-adb2-4402-8c96-3ae99ecdf1b4" />
<img width="1918" height="967" alt="c5" src="https://github.com/user-attachments/assets/2e11fcab-c6a9-4f7d-873e-8908ad7cf77a" />
<img width="1918" height="972" alt="c6" src="https://github.com/user-attachments/assets/0839a5ba-a3aa-4844-bac8-9c9e20e34f11" />
<img width="1915" height="968" alt="c7" src="https://github.com/user-attachments/assets/e9f28a9a-4d3d-45e9-a68d-e799aca17a7a" />
<img width="1918" height="968" alt="c8" src="https://github.com/user-attachments/assets/021ff95c-4f1e-4c41-b960-ee4a64c3c580" />
<img width="1916" height="963" alt="c9" src="https://github.com/user-attachments/assets/3a010b29-d96c-446c-a261-c9c87b8a8ee5" />
# Product CRUD :
<img width="1917" height="968" alt="p1" src="https://github.com/user-attachments/assets/62120f03-63fe-4b8d-ac6f-21a669d08273" />
<img width="1918" height="970" alt="p2" src="https://github.com/user-attachments/assets/8ead3d2f-a934-42eb-9e12-65cd6838102f" />
<img width="1917" height="970" alt="p3" src="https://github.com/user-attachments/assets/de0bb337-fa84-4282-a8f9-32df75b094e6" />
<img width="1918" height="972" alt="p4" src="https://github.com/user-attachments/assets/81595f20-b5b9-497d-bcee-5938e6def917" />
<img width="1917" height="963" alt="p5" src="https://github.com/user-attachments/assets/92f8788d-1927-43bd-a04a-849d2b9b86fe" />
<img width="1918" height="972" alt="p6" src="https://github.com/user-attachments/assets/ec97f95d-7be5-4a1d-b646-642de38f392a" />
<img width="1918" height="971" alt="p7" src="https://github.com/user-attachments/assets/dcb266eb-46d0-493c-b4b2-8a076e1928f5" />

# Bulk Upload :
<img width="1918" height="967" alt="b1" src="https://github.com/user-attachments/assets/0fc868cc-aa37-4481-b52c-56ee11c2a112" />
<img width="1908" height="978" alt="b2" src="https://github.com/user-attachments/assets/4b967ded-af96-45db-a19b-b0d0b0717ca2" />
<img width="1918" height="967" alt="b3 2" src="https://github.com/user-attachments/assets/832ac697-bc4c-48de-9360-6f65dd3f1922" />
<img width="1915" height="963" alt="b3" src="https://github.com/user-attachments/assets/389e9b70-8f8b-44d2-82a4-400cceb7738c" />
<img width="1916" height="915" alt="b4" src="https://github.com/user-attachments/assets/1f376258-d895-4f61-8f97-2a159e31f60e" />
**Error handling :**
<img width="1918" height="973" alt="b5" src="https://github.com/user-attachments/assets/2acaa946-9cf3-47a6-93f9-f42989b51d17" />

# Report Generation :
<img width="1917" height="972" alt="r1" src="https://github.com/user-attachments/assets/96c6a3c9-4b1f-4751-b209-d7380ebc1f6c" />
<img width="1918" height="968" alt="r2" src="https://github.com/user-attachments/assets/eca5c142-129d-4238-9a06-5b0897f2fd20" />
<img width="1918" height="975" alt="r3" src="https://github.com/user-attachments/assets/8919d456-13e7-4035-81be-a0e07db6839e" />
<img width="1918" height="972" alt="r4" src="https://github.com/user-attachments/assets/6b08ee21-895d-4acf-9f8e-c8b8176dc174" />
<img width="1915" height="967" alt="r5" src="https://github.com/user-attachments/assets/864aa57c-012e-4936-a417-b5871da57b51" />
<img width="1918" height="977" alt="r6" src="https://github.com/user-attachments/assets/ac39f6ba-9b07-44ee-8c41-f08664ce5332" />
<img width="1210" height="776" alt="r7" src="https://github.com/user-attachments/assets/0f3687e2-5a15-45ea-81cb-9fb82e35666b" />
<img width="1087" height="767" alt="r8" src="https://github.com/user-attachments/assets/85cca973-28f5-4f4e-83ec-30ccdf6cb224" />










