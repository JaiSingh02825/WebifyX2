'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  Globe,
  Code,
  Users,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  BarChart3,
  BookOpen,
  Palette,
  Smartphone,
  Shield,
  Rocket,
  Target,
  TrendingUp,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Globe,
      title: 'Drag & Drop Builder',
      description: 'Create stunning websites with our intuitive drag-and-drop interface. No coding required.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Code,
      title: 'Learn Real Coding',
      description: 'Master HTML, CSS, JavaScript, and more with interactive courses and live coding exercises.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Hands-on learning with live code editor, quizzes, and real-world projects.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Rocket,
      title: 'Instant Publishing',
      description: 'Publish your sites with custom subdomains and share them with the world instantly.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your site performance, visitor insights, and learning progress all in one place.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with SSL certificates and 99.9% uptime guarantee.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ]

  const courses = [
    {
      title: 'HTML Fundamentals',
      description: 'Learn the building blocks of web development',
      duration: '3 hours',
      level: 'Beginner',
      students: '1,250',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=300&h=200&fit=crop'
    },
    {
      title: 'CSS Mastery',
      description: 'Master modern CSS with Flexbox, Grid, and animations',
      duration: '4 hours',
      level: 'Intermediate',
      students: '980',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    },
    {
      title: 'JavaScript Essentials',
      description: 'Become proficient in JavaScript and modern ES6+ features',
      duration: '5 hours',
      level: 'Intermediate',
      students: '1,450',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Web Developer',
      content: 'WebifyX transformed my career. The combination of visual builder and coding courses helped me land my dream job.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Entrepreneur',
      content: 'Built my business website in hours without any coding knowledge. The drag-and-drop builder is incredible!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Student',
      content: 'The interactive courses made learning to code so much fun. I can now build my own projects!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5
    }
  ]

  const stats = [
    { label: 'Websites Built', value: '10,000+', icon: Globe },
    { label: 'Students Enrolled', value: '5,000+', icon: Users },
    { label: 'Courses Completed', value: '2,500+', icon: BookOpen },
    { label: 'Satisfaction Rate', value: '98%', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">WebifyX</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Features
                </a>
                <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Courses
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Testimonials
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden md:block">
                Sign In
              </Button>
              <Button className="hidden md:block">
                Get Started Free
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Features
              </a>
              <a href="#courses" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Courses
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Pricing
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Testimonials
              </a>
              <div className="pt-2 border-t border-gray-200">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full mt-2">
                  Get Started Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                🚀 New: Interactive Code Editor & Quiz System
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Build Websites &
                <span className="text-blue-600"> Learn to Code</span>
                <br />
                All in One Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Create stunning websites with our drag-and-drop builder, then master the skills
                behind them with interactive courses. Perfect for beginners and pros alike.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
                    <stat.icon className="w-5 h-5" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From visual website building to comprehensive coding education, we've got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn Web Development the Right Way
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive courses with live coding, quizzes, and real-world projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{course.level}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{course.duration}</span>
                      <span>{course.students} students</span>
                    </div>
                    <Button className="w-full">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">
                View All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands of Users
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our students and builders have to say about their experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users building websites and learning to code with WebifyX.
              Start free today and upgrade as you grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">WebifyX</span>
              </div>
              <p className="text-sm">
                Build websites and learn to code all in one powerful platform.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Website Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2024 WebifyX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}