"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <p className="text-white/80 text-lg mb-2 font-medium">
                {subtitle}
              </p>
            )}
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-gray-200 text-lg leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
