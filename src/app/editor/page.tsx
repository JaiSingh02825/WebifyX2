'use client'

import React, { useState } from 'react'
import { CodeEditor } from '@/components/editor/CodeEditor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  Play,
  RotateCcw,
  Download,
  Upload,
  Sun,
  Moon,
  Monitor,
  Code2,
  FileText,
  Zap,
  Github,
  ExternalLink,
  Copy,
  Share2,
  Save,
  FolderOpen
} from 'lucide-react'

// Example templates for different languages
const templates = {
  html: {
    name: 'HTML Template',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .feature {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            border-left: 4px solid #ffd700;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(45deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to My Awesome Website</h1>

        <div class="feature">
            <h2>✨ Amazing Features</h2>
            <p>This website is built with pure HTML, CSS, and JavaScript. It features:</p>
            <ul>
                <li>Beautiful gradient backgrounds</li>
                <li>Responsive design</li>
                <li>Smooth animations</li>
                <li>Modern glassmorphism effects</li>
            </ul>
        </div>

        <div class="feature">
            <h2>🎨 Interactive Elements</h2>
            <p>Click the button below to see some magic!</p>
            <button class="btn" onclick="showMessage()">
                Click Me! 🎉
            </button>
            <div id="message" style="margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.3); border-radius: 10px; display: none;">
                <h3>🎊 Surprise! You found the hidden message!</h3>
                <p>Keep exploring to discover more amazing features.</p>
            </div>
        </div>

        <div class="feature">
            <h2>📱 Responsive Design</h2>
            <p>Try resizing your browser window to see how this website adapts to different screen sizes!</p>
        </div>
    </div>

    <script>
        function showMessage() {
            const message = document.getElementById('message');
            message.style.display = message.style.display === 'none' ? 'block' : 'none';

            if (message.style.display === 'block') {
                message.style.animation = 'slideIn 0.5s ease-out';
            }
        }

        // Add some interactive animations
        document.addEventListener('DOMContentLoaded', function() {
            const features = document.querySelectorAll('.feature');
            features.forEach((feature, index) => {
                feature.style.animation = \`fadeInUp 0.6s ease-out \${index * 0.1}s both\`;
            });
        });

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`,
    language: 'html'
  },
  css: {
    name: 'CSS Animations',
    code: `/* Amazing CSS Animations Gallery */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    color: white;
}

.header {
    text-align: center;
    margin-bottom: 50px;
}

.header h1 {
    font-size: 3em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    background: linear-gradient(45deg, #ff6b6b, #ffd93d);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.header p {
    font-size: 1.2em;
    opacity: 0.9;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    width: 100%;
}

.animation-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.animation-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.animation-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.animation-card:hover::before {
    left: 100%;
}

.animation-card h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
    color: #ffd700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.demo-box {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

/* Fade In Animation */
.fade-in {
    animation: fadeIn 2s ease-in-out infinite;
}

@keyframes fadeIn {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
}

/* Bounce Animation */
.bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-30px); }
    60% { transform: translateY(-15px); }
}

/* Spin Animation */
.spin {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Pulse Animation */
.pulse {
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* Slide Animation */
.slide {
    animation: slide 3s ease-in-out infinite;
}

@keyframes slide {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}

/* Rainbow Border Animation */
.rainbow-border {
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4ecdc4, #667eea, #764ba2);
    background-size: 400% 400%;
    animation: rainbow 3s ease-in-out infinite;
}

@keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Glitch Effect */
.glitch {
    animation: glitch 1s infinite;
    text-shadow: 2px 2px 0px #ff00, -2px -2px 0px #00ff;
}

@keyframes glitch {
    0%, 100% { text-shadow: 2px 2px 0px #ff00, -2px -2px 0px #00ff; }
    25% { text-shadow: -2px 2px 0px #ff00, 2px -2px 0px #00ff; }
    50% { text-shadow: 2px -2px 0px #ff00, -2px 2px 0px #00ff; }
    75% { text-shadow: -2px -2px 0px #ff00, 2px 2px 0px #00ff; }
}

.code-snippet {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    border-left: 3px solid #ffd700;
}

.controls {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.btn:active {
    transform: translateY(0);
}

@media (max-width: 768px) {
    .header h1 {
        font-size: 2em;
    }

    .gallery {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}`,
    language: 'css'
  },
  javascript: {
    name: 'Interactive JavaScript',
    code: `// Interactive JavaScript Application
class WebApp {
    constructor() {
        this.users = [];
        this.todos = [];
        this.notifications = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.render();
    }

    setupEventListeners() {
        // Todo management
        document.getElementById('add-todo').addEventListener('click', () => this.addTodo());
        document.getElementById('todo-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // User management
        document.getElementById('add-user').addEventListener('click', () => this.addUser());
        document.getElementById('user-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addUser();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
    }

    loadSampleData() {
        // Sample todos
        this.todos = [
            { id: 1, text: 'Learn HTML', completed: true, priority: 'high' },
            { id: 2, text: 'Master CSS', completed: true, priority: 'high' },
            { id: 3, text: 'Practice JavaScript', completed: false, priority: 'medium' },
            { id: 4, text: 'Build a project', completed: false, priority: 'low' }
        ];

        // Sample users
        this.users = [
            { id: 1, name: 'John Doe', role: 'Developer', avatar: '👨‍💻', status: 'online' },
            { id: 2, name: 'Jane Smith', role: 'Designer', avatar: '👩‍🎨', status: 'online' },
            { id: 3, name: 'Mike Johnson', role: 'Manager', avatar: '👨‍💼', status: 'offline' }
        ];
    }

    addTodo() {
        const input = document.getElementById('todo-input');
        const text = input.value.trim();

        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                priority: this.detectPriority(text),
                createdAt: new Date().toLocaleString()
            };

            this.todos.unshift(todo);
            input.value = '';
            this.render();
            this.showNotification('✅ Todo added successfully!', 'success');
        }
    }

    addUser() {
        const input = document.getElementById('user-name');
        const name = input.value.trim();

        if (name) {
            const user = {
                id: Date.now(),
                name: name,
                role: this.generateRole(),
                avatar: this.generateAvatar(),
                status: 'online',
                joinedAt: new Date().toLocaleString()
            };

            this.users.unshift(user);
            input.value = '';
            this.render();
            this.showNotification(`👋 Welcome ${name}!`, 'info');
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();

            if (todo.completed) {
                this.showNotification('🎉 Todo completed! Great job!', 'success');
            }
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.render();
        this.showNotification('🗑️ Todo deleted', 'warning');
    }

    detectPriority(text) {
        const highPriorityWords = ['urgent', 'important', 'critical', 'asap'];
        const lowPriorityWords = ['later', 'someday', 'maybe'];

        const lowerText = text.toLowerCase();

        if (highPriorityWords.some(word => lowerText.includes(word))) {
            return 'high';
        } else if (lowPriorityWords.some(word => lowerText.includes(word))) {
            return 'low';
        }
        return 'medium';
    }

    generateRole() {
        const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Engineer', 'Consultant'];
        return roles[Math.floor(Math.random() * roles.length)];
    }

    generateAvatar() {
        const avatars = ['👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬'];
        return avatars[Math.floor(Math.random() * avatars.length)];
    }

    showNotification(message, type = 'info') {
        const notification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date().toLocaleTimeString()
        };

        this.notifications.unshift(notification);
        if (this.notifications.length > 5) {
            this.notifications = this.notifications.slice(0, 5);
        }

        this.renderNotifications();

        // Auto-hide notification after 5 seconds
        setTimeout(() => {
            this.notifications = this.notifications.filter(n => n.id !== notification.id);
            this.renderNotifications();
        }, 5000);
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        this.showNotification(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }

    render() {
        this.renderTodos();
        this.renderUsers();
        this.renderStats();
    }

    renderTodos() {
        const container = document.getElementById('todos-container');
        container.innerHTML = this.todos.map(todo => \`
            <div class="todo-item \${todo.completed ? 'completed' : ''}" data-id="\${todo.id}">
                <div class="todo-checkbox" onclick="app.toggleTodo(\${todo.id})">
                    \${todo.completed ? '✅' : '⭕'}
                </div>
                <div class="todo-content">
                    <div class="todo-text">\${todo.text}</div>
                    <div class="todo-meta">
                        <span class="priority \${todo.priority}">\${todo.priority.toUpperCase()}</span>
                        <span class="date">\${todo.createdAt}</span>
                    </div>
                </div>
                <button class="delete-btn" onclick="app.deleteTodo(\${todo.id})">🗑️</button>
            </div>
        \`).join('');
    }

    renderUsers() {
        const container = document.getElementById('users-container');
        container.innerHTML = this.users.map(user => \`
            <div class="user-card">
                <div class="user-avatar">\${user.avatar}</div>
                <div class="user-info">
                    <div class="user-name">\${user.name}</div>
                    <div class="user-role">\${user.role}</div>
                    <div class="user-status">
                        <span class="status-dot \${user.status}"></span>
                        \${user.status === 'online' ? 'Online' : 'Offline'}
                    </div>
                </div>
                <div class="user-meta">
                    <small>Joined: \${user.joinedAt}</small>
                </div>
            </div>
        \`).join('');
    }

    renderStats() {
        const completedTodos = this.todos.filter(t => t.completed).length;
        const totalTodos = this.todos.length;
        const onlineUsers = this.users.filter(u => u.status === 'online').length;

        document.getElementById('stats').innerHTML = \`
            <div class="stat-card">
                <div class="stat-number">\${totalTodos}</div>
                <div class="stat-label">Total Todos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">\${completedTodos}</div>
                <div class="stat-label">Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">\${this.users.length}</div>
                <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">\${onlineUsers}</div>
                <div class="stat-label">Online Now</div>
            </div>
        \`;
    }

    renderNotifications() {
        const container = document.getElementById('notifications');
        container.innerHTML = this.notifications.map(notification => \`
            <div class="notification \${notification.type}">
                <span class="notification-message">\${notification.message}</span>
                <span class="notification-time">\${notification.timestamp}</span>
            </div>
        \`).join('');
    }
}

// Initialize the application
const app = new WebApp();

// Add some CSS styles
const styles = \`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.header p {
    font-size: 1.2em;
    opacity: 0.9;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.stat-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
    font-size: 2em;
    font-weight: bold;
    color: #ffd700;
}

.stat-label {
    font-size: 0.9em;
    opacity: 0.8;
}

.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

@media (max-width: 768px) {
    .content {
        grid-template-columns: 1fr;
    }
}

.section-title {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #ffd700;
}

.todo-item, .user-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
}

.todo-item:hover, .user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.todo-item.completed {
    opacity: 0.7;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
}

.todo-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    margin-right: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.todo-checkbox:hover {
    background: rgba(255, 255, 255, 0.3);
}

.todo-content {
    flex: 1;
}

.todo-text {
    font-weight: 500;
    margin-bottom: 5px;
}

.todo-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.priority {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8em;
    font-weight: bold;
}

.priority.high {
    background: #ff4444;
}

.priority.medium {
    background: #ff9800;
}

.priority.low {
    background: #4caf50;
}

.date {
    font-size: 0.8em;
    opacity: 0.7;
}

.delete-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.delete-btn:hover {
    background: rgba(255, 67, 67, 0.3);
}

.user-card {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
}

.user-info {
    flex: 1;
}

.user-name {
    font-weight: bold;
    margin-bottom: 3px;
}

.user-role {
    font-size: 0.9em;
    opacity: 0.8;
    margin-bottom: 5px;
}

.user-status {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8em;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.status-dot.online {
    background: #4caf50;
}

.status-dot.offline {
    background: #9e9e9e;
}

.user-meta {
    font-size: 0.7em;
    opacity: 0.6;
}

.controls {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
}

.input-group {
    display: flex;
    gap: 10px;
    flex: 1;
    min-width: 200px;
}

input {
    flex: 1;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(10px);
}

input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

#theme-toggle {
    background: linear-gradient(45deg, #ffd700, #ff8c00);
}

.notifications {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 300px;
}

.notification {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: slideIn 0.3s ease-out;
}

.notification.success {
    border-left: 4px solid #4caf50;
}

.notification.warning {
    border-left: 4px solid #ff9800;
}

.notification.info {
    border-left: 4px solid #2196f3;
}

.notification-message {
    display: block;
    margin-bottom: 5px;
}

.notification-time {
    font-size: 0.8em;
    opacity: 0.7;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.dark-theme {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.dark-theme .notification {
    background: rgba(255, 255, 255, 0.1);
    color: #333;
}
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);`,
    language: 'javascript'
  },
  react: {
    name: 'React Component',
    code: `// React Component Example
import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const inputRef = useRef(null);

    // Auto-focus input when component mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Calculate statistics
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false,
                createdAt: new Date(),
                priority: 'medium'
            };

            setTodos([newTodo, ...todos]);
            setInputValue('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [editText, setEditText] = useState(todo.text);

        const handleSave = () => {
            onEdit(todo.id, editText);
            setIsEditing(false);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleSave();
            } else if (e.key === 'Escape') {
                setEditText(todo.text);
                setIsEditing(false);
            }
        };

        return (
            <div className="todo-item">
                <div className="todo-checkbox">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                    />
                </div>
                <div className="todo-content">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={handleKeyDown}
                            className="todo-edit-input"
                            autoFocus
                        />
                    ) : (
                        <span
                            className={todo.completed ? 'completed' : ''}
                            onDoubleClick={() => setIsEditing(true)}
                        >
                            {todo.text}
                        </span>
                    )}
                    <div className="todo-meta">
                        <span className="todo-date">
                            {new Date(todo.createdAt).toLocaleDateString()}
                        </span>
                        <button
                            onClick={() => onDelete(todo.id)}
                            className="delete-btn"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const Stats = () => (
        <div className="stats">
            <div className="stat-card">
                <div className="stat-number">{totalTodos}</div>
                <div className="stat-label">Total</div>
            </div>
            <div className="stat-card">
                <div className="stat-number">{completedTodos}</div>
                <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
                <div className="stat-number">{totalTodos - completedTodos}</div>
                <div className="stat-label">Remaining</div>
            </div>
            <div className="stat-card">
                <div className="stat-number">{completionPercentage}%</div>
                <div className="stat-label">Progress</div>
            </div>
        </div>
    );

    return (
        <div className="app">
            <header className="header">
                <h1>📝 React Todo App</h1>
                <p>A modern todo application built with React hooks</p>
            </header>

            <Stats />

            <main className="main-content">
                <div className="todo-input-section">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        placeholder="What needs to be done?"
                        className="todo-input"
                    />
                    <button onClick={addTodo} className="add-btn">
                        Add Todo
                    </button>
                </div>

                <div className="filter-buttons">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All ({totalTodos})
                    </button>
                    <button
                        className={filter === 'active' ? 'active' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Active ({totalTodos - completedTodos})
                    </button>
                    <button
                        className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completed ({completedTodos})
                    </button>
                    {completedTodos > 0 && (
                        <button
                            onClick={clearCompleted}
                            className="clear-btn"
                        >
                            Clear Completed
                        </button>
                    )}
                </div>

                <div className="todo-list">
                    {filteredTodos.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h3>No todos yet</h3>
                            <p>Start adding tasks to get organized!</p>
                        </div>
                    ) : (
                        filteredTodos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                                onEdit={editTodo}
                            />
                        ))
                    )}
                </div>
            </main>

            <footer className="footer">
                <p>Built with ❤️ using React</p>
                <div className="footer-links">
                    <a href="#">GitHub</a>
                    <a href="#">Documentation</a>
                    <a href="#">Support</a>
                </div>
            </footer>
        </div>
    );
}

export default App;

// Add CSS styles
const styles = \`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #fff;
}

.app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 0;
}

.header h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.header p {
    font-size: 1.2rem;
    opacity: 0.8;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.stat-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.stat-number {
    font-size: 3rem;
    font-weight: bold;
    color: #ffd700;
    display: block;
    margin-bottom: 10px;
}

.stat-label {
    font-size: 1rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.main-content {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.todo-input-section {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
    align-items: center;
}

.todo-input {
    flex: 1;
    padding: 15px 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;
    backdrop-filter: blur(10px);
}

.todo-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.todo-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.add-btn {
    padding: 15px 30px;
    background: linear-gradient(45deg, #4caf50, #45a049);
    border: none;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.filter-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    justify-content: center;
}

.filter-buttons button {
    padding: 10px 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.filter-buttons button.active {
    background: linear-gradient(45deg, #2196f3, #1976d2);
    border-color: rgba(255, 255, 255, 0.5);
}

.filter-buttons button:hover:not(.active) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
}

.clear-btn {
    padding: 10px 20px;
    border: 1px solid rgba(255, 67, 54, 0.5);
    border-radius: 25px;
    background: rgba(255, 67, 54, 0.2);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
}

.clear-btn:hover {
    background: rgba(255, 67, 54, 0.3);
}

.todo-list {
    space-y: 15px;
}

.todo-item {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 20px;
    transition: all 0.3s ease;
}

.todo-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.todo-checkbox {
    margin-right: 15px;
}

.todo-checkbox input {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.todo-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.todo-content span {
    font-size: 1.1rem;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.todo-content span:hover {
    color: #ffd700;
}

.todo-content span.completed {
    text-decoration: line-through;
    opacity: 0.7;
}

.todo-edit-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 8px;
}

.todo-edit-input:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.5);
}

.todo-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    opacity: 0.8;
}

.todo-date {
    font-size: 0.9rem;
}

.delete-btn {
    background: none;
    border: none;
    color: rgba(255, 67, 54, 0.8);
    cursor: pointer;
    font-size: 0.9rem;
    transition: color 0.2s ease;
}

.delete-btn:hover {
    color: #ff4444;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    opacity: 0.8;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}

.empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.empty-state p {
    font-size: 1.1rem;
}

.footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
}

.footer-links a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-links a:hover {
    color: #ffd700;
}

@media (max-width: 768px) {
    .app {
        padding: 15px;
    }

    .header h1 {
        font-size: 2rem;
    }

    .stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .stat-number {
        font-size: 2rem;
    }

    .todo-input-section {
        flex-direction: column;
        gap: 15px;
    }

    .filter-buttons {
        justify-content: center;
    }

    .todo-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .todo-meta {
        width: 100%;
        justify-content: space-between;
    }
}
\`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Initialize and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    language: 'javascript'
  }
};

export default function EditorPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('html');
  const [code, setCode] = useState(templates.html.code);
  const [showPreview, setShowPreview] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const languages = [
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'css', label: 'CSS', icon: '🎨' },
    { value: 'javascript', label: 'JavaScript', icon: '⚡' },
    { value: 'typescript', label: 'TypeScript', icon: '📘' },
    { value: 'react', label: 'React', icon: '⚛️' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'c', label: 'C', icon: '⚙️' },
    { value: 'cpp', label: 'C++', icon: '⚙️' },
    { value: 'php', label: 'PHP', icon: '🐘' },
    { value: 'ruby', label: 'Ruby', icon: '💎' },
    { value: 'go', label: 'Go', icon: '🐹' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
    { value: 'sql', label: 'SQL', icon: '🗄️' },
    { value: 'json', label: 'JSON', icon: '📋' },
    { value: 'xml', label: 'XML', icon: '📄' }
  ];

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setCode(templates[lang as keyof typeof templates].code);
  };

  const handleTemplateChange = (template: typeof templates.html) => {
    setCode(template.code);
  };

  const handleSave = () => {
    // In a real app, this would save to localStorage or backend
    const savedCode = localStorage.getItem('editor-code') || '{}';
    const saved = JSON.parse(savedCode);
    saved[selectedLanguage] = code;
    localStorage.setItem('editor-code', JSON.stringify(saved));
  };

  const handleLoad = () => {
    const savedCode = localStorage.getItem('editor-code') || '{}';
    const saved = JSON.parse(savedCode);
    if (saved[selectedLanguage]) {
      setCode(saved[selectedLanguage]);
    }
  };

  const handleShare = () => {
    // Create shareable URL
    const encodedCode = btoa(code);
    const shareUrl = \`\${window.location.origin}/editor?lang=\${selectedLanguage}&code=\${encodedCode}\`;

    if (navigator.share) {
      navigator.share({
        title: 'WebifyX Code Editor',
        text: 'Check out this code I created!',
        url: shareUrl
      });
    } else {
        navigator.clipboard.writeText(shareUrl);
        alert('Share URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Code2 className="w-5 h-5 mr-2" />
                  WebifyX
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => handleLanguageChange(lang.value)}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        selectedLanguage === lang.value
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      <span className="mr-2">{lang.icon}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className={cn(showPreview && 'bg-blue-100 text-blue-700 border-blue-200')}
                  >
                    {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    Preview
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
                  >
                    {theme === 'light' ? <Moon className="w-4 h-4" /> :
                     theme === 'dark' ? <Sun className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLoad}
                  >
                    <FolderOpen className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Full-Featured Code Editor
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Write, compile and preview code in multiple web development languages
            </p>
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              🆓 Completely Free - No Sign Up Required
            </Badge>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {Object.entries(templates).map(([key, template]) => (
                <Button
                  key={key}
                  variant={selectedLanguage === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTemplateChange(template)}
                  className="h-10"
                >
                  {template.name}
                </Button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              Or start with a blank template
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5" />
                    Code Editor
                  </CardTitle>
                  <CardDescription>
                    Write and edit your code with syntax highlighting
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language={selectedLanguage}
                    height="500px"
                    theme={theme}
                    showPreview={false}
                    title={`${selectedLanguage.toUpperCase()} Code Editor`}
                    description={`Editing in ${selectedLanguage} language`}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>
                    See your code rendered in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {selectedLanguage === 'html' ? (
                    <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <iframe
                        srcDoc={code}
                        className="w-full h-[500px] border-0"
                        sandbox="allow-scripts"
                        title="Live Preview"
                      />
                    </div>
                  ) : (
                    <div className="h-full bg-gray-900 text-gray-300 rounded-lg p-6 overflow-auto">
                      <div className="text-center">
                        <Code2 className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                        <h3 className="text-lg font-medium mb-2">Preview Available</h3>
                        <p className="text-sm mb-4">
                          Live preview is currently available for HTML only.
                          Other languages will show execution output.
                        </p>
                        <div className="bg-gray-800 rounded-lg p-4 text-left">
                          <code className="text-green-400">
                            <pre>
                              {selectedLanguage.toUpperCase()} preview coming soon...
                            </pre>
                          </code>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-save</h4>
                      <p className="text-sm text-gray-600">Your code is automatically saved locally</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Shortcuts</h4>
                      <p className="text-sm text-gray-600">Ctrl+S to save, Ctrl+Z for undo</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Multiple Languages</h4>
                      <p className="text-sm text-gray-600">Support for 15+ web languages</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔗</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Share Your Code</h4>
                      <p className="text-sm text-gray-600">Generate shareable links</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}`,
    language: 'typescript'
  }
}