import webDashboard1 from "@/assets/projects/web-dashboard-1.jpg";
import webDashboard2 from "@/assets/projects/web-dashboard-2.jpg";
import mobileApp1 from "@/assets/projects/mobile-app-1.jpg";
import mobileApp2 from "@/assets/projects/mobile-app-2.jpg";
import desktopSoftware1 from "@/assets/projects/desktop-software-1.jpg";
import cloudInfra1 from "@/assets/projects/cloud-infra-1.jpg";
import customDev1 from "@/assets/projects/custom-dev-1.jpg";
import tourDashboard from "@/assets/projects/tour-dashboard.jpg";
import tourMobile from "@/assets/projects/tour-mobile.jpg";
import tourCloud from "@/assets/projects/tour-cloud.jpg";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tourImage: string;
  link: string;
  tags: string[];
}

export interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  projects: Project[];
}

export const services: ServiceDetail[] = [
  {
    slug: "web-dashboards",
    title: "Web Dashboards",
    description: "Glassmorphism-powered analytics platforms with real-time data visualization.",
    longDescription: "We build stunning, data-driven web dashboards that transform complex datasets into actionable insights. Our dashboards feature real-time updates, interactive charts, customizable widgets, and responsive layouts that work seamlessly across all devices.",
    projects: [
      {
        id: "wd-1",
        title: "Analytics Pro Dashboard",
        description: "Enterprise analytics platform with real-time KPI tracking, custom reports, and AI-powered insights. Built for Fortune 500 companies.",
        image: webDashboard1,
        tourImage: tourDashboard,
        link: "#",
        tags: ["React", "D3.js", "WebSocket"],
      },
      {
        id: "wd-2",
        title: "FinTrack Portfolio Manager",
        description: "Comprehensive financial dashboard with candlestick charts, portfolio tracking, and automated trading signals.",
        image: webDashboard2,
        tourImage: tourDashboard,
        link: "#",
        tags: ["TypeScript", "TradingView", "REST API"],
      },
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    description: "Cross-platform iOS & Android applications with fluid animations and native performance.",
    longDescription: "We create beautiful, performant mobile applications for both iOS and Android platforms. Using cutting-edge frameworks, we deliver native-like experiences with stunning animations, offline support, and seamless integrations.",
    projects: [
      {
        id: "ma-1",
        title: "FitPulse Fitness Tracker",
        description: "AI-powered fitness tracking app with workout plans, progress rings, activity monitoring, and social features.",
        image: mobileApp1,
        tourImage: tourMobile,
        link: "#",
        tags: ["React Native", "HealthKit", "Firebase"],
      },
      {
        id: "ma-2",
        title: "FoodRush Delivery",
        description: "Full-featured food delivery app with real-time order tracking, restaurant discovery, and smart recommendations.",
        image: mobileApp2,
        tourImage: tourMobile,
        link: "#",
        tags: ["Flutter", "Google Maps", "Stripe"],
      },
    ],
  },
  {
    slug: "desktop-software",
    title: "Desktop Software",
    description: "Enterprise-grade desktop applications with complex workflows and seamless integrations.",
    longDescription: "We develop powerful desktop applications that handle complex enterprise workflows. From video editing suites to data processing tools, our software combines performance with intuitive design.",
    projects: [
      {
        id: "ds-1",
        title: "EditPro Video Suite",
        description: "Professional video editing software with timeline editing, effects, color grading, and GPU-accelerated rendering.",
        image: desktopSoftware1,
        tourImage: tourDashboard,
        link: "#",
        tags: ["Electron", "FFmpeg", "WebGL"],
      },
    ],
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description: "Scalable cloud architecture with auto-scaling, load balancing, and 99.99% uptime.",
    longDescription: "We design and implement robust cloud infrastructure that scales automatically with your business. Our solutions include container orchestration, CI/CD pipelines, monitoring, and disaster recovery.",
    projects: [
      {
        id: "ci-1",
        title: "CloudScale Platform",
        description: "Multi-cloud management dashboard with server monitoring, deployment pipelines, and cost optimization tools.",
        image: cloudInfra1,
        tourImage: tourCloud,
        link: "#",
        tags: ["AWS", "Kubernetes", "Terraform"],
      },
    ],
  },
  {
    slug: "custom-development",
    title: "Custom Development",
    description: "Bespoke software solutions engineered to your exact specifications.",
    longDescription: "We build custom software solutions tailored to your unique business needs. From ERP systems to specialized tools, we handle the full development lifecycle with attention to detail.",
    projects: [
      {
        id: "cd-1",
        title: "Enterprise ERP Suite",
        description: "Comprehensive ERP system with inventory management, CRM, accounting, and HR modules for mid-size enterprises.",
        image: customDev1,
        tourImage: tourDashboard,
        link: "#",
        tags: ["Node.js", "PostgreSQL", "Redis"],
      },
    ],
  },
  {
    slug: "competitive-pricing",
    title: "Competitive Pricing",
    description: "Transparent pricing models with no hidden fees. Premium quality at accessible rates.",
    longDescription: "We believe premium quality shouldn't come with a premium price tag. Our transparent pricing models ensure you get the best value for your investment, with flexible payment options and no surprise costs.",
    projects: [
      {
        id: "cp-1",
        title: "PriceOptimizer Dashboard",
        description: "Dynamic pricing analytics tool that helps businesses optimize their pricing strategy with AI-driven insights.",
        image: webDashboard1,
        tourImage: tourDashboard,
        link: "#",
        tags: ["ML", "Python", "React"],
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const getAllProjects = () => services.flatMap((s) => s.projects.map((p) => ({ ...p, service: s.title })));
