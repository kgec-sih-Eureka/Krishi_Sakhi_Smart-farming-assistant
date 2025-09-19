import React from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./index";

export function Footer() {
  return (
<footer className="bg-gradient-to-r from-green-900 to-emerald-900 border-t border-green-800">      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand + logo */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <Logo />
              <div>
                <p className="text-lg font-semibold text-green-900 dark:text-green-100">Krishi Sakhi</p>
                <p className="text-sm text-green-700 dark:text-green-300">Helping users since 2025</p>
              </div>
            </div>

            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Footer navigation">
              <Link to="/about" className="text-sm text-green-700 dark:text-green-300 hover:underline">About</Link>
              <Link to="/docs" className="text-sm text-green-700 dark:text-green-300 hover:underline">Docs</Link>
              <Link to="/careers" className="text-sm text-green-700 dark:text-green-300 hover:underline">Careers</Link>
              <Link to="/contact" className="text-sm text-green-700 dark:text-green-300 hover:underline">Contact</Link>
            </nav>
          </div>

          {/* Social icons */}
          <div className="flex-1 md:flex-none">
            <p className="text-sm font-medium text-green-900 dark:text-green-100">Follow us</p>
            <div className="mt-3 flex items-center gap-3">
              <a href="https://github.com" aria-label="GitHub" className="inline-flex items-center justify-center rounded-md p-2 hover:bg-green-100 dark:hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="inline-flex items-center justify-center rounded-md p-2 hover:bg-green-100 dark:hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="inline-flex items-center justify-center rounded-md p-2 hover:bg-green-100 dark:hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                <Twitter size={18} />
              </a>
              <a href="mailto:info@yourcompany.com" aria-label="Email" className="inline-flex items-center justify-center rounded-md p-2 hover:bg-green-100 dark:hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                <Mail size={18} />
              </a>
            </div>

            <div className="mt-6 text-sm text-green-700 dark:text-green-300">
              <p>
                <span className="mr-1">© 2025 Your Company.</span>
                <Link to="/terms" className="underline">Terms</Link>
                <span className="mx-1">•</span>
                <Link to="/privacy" className="underline">Privacy</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom small print */}
        <div className="mt-8 border-t border-green-200 dark:border-green-800 pt-6 text-sm text-green-600 dark:text-green-400">
          <p>Built with 🌱 — accessible, responsive, and eco-friendly.</p>
        </div>
      </div>
    </footer>
  );
}