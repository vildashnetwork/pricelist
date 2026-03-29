import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="font-display font-bold text-sm tracking-widest text-gradient">
              VILDASH NETWORK
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Crafting the future, one pixel at a time.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Services</h4>
            <div className="space-y-2">
              {["web-dashboards", "mobile-apps", "desktop-software", "cloud-infrastructure"].map((slug) => (
                <Link key={slug} to={`/services/${slug}`} className="block text-xs text-muted-foreground hover:text-foreground transition-colors capitalize">
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Company</h4>
            <div className="space-y-2">
              {[
                { label: "Portfolio", to: "/portfolio" },
                { label: "Pricing", to: "/pricing" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link key={link.label} to={link.to} className="block text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Get Started</h4>
            <div className="space-y-2">
              <Link to="/start-project" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Start a Project</Link>
              <Link to="/get-quote" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Get a Quote</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">© 2026 Vildash Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
