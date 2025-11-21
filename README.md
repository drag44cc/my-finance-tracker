# My Finance Tracker 💰

Aplikasi pencatat keuangan pribadi yang modern, cepat, dan mudah digunakan. Dibangun dengan teknologi web terbaru untuk performa maksimal dan pengalaman pengguna yang mulus.

![Dashboard Preview](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000)
*(Anda bisa mengganti gambar ini dengan screenshot aplikasi asli Anda nanti)*

## ✨ Fitur Utama

-   **Dashboard Interaktif**: Ringkasan saldo, pemasukan, dan pengeluaran dalam satu tampilan.
-   **Pencatatan Transaksi**: Tambah pemasukan dan pengeluaran dengan mudah.
-   **Manajemen Dompet (Wallet)**: Kelola berbagai sumber dana (Tunai, Bank, E-Wallet) dengan saldo terpisah.
-   **Kategori & Budgeting**: Atur kategori transaksi dan batasi pengeluaran dengan fitur Budget.
-   **Analisis & Laporan**:
    -   Grafik pengeluaran mingguan.
    -   Filter transaksi berdasarkan Bulan & Tahun.
    -   **Export PDF**: Unduh laporan keuangan dalam format PDF.
-   **Keamanan**: Sistem login aman menggunakan Supabase Auth.
-   **Performa Tinggi**: Pagination otomatis untuk memuat ribuan transaksi tanpa lag.

## 🛠️ Teknologi yang Digunakan

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **Charts**: [Recharts](https://recharts.org/)
-   **PDF Generation**: jsPDF

## 🚀 Cara Menjalankan (Local)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/drag44cc/my-finance-tracker.git
    cd my-finance-tracker
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env.local` di root folder dan isi dengan kredensial Supabase Anda:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    ```

4.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🌐 Cara Deploy ke Vercel

Aplikasi ini sangat mudah di-deploy menggunakan [Vercel](https://vercel.com).

1.  Push project ini ke GitHub Anda.
2.  Buka Vercel dan pilih **"Add New Project"**.
3.  Import repository `my-finance-tracker`.
4.  Di bagian **Environment Variables**, masukkan semua variable yang ada di `.env.local`.
5.  Klik **Deploy**.

## 📝 Lisensi

Project ini dibuat untuk keperluan pribadi dan pembelajaran. Silakan dikembangkan lebih lanjut!
