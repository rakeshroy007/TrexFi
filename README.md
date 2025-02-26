# TrexFi - Track Your Finance, Smartly! 🚀

TrexFi is a smart and powerful **finance tracker** that helps users manage their **Income** and **Expenses** across multiple accounts with smart categorization and recurring transactions. The name **TrexFi** is a fusion of **"Track"** and **"Finance"**—making financial tracking effortless.

With **AI-powered receipt scanning, budget alerts, and automated monthly reports**, TrexFi simplifies money management. Users can also visualize their financial data through interactive charts, making it easier to track spending patterns and stay on top of their finances. 🚀

## ✨ Features
- **Monthly Report via Email** 📩 - Get a detailed summary of your transactions for the last month.
- **Budget Limit Alerts** ⏰ - Stay on top of your finances with automatic notifications through email when you exceed your budget.
- **AI Receipt Scanner** 🤖 - Scan receipts and automatically fetch data into the transaction form.
- **Bot Protection & Rate Limiting** 🛡️ - Users can make up to **20 requests per hour**, with automatic refills every hour.
- **Secure Authentication** 🔒 - Powered by Clerk for seamless user authentication and authorization.

## 🚀 Tech Stack
TrexFi is built with cutting-edge tools and technologies to ensure high performance and security.

### **Frontend & UI**
- **Next.js** (15.1.6) - Server-side rendering & optimized performance
- **Tailwind CSS** - Modern utility-first styling
- **ShadCN UI** - Beautiful and customizable UI components

### **Backend & Database**
- **Prisma**  - ORM for efficient database management
- **SupaBase** - A scalable backend-as-a-service for authentication & storage
- **Inngest**  - Workflow automation for scheduled tasks



## 📊 How It Works
1. **User registers & logs in** using Clerk authentication.
2. **Transactions are added** manually or using the **AI** receipt scanner.
3. **Users receive monthly email reports** summarizing their transactions.
4. **Budget alerts are triggered** when expenses exceed set limits.
5. **Bot protection ensures fair usage**, allowing **20 requests per hour** with automatic refills.

## 🛠️ Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/rakeshroy007/TrexFi.git
   cd TrexFi

2. Install dependencies:
    ```sh
    npm install or npm install --legacy-peer-deps

3. Set up environment variables (e.g., SupaBase, Clerk, Prisma, Inngest, AI API keys).

4. Run the development server:
    ```sh
    npm run dev

5. Open http://localhost:3000 to see TrexFi in action!

## Environment Variables :

To run this project, you will need to add the following environment variables to your .env file
#### Clerk API Keys :

    1. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_public_key
    2. CLERK_SECRET_KEY=sk_test_your_secret_key
    3. NEXT_PUBLIC_CLERK_SIGN_IN_URL=sign-in
    4. NEXT_PUBLIC_CLERK_SIGN_UP_URL=sign-up

#### Database Connection (Supabase) :
    1. DATABASE_URL=postgresql://username:password@host:port/database?pgbouncer=true
    2. DIRECT_URL=postgresql://username:password@host:port/database

#### Arcjet API Key :
    ARCJET_KEY=ajkey_your_arcjet_key
 
#### Gemini AI API Key :
    GEMINI_API_KEY=your_gemini_api_key

#### SMTP (Email Sending Configuration) :
    1. SMTP_USER=your_email@example.com
    2. SMTP_PASS=your_smtp_password
    3. SMTP_PORT=465


## 🤝 Contributing
Feel free to fork this repository and contribute! If you find any issues, submit a pull request or open an issue.
