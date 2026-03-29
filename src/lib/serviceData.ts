


import axios from 'axios';
import { useEffect, useState } from 'react';

// --- Types ---

export interface Product {
  _id: string;
  title: string;
  desc: string;
  technologies: string[];
  images: string[];      // Array of all 360/gallery images
  primaryimage: string;  // Main thumbnail
  fromprice: string;
  toprice: string;
  category: string;
  weblink: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tourImages: string[]; // UPDATED: Changed from tourImage (string) to tourImages (string[])
  link: string;
  tags: string[];
  fromprice: string;
  toprice: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  projects: Project[];
}

const BASE_URL = 'https://pricebackend-n0qq.onrender.com/api/products';

// --- Configuration ---

const categoryConfig: Record<string, Omit<ServiceDetail, 'projects'>> = {
  "web-dashboards": {
    slug: "web-dashboards",
    title: "Web Dashboards",
    description: "Glassmorphism-powered analytics platforms with real-time data visualization.",
    longDescription: "We build stunning, data-driven web dashboards that transform complex datasets into actionable insights."
  },
  "mobile-apps": {
    slug: "mobile-apps",
    title: "Mobile Apps",
    description: "Cross-platform iOS & Android applications with fluid animations and native performance.",
    longDescription: "We create beautiful, performant mobile applications for both iOS and Android platforms."
  },
  "desktop-software": {
    slug: "desktop-software",
    title: "Desktop Software",
    description: "Enterprise-grade desktop applications with complex workflows and seamless integrations.",
    longDescription: "We develop powerful desktop applications that handle complex enterprise workflows."
  },
  "cloud-infrastructure": {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description: "Scalable cloud architecture with auto-scaling, load balancing, and 99.99% uptime.",
    longDescription: "We design and implement robust cloud infrastructure that scales automatically."
  },
  "custom-development": {
    slug: "custom-development",
    title: "Custom Development",
    description: "Bespoke software solutions engineered to your exact specifications.",
    longDescription: "We build custom software solutions tailored to your unique business needs."
  },
  "competitive-pricing": {
    slug: "competitive-pricing",
    title: "Competitive Pricing",
    description: "Transparent pricing models with no hidden fees.",
    longDescription: "We believe premium quality shouldn't come with a premium price tag."
  }
};

// --- Helper Functions ---

/**
 * Maps the Backend Product to the Frontend Project format
 * Crucial: Passes the entire images array for the 360 viewer
 */
const convertToProject = (product: Product): Project => {
  return {
    id: product._id,
    title: product.title,
    description: product.desc,
    image: product.primaryimage,
    // Fix: We now pass the WHOLE array of images from MongoDB
    tourImages: product.images && product.images.length > 0
      ? product.images
      : [product.primaryimage],
    link: product.weblink || "#",
    tags: product.technologies,
    fromprice: product.fromprice,
    toprice: product.toprice
  };
};

// --- API Functions ---

export const fetchServices = async (): Promise<ServiceDetail[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    if (response.data.success) {
      const products: Product[] = response.data.data;

      return Object.entries(categoryConfig).map(([slug, config]) => {
        const categoryProducts = products.filter(p => p.category === slug);
        const projects = categoryProducts.map(product => convertToProject(product));

        return { ...config, projects };
      }).filter(service => service.projects.length > 0);
    }
    return [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const getServiceBySlug = async (slug: string): Promise<ServiceDetail | undefined> => {
  const services = await fetchServices();
  return services.find(s => s.slug === slug);
};

// --- Custom Hooks ---

export const useServices = () => {
  const [services, setServices] = useState<ServiceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug);

  return { services, loading, error, getServiceBySlug };
};

export const useAllProducts = (minPrice?: number, maxPrice?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/all`);
        if (response.data.success) {
          let filtered = response.data.data;
          if (minPrice !== undefined) filtered = filtered.filter((p: Product) => parseInt(p.fromprice) >= minPrice);
          if (maxPrice !== undefined) filtered = filtered.filter((p: Product) => parseInt(p.toprice) <= maxPrice);
          setProducts(filtered);
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [minPrice, maxPrice]);

  return { products, loading, error };
};
// Add this to the bottom of your serviceData.ts

/**
 * Fetches every product from the database and returns them 
 * as a flat array of Projects.
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    if (response.data.success) {
      const products: Product[] = response.data.data;
      // Convert every raw Product into a Project
      return products.map(product => convertToProject(product));
    }
    return [];
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
};