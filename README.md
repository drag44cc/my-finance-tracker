# My Finance Tracker 💰

Aplikasi pencatat keuangan pribadi yang modern, mobile-first, dan sangat mudah digunakan. Dibangun dengan Next.js 15 dan Supabase untuk performa maksimal dan pengalaman pengguna yang mulus.

## ✨ Fitur Utama

### 📊 Dashboard & Analytics
- **Dashboard Interaktif**: Ringkasan saldo total, pemasukan, dan pengeluaran dalam satu tampilan
- **Grafik Analytics**: Visualisasi pengeluaran mingguan dengan Recharts
- **Filter Transaksi**: Filter berdasarkan bulan & tahun
- **Export PDF**: Unduh laporan keuangan lengkap dalam format PDF

### 💸 Manajemen Transaksi
- **Tambah Transaksi**: Form intuitif untuk mencatat pemasukan dan pengeluaran
- **Edit & Hapus**: Kelola transaksi dengan mudah
- **Transfer Antar Wallet**: Pindahkan dana antar dompet dengan cepat
- **Auto DateTime**: Tanggal dan waktu otomatis terisi sesuai waktu sekarang
- **Kategori Fleksibel**: Kategorisasi transaksi untuk analisis yang lebih baik

### 👛 Multi-Wallet Management
- **Berbagai Dompet**: Kelola Tunai, Bank, E-Wallet, dan lainnya secara terpisah
- **Saldo Real-time**: Update otomatis setiap transaksi
- **Edit & Hapus Wallet**: Manajemen dompet yang lengkap

### 🎯 Budgeting & Categories
- **Set Budget**: Tentukan limit pengeluaran per kategori per bulan
- **Progress Tracking**: Monitor penggunaan budget dengan visual progress bar
- **Custom Categories**: Buat kategori income dan expense sesuai kebutuhan
- **Icon Support**: Emoji icon untuk setiap kategori

### 🎨 User Experience
- **Mobile-First Design**: Optimized untuk pengalaman mobile yang sempurna
- **Dark Mode**: Tema gelap yang nyaman di mata
- **Toast Notifications**: Feedback instan untuk setiap aksi (success/error)
- **Loading States**: 
  - Global loading overlay untuk semua async operations
  - Skeleton loaders untuk data fetching
  - Navigation progress bar dengan gradient indah
- **Form Validation**: Auto-close dialog & prevent double-click submissions

### 🔐 Keamanan & Performa
- **Secure Authentication**: Login sistem dengan Supabase Auth
- **Row Level Security (RLS)**: Data protection di database level
- **Pagination**: Load ribuan transaksi tanpa lag
- **Server-Side Rendering**: Fast page loads dengan Next.js 15

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router + Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)

### UI/UX
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) + Radix UI
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Toast**: [Sonner](https://sonner.emilkowal.ski/)
- **Progress**: [NProgress](https://ricostacruz.com/nprogress/)

### Features
- **PDF Generation**: jsPDF
- **Currency Formatting**: Built-in Intl.NumberFormat

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Supabase account

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/drag44cc/my-finance-tracker.git
   cd my-finance-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   
   Buat file `.env.local` di root folder:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup Database**
   
   Jalankan SQL script di Supabase SQL Editor:
   - Buat tables: `users`, `wallets`, `categories`, `transactions`, `budgets`
   - Setup RLS policies (termasuk wallet delete policy dari `supabase_wallet_delete_rls.sql`)

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Buka [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/drag44cc/my-finance-tracker)

1. Push code ke GitHub repository
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy! 🚀

## 📱 Screenshots

### Dashboard
Tampilan ringkasan keuangan dengan balance cards dan recent transactions.

### Analytics
Grafik pengeluaran mingguan dengan filter bulan/tahun.

### Add Transaction
Form tambah transaksi dengan auto datetime dan kategori.

### Budget Management
Progress tracking budget per kategori.

---

## 🤖 Developed with AI Assistance

Project ini dikembangkan dengan bantuan **AI-Powered Voice Coding** menggunakan:

- **Google Gemini 2.0 Flash (Experimental)** - AI assistant untuk code generation, debugging, dan architectural decisions
- **Voice-to-Code Workflow** - Natural language commands untuk rapid development
- **AI-Assisted Debugging** - Quick problem identification and solution suggestions

### Development Workflow
1. 🎤 **Voice Commands** → Describe features atau bugs
2. 🤖 **AI Processing** → Gemini generates code & solutions  
3. ⚡ **Instant Implementation** → Code applied automatically
4. ✅ **Verification** → Build, test, and iterate

> **Note**: While AI significantly accelerated development, all code is reviewed, tested, and customized for production quality.

---

## 📈 Development Progress

### Phase 1: Core Features ✅
- [x] Authentication system
- [x] Dashboard with balance summary
- [x] CRUD transactions
- [x] Multi-wallet management
- [x] Categories system

### Phase 2: Advanced Features ✅
- [x] Budget tracking
- [x] Analytics & charts
- [x] PDF export
- [x] Edit transactions
- [x] Transfer between wallets

### Phase 3: UX Enhancements ✅
- [x] Global loading indicators
- [x] Toast notifications
- [x] Navigation progress bar
- [x] Skeleton loaders
- [x] Form auto-close
- [x] Proper error handling

### Phase 4: Bug Fixes & Polish ✅
- [x] Text color visibility fixes
- [x] DateTime auto-fill
- [x] Wallet delete RLS policy
- [x] Toast notification accuracy
- [x] Double-click prevention

## 🎯 Roadmap

- [ ] Dark/Light mode toggle
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Data backup & restore
- [ ] Financial insights & tips

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

This project is open source and available for personal and educational use.

---

**Made with ❤️ using Next.js, Supabase, and AI**

⭐ Star this repo if you find it useful!
