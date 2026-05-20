import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const prevTitle = document.title;
    document.title = "Page Not Found — Kanhaiya Kumar";

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      const created = !el;
      if (!el) {
        el = document.createElement("meta");
        const [a, v] = selector.replace(/[\[\]"]/g, "").split("=");
        el.setAttribute(a, v);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", value);
      return () => {
        if (created) el?.remove();
        else if (prev !== null) el!.setAttribute("content", prev);
      };
    };

    const currentUrl = `https://kanhaiya-kumar-portfolio.lovable.app${location.pathname}`;
    const desc = "The page you're looking for doesn't exist. Return to Kanhaiya Kumar's portfolio home.";
    const restorers = [
      setMeta('meta[name="description"]', "content", desc),
      setMeta('meta[property="og:title"]', "content", "Page Not Found — Kanhaiya Kumar"),
      setMeta('meta[property="og:description"]', "content", desc),
      setMeta('meta[property="og:url"]', "content", currentUrl),
      setMeta('meta[name="twitter:title"]', "content", "Page Not Found — Kanhaiya Kumar"),
      setMeta('meta[name="twitter:description"]', "content", desc),
      setMeta('meta[name="robots"]', "content", "noindex,follow"),
    ];

    return () => {
      document.title = prevTitle;
      restorers.forEach((r) => r());
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
