
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
} from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#1c1019] text-[#fbf4ee] border-t border-[#5e4650]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#5e4650]/30">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">

            {/* Logo + Brand Name */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <img
                src={logo}
                alt="AEVONA"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Description */}
            <p className="text-sm text-[#ebdacd]/80 leading-relaxed max-w-sm">
              Aevona Solution is an enterprise digital solutions partner
              engineering scalable cloud platforms, web software, data
              pipelines, and custom SaaS platforms.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">

              <a
                href="https://www.linkedin.com/in/aevona-solutions-7a9723439/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-[#3b2a35] hover:bg-[#e08858] hover:text-[#1c1019] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/Dimple-11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-[#3b2a35] hover:bg-[#e08858] hover:text-[#1c1019] flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-serif uppercase tracking-wider text-[#e08858] mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2.5 text-sm text-[#ebdacd]/80">
              <li>
                <Link to="/about" className="hover:text-[#e08858] transition-colors">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-[#e08858] transition-colors">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/solutions" className="hover:text-[#e08858] transition-colors">
                  Solutions
                </Link>
              </li>

              <li>
                <Link to="/portfolio" className="hover:text-[#e08858] transition-colors">
                  Portfolio
                </Link>
              </li>

              <li>
                <Link to="/case-studies" className="hover:text-[#e08858] transition-colors">
                  Case Studies
                </Link>
              </li>

              <li>
                <Link to="/careers" className="hover:text-[#e08858] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold font-serif uppercase tracking-wider text-[#e08858] mb-4">
              Services & SaaS
            </h4>

            <ul className="space-y-2.5 text-sm text-[#ebdacd]/80">
              <li>
                <Link to="/services" className="hover:text-[#e08858] transition-colors">
                  Web Applications
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-[#e08858] transition-colors">
                  Cloud & DevOps
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-[#e08858] transition-colors">
                  Mobile Solutions
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-[#e08858] transition-colors">
                  Data Pipelines
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-[#e08858] transition-colors">
                  Client Portal Login
                </Link>
              </li>

              <li>
                <Link to="/signup" className="hover:text-[#e08858] transition-colors">
                  Request Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold font-serif uppercase tracking-wider text-[#e08858] mb-4">
              Get In Touch
            </h4>

            <ul className="space-y-3 text-sm text-[#ebdacd]/80">

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e08858] shrink-0 mt-0.5" />

                <span>
                  Studio 51, Birmingham B4 7AH
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#e08858] shrink-0 mt-0.5" />

                <a
                  href="mailto:info@aevonasolution.com"
                  className="hover:text-[#e08858] transition-colors"
                >
                  info@aevonasolution.com
                  <br />
                  aevonasolution@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#e08858] shrink-0 mt-0.5" />

                <a
                  href="tel:+447404010483"
                  className="hover:text-[#e08858] transition-colors"
                >
                  +44 7404 010483
                  <br />
                  +91 98756 43914
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#ebdacd]/60 gap-4">

          <p>
            © {new Date().getFullYear()} AEVONA SOLUTION. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <Link
              to="/privacy"
              className="hover:text-[#e08858] transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-[#e08858] transition-colors"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/cookies"
              className="hover:text-[#e08858] transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};
