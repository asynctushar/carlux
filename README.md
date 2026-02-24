# 🚗 Carlux

Modern Car Inventory Dashboard built with **Next.js**, **TypeScript**, **ShadCN UI**, and **Tailwind CSS**.

Carlux is a clean, responsive vehicle inventory application that fetches data from an external API and provides a smooth UI/UX experience with search, filtering, pagination, and modal previews.

---

## 🌍 Live Demo

🔗 https://carlux-inventory.vercel.app/

---

## 🔗 Repository

GitHub: https://github.com/asynctushar/carlux

---

## ✨ Features

- 🚘 Vehicle inventory listing
- 🔍 Search functionality
- 🗂 Category filtering
- 📄 Pagination support
- 🖼 Image modal preview
- ⚡ Optimized data fetching with caching & revalidation
- 🎨 Modern UI with ShadCN components
- 📱 Fully responsive design
- 🛡 Type-safe architecture using TypeScript
- 🧩 Clean component-based structure
- 🌙 Theme support (Light / Dark mode)

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI**
- **Lucide Icons**
- **DummyJSON API**
- **Vercel (Deployment)**

---

## 🌐 API Configuration

This project uses only **one environment variable**, defined in:

`.env.local`

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

A sample file is also provided:

`.env.sample`

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/asynctushar/carlux.git
cd carlux
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
app/
 ├── layout.tsx
 ├── page.tsx                # Redirects to /inventory
 └── (dashboard)/
      ├── layout.tsx
      └── inventory/
           ├── page.tsx
           └── loading.tsx

components/
 ├── themes/
 ├── layout/
 └── inventory/

services/
 └── car.service.ts

types/
 └── car.type.ts
```

---

## 🧠 Architecture Overview

### 🖥 Server Components
- Fetch vehicle data in route page
- Handle error states
- Implement caching & revalidation

### 💻 Client Components
- Search functionality
- Category filtering
- Pagination logic
- Image modal interactions
- Theme toggle support

### 🧩 Layout Structure
- Root layout (`app/layout.tsx`)
- Dashboard layout grouping (`app/(dashboard)/layout.tsx`)
- Inventory page inside dashboard route group
- Loading UI for better UX during data fetching

---

## 🎯 UI / UX Principles Applied

- Clear visual hierarchy
- Modern card-based layout
- Skeleton loading state
- Centered and friendly error UI
- Responsive grid system
- Smooth filtering interactions
- Accessible ShadCN components
- Clean spacing & typography
- Dark/Light theme support

---

## 🔒 Environment & Caching Strategy

- Uses `force-cache`
- Revalidates every 1 hour
- Client-side filtering for instant experience
- Optimized for performance and scalability

---

## 👨‍💻 Author

GitHub: **@asynctushar**

---

## 📄 License

This project is open-source and available under the MIT License.