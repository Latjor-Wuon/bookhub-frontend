# BookHub Frontend

A modern React application for book discovery and management, built with TypeScript, Material-UI, and Redux Toolkit.

## 🚀 Features

- **Book Discovery**: Browse and search through a vast collection of books
- **User Authentication**: Secure login and registration system
- **Book Management**: Add, edit, and delete books
- **Favorites**: Save your favorite books
- **Responsive Design**: Works seamlessly on all devices
- **Real-time Search**: Instant search with filters and sorting

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI** for beautiful components
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API calls

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── store/         # Redux store and slices
│   ├── api/           # API service functions
│   ├── types/         # TypeScript type definitions
│   ├── context/       # React context providers
│   └── assets/        # Static assets
├── public/            # Public assets
├── package.json
├── vite.config.ts
└── railway.json       # Railway deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Latjor-Wuon/bookhub-frontend.git
   cd bookhub-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Make sure backend API is running on `http://localhost:3000`

## 🌐 Railway Deployment

### Automatic Deployment

1. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will auto-detect the configuration

2. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-api.railway.app/api
   ```

3. **Deploy**
   - Railway will automatically build and deploy
   - Your frontend will be live at `https://your-project.railway.app`

### Manual Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: User preference support
- **Search & Filter**: Advanced book discovery
- **Pagination**: Efficient data loading
- **Favorites**: Save and manage favorite books
- **User Profile**: Manage user information

### State Management
- **Redux Toolkit**: Modern Redux with less boilerplate
- **Auth Slice**: User authentication state
- **Books Slice**: Book management state
- **Persistent State**: Local storage integration

## 🔗 API Integration

The frontend connects to the backend API for:
- **Authentication**: Login and registration
- **Book Management**: CRUD operations
- **User Data**: Profile management
- **Search & Filter**: Book discovery

## 📱 Mobile Support

- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Progressive Web App**: Installable on mobile devices

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |

## 🚀 Performance

- **Vite Build**: Fast development and optimized production builds
- **Code Splitting**: Automatic code splitting for better performance
- **Lazy Loading**: Components loaded on demand
- **CDN**: Global content delivery via Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Latjor Wuon**
- GitHub: [@Latjor-Wuon](https://github.com/Latjor-Wuon)
- Email: l.dak@alustudent.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Material-UI for beautiful components
- Redux Toolkit for state management
- Vite for fast development experience

---

**BookHub Frontend** - Discover your next favorite book! 📚✨
