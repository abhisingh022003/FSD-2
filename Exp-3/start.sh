#!/bin/bash

# Experiment 3: SPA Routing - Quick Start Script
# Usage: ./start.sh or bash start.sh

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   EXPERIMENT 3: Implement Routing in SPA                 ║"
echo "║   Full Stack Development - II (23CSH-382)                ║"
echo "║   React Router DOM v6                                     ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Show project info
echo "📂 Project Structure:"
echo "   src/"
echo "   ├── pages/       (Home, About, Products, Contact, Login, Dashboard, NotFound)"
echo "   ├── components/  (Layout, Navigation, Breadcrumbs, ProtectedRoute)"
echo "   └── App.jsx      (Main routing configuration)"
echo ""

echo "📚 Documentation:"
echo "   • EXPERIMENT_GUIDE.md     - Complete experiment overview"
echo "   • CODE_EXAMPLES.md        - 18 code patterns and examples"
echo "   • TESTING_GUIDE.md        - Comprehensive testing checklist"
echo "   • TROUBLESHOOTING.md      - Common issues and solutions"
echo "   • QUICK_REFERENCE.md      - Quick reference card"
echo "   • IMPLEMENTATION_SUMMARY  - Project details and checklist"
echo ""

echo "✨ Features Implemented:"
echo "   ✅ Basic routing with multiple pages"
echo "   ✅ Navigation with active highlighting"
echo "   ✅ Dynamic routes with URL parameters (/products/:id)"
echo "   ✅ Nested routes with Layout component"
echo "   ✅ Protected routes with authentication"
echo "   ✅ 404 Not Found page handling"
echo "   ✅ Programmatic navigation"
echo "   ✅ Breadcrumb navigation"
echo "   ✅ Responsive design"
echo ""

echo "🚀 Starting development server..."
echo ""

npm run dev

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║             Thank you for using this project!             ║"
echo "║                  Happy Routing!  🎉                        ║"
echo "╚═══════════════════════════════════════════════════════════╝"
