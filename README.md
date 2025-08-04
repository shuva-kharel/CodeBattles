# ⚔️ CodeBattles

> A thrilling and interactive **coding battle arena** — built with **React** to make programming fun, competitive, and social!

Challenge your friends, test your skills, and grow as a coder — all in a sleek, gamified environment.

## 🔧 Real Code Execution

CodeBattles now features **real code validation** using the Judge0 API! Submit actual working code in multiple programming languages:

- **Python 3.8.1** - Perfect for beginners
- **JavaScript (Node.js)** - Web development favorite  
- **C++ (GCC 9.2.0)** - Performance-focused challenges
- **Java (OpenJDK 13)** - Enterprise-grade solutions
- **C (GCC 9.2.0)** - Low-level programming
- **C# (Mono 6.6.0)** - .NET ecosystem
- **Go (1.13.5)** - Modern systems programming
- **Rust (1.40.0)** - Memory-safe systems programming

### Security Features
- ✅ Sandboxed execution environment
- ✅ Time limits (2 seconds CPU time)
- ✅ Memory limits (128MB)
- ✅ File system restrictions
- ✅ Network access blocked
- ✅ Syntax validation before execution

---

## 🚀 Features

- 🧠 **Real code execution** with Judge0 API
- 💻 **Multi-language support** (Python, JavaScript, C++, Java, C, C#, Go, Rust)
- 🔒 **Secure sandboxed environment** for code execution
- ⚡ **Real-time feedback** with actual test case validation
- ⏱️ Countdown timer for high-pressure situations
- 🎯 Score-based performance tracking
- 👥 1v1 battle mode (multiplayer coming soon!)
- 💬 In-battle chat and reactions
- 🎨 Clean and responsive UI with dark/light mode
- 🧩 Add your own challenges (admin access)

---

## 👩‍💻 Built With

- **Frontend:** React.js (Vite)
- **State Management:** Context API
- **Styling:** TailwindCSS
- **Routing:** React Router
- **Animations:** Framer Motion
- **Deployment:** Vercel

---

## 🌟 Project Vision

💡 CodeBattles was born from the idea that learning to code doesn't have to be lonely or boring.
By turning practice into a game, we help devs stay sharp, motivated, and connected.

---

## ⚙️ How It Works

1. Select a coding challenge or invite a friend to battle.
2. Choose your preferred programming language.
3. Code your solution in the built-in editor with syntax validation.
4. Run your code against test cases to see real execution results.
5. Submit your working solution before time runs out!
6. View detailed execution metrics and celebrate victories 🎉

---

## 🛠️ Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/shuva-kharel/CodeBattles
cd CodeBattles

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your RapidAPI key for Judge0

# Run the development server
npm run dev

# Open your browser
http://localhost:3000
```

### 🔑 API Setup

To enable real code execution, you'll need a free RapidAPI key:

1. Visit [RapidAPI Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Sign up for a free account
3. Subscribe to the Judge0 CE API (free tier available)
4. Copy your API key to the `.env` file:
   ```
   VITE_RAPIDAPI_KEY=your-actual-api-key-here
   ```

**Free Tier Limits:**
- 50 requests per day
- Perfect for testing and development
- Upgrade available for production use

✨ **Live Demo:**
🌍 [CodeBattles.vercel.app](https://codebattles-navy.vercel.app/)

---

## 🙌 Contributing

This started as a solo challenge project, but it's open to all contributions!
Submit PRs for features like:

- Additional programming language support
- Custom test case creation
- Advanced code analysis and hints
- Multiplayer matchmaking
- Code editor themes
- Leaderboard and profile system

Let's build something epic together!

---

## 🔧 Technical Implementation

### Code Execution Architecture

```
Frontend (React) → Judge0 API → Secure Docker Container → Results
```

**Security Measures:**
- All code runs in isolated Docker containers
- Strict resource limits (CPU, memory, time)
- No network or file system access
- Input/output sanitization
- Malicious code pattern detection

**Supported Test Case Formats:**
- Standard input/output validation
- Multiple test cases per challenge
- Detailed execution metrics
- Compilation and runtime error reporting

---

## 🧠 Inspiration

Inspired by platforms like LeetCode, Codewars, and the competitive coding scene — but with a twist of real-time interaction and gamified fun.
Learning is better when it's a battle 💥

---

✍️ Made with grit, grind, and ❤️ by [Shuva_Kharel](https://github.com/shuva-kharel)
