"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";


const services = [
  {
    title: "No-Code Page Builder",
    description:
      "Create your link-in-bio page instantly without writing a single line of code.",
    features: ["Drag & Drop Editor", "Pre-built Blocks", "Live Preview"],

  },
  {
    title: "Customizable Design",
    description:
      "Design your page your way with flexible layouts, colors, and fonts.",
    features: ["Themes & Templates", "Custom Styling", "Mobile Responsive"],
   
  },
  {
    title: "Link Management",
    description:
      "Add, organize, and update all your links in one place effortlessly.",
    features: ["Unlimited Links", "Reorder بسهولة", "Smart Link Types"],
  
  },
  {
    title: "Drag & Drop Experience",
    description:
      "Easily rearrange elements with an intuitive drag-and-drop interface.",
    features: ["Section Reordering", "Visual Editing", "Instant Updates"],

  },
  {
    title: "Performance Optimized",
    description:
      "Fast-loading pages that ensure your audience never waits.",
    features: ["CDN Powered", "Optimized Assets", "Fast Load Speed"],
 
  },
  {
    title: "Creator Tools",
    description:
      "Built for creators to showcase content and grow their audience.",
    features: ["Social Links", "Embedded Media", "Call-to-Action Buttons"],

  },
  {
    title: "Analytics & Insights",
    description:
      "Track clicks and understand how your audience interacts with your page.",
    features: ["Click Tracking", "Visitor Insights", "Performance Metrics"],
 
  },
  {
    title: "Integrations",
    description:
      "Connect with your favorite tools and platforms seamlessly.",
    features: ["Social Platforms", "Third-party Apps", "API Access"],
   
  },
];
export function Features() {
  return (
    <section className="w-full bg-background px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
     <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mb-12 text-center md:mb-16"
>
  <Badge className="mb-4" variant="secondary">
    Linsky Builder
  </Badge>
  <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
    Build Your Link-in-Bio Page in Minutes
  </h2>
  <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
    No coding required. Just drag, drop, customize, and publish your page instantly.
  </p>
</motion.div>

        {/* Services Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-6">
          {services.map((service, index) => {
           

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-xl md:p-6">
                  {/* Gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative z-10">
                   

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mb-4 space-y-1.5">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className={`h-1 w-1 rounded-full bg-primary`} />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a href="/admin/dashboard">
                    
                    
                    <Button
                      variant="ghost"
                      size="default"
                      className="group/btn w-full text-xs md:text-sm"
                    >
                      Learn More
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
