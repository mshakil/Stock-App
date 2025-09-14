# 📈 Stock Average Calculator App

A modern, responsive web and mobile application for calculating stock average prices and managing investment portfolios. Built with React, Vite, and Capacitor for cross-platform deployment.

## ✨ Features

### 📊 **Portfolio Management**
- Add, edit, and delete stock holdings
- Calculate average purchase prices
- Track total investment and current value
- Real-time profit/loss calculations
- Portfolio performance metrics

### 🧮 **Advanced Calculator**
- Interactive modal for complex calculations
- Support for multiple purchase transactions
- Automatic average price computation
- PKR currency formatting
- Input validation and error handling

### 📱 **Cross-Platform Support**
- **Web Application**: Responsive design for desktop and mobile browsers
- **Android APK**: Native mobile app using Capacitor
- **Modern UI**: Beautiful, intuitive interface with Tailwind CSS

### 💰 **Currency Support**
- Pakistani Rupee (PKR) formatting
- Localized number formatting
- Currency symbol integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for mobile development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Stock-App
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   # Start backend (from backend directory)
   npm start

   # Start frontend (from frontend directory)
   npm run dev
   ```

4. **Access the application**
   - Web: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 Mobile Development

### Building Android APK

1. **Build the web application**
   ```bash
   cd frontend
   npm run mobile:build
   ```

2. **Open Android Studio**
   ```bash
   npm run mobile:open
   ```

3. **Build APK in Android Studio**
   - Open the project in Android Studio
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK will be generated in `android/app/build/outputs/apk/`

### Mobile Commands
```bash
# Build and sync with Capacitor
npm run mobile:build

# Open Android Studio
npm run mobile:open

# Run on connected Android device
npm run mobile:android

# Sync web assets
npm run mobile:sync
```

## 🏗️ Project Structure

```
Stock-App/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── models.js       # Data models
│   │   └── index.js        # Server entry point
│   ├── data.db            # SQLite database
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # App entry point
│   ├── android/           # Android project (generated)
│   ├── capacitor.config.json
│   └── package.json
├── docker-compose.yml     # Docker configuration
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Capacitor** - Mobile app framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **CORS** - Cross-origin resource sharing

### Mobile
- **Capacitor** - Cross-platform mobile development
- **Android Studio** - Android development environment

## 📋 API Endpoints

### Holdings
- `GET /api/holdings` - Get all holdings
- `POST /api/holdings` - Create new holding
- `PUT /api/holdings/:id` - Update holding
- `DELETE /api/holdings/:id` - Delete holding

### Calculator
- `POST /api/calc` - Calculate average price

## 🎨 UI Components

### Dashboard
- Portfolio overview with key metrics
- Holdings list with inline editing
- Add new holding form
- Calculator modal

### Holding Form
- Stock symbol input
- Quantity and price inputs
- Date picker
- Form validation

### Calculator Modal
- Multiple transaction inputs
- Real-time calculations
- Reset functionality
- Results display

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
```

### Capacitor Configuration
The app is configured for:
- App ID: `com.stockapp.mobile`
- App Name: `Stock App`
- Android scheme: `https`

## 🚀 Deployment

### Web Deployment
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your web server

3. Ensure the backend API is accessible

### Mobile Deployment
1. Build the APK following the mobile development steps
2. Sign the APK for production
3. Distribute through Google Play Store or sideload

## 🐳 Docker Support

Run the entire application with Docker:
```bash
docker-compose up
```

This will start both frontend and backend services.

## 📝 Development Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run mobile:build # Build for mobile
npm run mobile:open  # Open Android Studio
```

### Backend
```bash
npm start            # Start production server
npm run dev          # Start development server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/Stock-App/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🔮 Future Enhancements

- [ ] Real-time stock price integration
- [ ] Portfolio performance charts
- [ ] Export/import functionality
- [ ] Multiple portfolio support
- [ ] Push notifications
- [ ] Dark mode theme
- [ ] iOS app support

## 📊 Screenshots

*Add screenshots of your application here*

---

**Built with ❤️ using React, Vite, and Capacitor**
