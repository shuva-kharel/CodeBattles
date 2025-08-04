import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Sun, Moon, Check, X, AlertTriangle, Info } from 'lucide-react';

const ColorShowcase: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const colorSections = [
    {
      title: 'Primary Colors',
      description: 'Main brand colors that adapt to theme',
      colors: [
        { name: 'Primary 500', class: 'bg-primary-500', textClass: 'text-white' },
        { name: 'Primary 600', class: 'bg-primary-600', textClass: 'text-white' },
        { name: 'Primary 700', class: 'bg-primary-700', textClass: 'text-white' },
      ]
    },
    {
      title: 'Secondary Colors',
      description: 'Supporting colors for accents and highlights',
      colors: [
        { name: 'Secondary 500', class: 'bg-secondary-500', textClass: 'text-white' },
        { name: 'Secondary 600', class: 'bg-secondary-600', textClass: 'text-white' },
        { name: 'Secondary 700', class: 'bg-secondary-700', textClass: 'text-white' },
      ]
    },
    {
      title: 'Semantic Colors',
      description: 'Status and feedback colors',
      colors: [
        { name: 'Success', class: 'bg-success-500', textClass: 'text-white', icon: Check },
        { name: 'Warning', class: 'bg-warning-500', textClass: 'text-white', icon: AlertTriangle },
        { name: 'Error', class: 'bg-error-500', textClass: 'text-white', icon: X },
        { name: 'Info', class: 'bg-info-500', textClass: 'text-white', icon: Info },
      ]
    }
  ];

  const interactiveElements = [
    {
      title: 'Primary Button',
      element: (
        <button className="btn-primary px-6 py-3 rounded-lg font-semibold">
          Primary Action
        </button>
      )
    },
    {
      title: 'Secondary Button',
      element: (
        <button className="btn-secondary px-6 py-3 rounded-lg font-semibold">
          Secondary Action
        </button>
      )
    },
    {
      title: 'Input Field',
      element: (
        <input 
          className="input-theme px-4 py-3 rounded-lg w-full"
          placeholder="Enter text here..."
        />
      )
    },
    {
      title: 'Card Component',
      element: (
        <div className="card p-6 rounded-lg">
          <h3 className="text-theme-primary font-semibold mb-2">Card Title</h3>
          <p className="text-theme-secondary">This is a card component with theme-aware styling.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-theme-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-theme-primary mb-4">
            Theme Color System
          </h1>
          <p className="text-xl text-theme-secondary max-w-2xl mx-auto mb-8">
            A comprehensive color system that adapts seamlessly between light and dark modes
            with proper contrast ratios and accessibility standards.
          </p>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center space-x-3 bg-theme-surface border border-theme-primary hover:bg-theme-surface-hover px-6 py-3 rounded-lg transition-all duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-theme-secondary" />
            ) : (
              <Moon className="h-5 w-5 text-theme-secondary" />
            )}
            <span className="text-theme-primary font-medium">
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </span>
          </button>
        </div>

        {/* Color Sections */}
        <div className="space-y-12">
          {colorSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-theme-surface border border-theme-primary rounded-xl p-8">
              <h2 className="text-2xl font-bold text-theme-primary mb-2">{section.title}</h2>
              <p className="text-theme-secondary mb-6">{section.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {section.colors.map((color, colorIndex) => (
                  <div key={colorIndex} className="group">
                    <div className={`${color.class} ${color.textClass} p-6 rounded-lg transition-transform duration-200 group-hover:scale-105`}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{color.name}</span>
                        {color.icon && <color.icon className="h-5 w-5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Elements */}
        <div className="mt-12 bg-theme-surface border border-theme-primary rounded-xl p-8">
          <h2 className="text-2xl font-bold text-theme-primary mb-2">Interactive Elements</h2>
          <p className="text-theme-secondary mb-6">
            Components with hover states, focus states, and proper accessibility
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interactiveElements.map((item, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold text-theme-primary">{item.title}</h3>
                <div className="p-4 bg-theme-bg-secondary rounded-lg border border-theme-border">
                  {item.element}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Hierarchy */}
        <div className="mt-12 bg-theme-surface border border-theme-primary rounded-xl p-8">
          <h2 className="text-2xl font-bold text-theme-primary mb-6">Text Hierarchy</h2>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-theme-primary">Heading 1 - Primary Text</h1>
            <h2 className="text-3xl font-bold text-theme-primary">Heading 2 - Primary Text</h2>
            <h3 className="text-2xl font-semibold text-theme-primary">Heading 3 - Primary Text</h3>
            <p className="text-lg text-theme-primary">Body Large - Primary Text</p>
            <p className="text-base text-theme-secondary">Body Regular - Secondary Text</p>
            <p className="text-sm text-theme-tertiary">Body Small - Tertiary Text</p>
            <p className="text-sm text-theme-disabled">Disabled Text</p>
          </div>
        </div>

        {/* Gradients */}
        <div className="mt-12 bg-theme-surface border border-theme-primary rounded-xl p-8">
          <h2 className="text-2xl font-bold text-theme-primary mb-6">Gradient Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="gradient-primary p-8 rounded-lg text-white text-center">
              <h3 className="text-xl font-bold mb-2">Primary Gradient</h3>
              <p>Primary to Secondary color blend</p>
            </div>
            <div className="gradient-accent p-8 rounded-lg text-white text-center">
              <h3 className="text-xl font-bold mb-2">Accent Gradient</h3>
              <p>Accent to Primary color blend</p>
            </div>
          </div>
        </div>

        {/* Loading States */}
        <div className="mt-12 bg-theme-surface border border-theme-primary rounded-xl p-8">
          <h2 className="text-2xl font-bold text-theme-primary mb-6">Loading States</h2>
          
          <div className="space-y-4">
            <div className="skeleton h-4 rounded w-3/4"></div>
            <div className="skeleton h-4 rounded w-1/2"></div>
            <div className="skeleton h-4 rounded w-2/3"></div>
          </div>
        </div>

        {/* Accessibility Note */}
        <div className="mt-12 bg-info-50 border border-info-500 rounded-xl p-8">
          <div className="flex items-start space-x-3">
            <Info className="h-6 w-6 text-info-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-info-700 mb-2">Accessibility Standards</h3>
              <p className="text-info-700">
                All color combinations in this system meet WCAG 2.1 AA contrast ratio requirements (4.5:1 for normal text, 3:1 for large text).
                Interactive elements include proper focus states and hover feedback for enhanced usability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorShowcase;