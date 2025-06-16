# ZeroCode Chatbot - Frontend Engineer Assignment

A production-ready chatbot web application built with Next.js, featuring secure authentication, simulated AI conversations, and modern UI/UX.

## 🚀 Features

### Core Requirements
- ✅ **Authentication**: JWT-based login/register flows
- ✅ **Real-time Chat**: Streaming AI responses with auto-scroll (simulated)
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Dark/Light Mode**: System preference detection with manual toggle
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Code Quality**: ESLint + Prettier configuration

### Bonus Features
- 🎤 **Voice Input**: Web Speech API integration for hands-free messaging
- 📋 **Prompt Templates**: Pre-built prompts for common use cases
- 📥 **Chat Export**: Export conversations as JSON or Markdown
- 📚 **Input History**: Navigate previous messages with arrow keys
- 🔄 **Loading States**: Smooth UX with proper loading indicators
- 🎨 **Modern UI**: Clean, professional interface with shadcn/ui components
- 🤖 **Simulated AI**: Intelligent response simulation without external APIs

## 🏗️ Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   Simulated AI  │
│                 │    │                 │    │                 │
│ • React/Next.js │◄──►│ • Authentication│◄──►│ • Smart Responses│
│ • TypeScript    │    │ • Chat Endpoint │    │ • Streaming     │
│ • Tailwind CSS  │    │ • JWT Tokens    │    │ • Context-Aware │
│ • shadcn/ui     │    │ • Validation    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

### Key Components
- **AuthProvider**: Context-based authentication state management
- **ChatInterface**: Real-time messaging with streaming responses
- **VoiceInput**: Web Speech API integration
- **PromptTemplates**: Categorized prompt suggestions
- **ThemeProvider**: Dark/light mode switching
- **SimulatedAI**: Intelligent response generation without external APIs

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-handle/zerocode-fe-assignment.git
   cd zerocode-fe-assignment
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Environment setup (optional)**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Optionally customize JWT secret in `.env.local`:
   \`\`\`
   JWT_SECRET=your_custom_jwt_secret_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Email**: demo@zerocode.com
- **Password**: demo123

## 🤖 Simulated AI Features

The application includes a sophisticated AI simulation that:
- Provides context-aware responses based on message content
- Simulates realistic typing delays and streaming
- Recognizes different topics (coding, help requests, greetings)
- Maintains conversation flow without external API dependencies

## 📱 Screenshots

### Login Screen
![Login Screen](https://via.placeholder.com/800x600/1f2937/ffffff?text=Login+Screen)

### Chat Interface - Light Mode
![Chat Light Mode](https://via.placeholder.com/800x600/ffffff/000000?text=Chat+Interface+Light)

### Chat Interface - Dark Mode
![Chat Dark Mode](https://via.placeholder.com/800x600/1f2937/ffffff?text=Chat+Interface+Dark)

### Prompt Templates
![Prompt Templates](https://via.placeholder.com/800x600/f3f4f6/000000?text=Prompt+Templates)

## 🧪 Testing

### Demo Credentials
Use the following credentials to test the application:
- **Email**: demo@zerocode.com
- **Password**: demo123

### Features to Test
1. **Authentication Flow**
   - Register new account
   - Login with demo credentials
   - JWT token persistence

2. **Chat Features**
   - Send messages and receive simulated AI responses
   - Voice input (click microphone icon)
   - Use prompt templates
   - Export chat history
   - Navigate input history with arrow keys

3. **UI/UX**
   - Toggle dark/light mode
   - Responsive design on mobile
   - Auto-scroll behavior
   - Loading states

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically (no environment variables required)

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Development

### Code Quality
\`\`\`bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Formatting
npm run format
\`\`\`

### Project Structure
\`\`\`
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── chat/          # Chat-related components
│   ├── ui/            # Reusable UI components
│   └── theme-provider.tsx # Theme context provider
├── hooks/              # Custom React hooks
├── lib/               # Utility functions and types
└── types/             # TypeScript type definitions
\`\`\`

### Environment Variables
\`\`\`bash
# Optional
JWT_SECRET=your_jwt_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Zod schemas for API validation
- **CORS Protection**: Next.js built-in security headers
- **XSS Prevention**: React's built-in XSS protection
- **Environment Variables**: Sensitive data protection

## 🎯 Performance Optimizations

- **Server Components**: Reduced client-side JavaScript
- **Streaming Responses**: Real-time chat experience
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: Efficient API response caching
- **Bundle Analysis**: Optimized build output

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Voice Input Support
- Chrome/Edge: Full support
- Firefox: Partial support
- Safari: Limited support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library

## 📞 Support

For questions or issues, please contact: zerocode.hiring@gmail.com

---

**Live Demo**: [https://zerocode-chatbot.vercel.app](https://zerocode-chatbot.vercel.app)
**Repository**: [https://github.com/your-handle/zerocode-fe-assignment](https://github.com/your-handle/zerocode-fe-assignment)
