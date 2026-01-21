"use client";

import { useMemo } from "react";

interface ExploreWithAIProps {
  articleUrl: string;
  articleTitle: string;
  articleExcerpt: string;
}

interface AIOption {
  name: string;
  url: (prompt: string) => string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

export default function ExploreWithAI({
  articleUrl,
  articleTitle,
  articleExcerpt,
}: ExploreWithAIProps) {
  const prompt = useMemo(() => {
    // Truncate long titles and excerpts to avoid URL length limits
    const truncatedTitle =
      articleTitle.length > 100
        ? articleTitle.substring(0, 100) + "..."
        : articleTitle;
    const truncatedExcerpt =
      articleExcerpt.length > 200
        ? articleExcerpt.substring(0, 200) + "..."
        : articleExcerpt;

    return `Basándome en el artículo "${truncatedTitle}" de Invoo (${articleUrl}): ${truncatedExcerpt}. ¿Cuáles son los puntos más importantes que debo tener en cuenta y cómo puedo aplicarlos a mi situación como autónomo o pyme en España? Siéntete libre de hacerme preguntas para personalizar mejor tu respuesta.`;
  }, [articleTitle, articleUrl, articleExcerpt]);

  const aiOptions: AIOption[] = [
    {
      name: "ChatGPT",
      url: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}`,
      color: "bg-[#10A37F]",
      hoverColor: "hover:bg-[#0D8B6E]",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M22.2819 9.82101C22.6932 8.40733 22.5746 6.89318 21.9477 5.5594C20.9018 3.39817 18.5684 2.12827 16.1805 2.45093C15.1524 1.18103 13.6009 0.421766 11.9587 0.377571C9.56284 0.310413 7.40571 1.84759 6.63855 4.11706C5.17632 4.36091 3.86556 5.14118 2.97296 6.30647C1.60411 8.25413 1.66021 10.8715 3.12555 12.7551C2.71427 14.1688 2.83289 15.683 3.45976 17.0168C4.50569 19.178 6.83903 20.4479 9.22698 20.1252C10.255 21.3951 11.8065 22.1544 13.4487 22.1986C15.8468 22.2657 18.0039 20.7264 18.7689 18.4547C20.2311 18.2109 21.5419 17.4306 22.4345 16.2653C23.8011 14.3199 23.745 11.7047 22.2819 9.82101ZM13.4576 20.6809C12.4051 20.6787 11.3904 20.2972 10.5912 19.6046L10.7721 19.4993L15.2669 16.902C15.5159 16.7545 15.6678 16.4863 15.6678 16.1958V10.0508L17.5602 11.1449C17.5824 11.1561 17.5957 11.1782 17.599 11.2027V16.2631C17.5924 18.7036 15.6234 20.6809 13.4576 20.6809ZM4.26883 16.8917C3.74188 15.9808 3.52839 14.9235 3.66001 13.8818L3.84093 13.9893L8.33573 16.5866C8.58253 16.7363 8.88851 16.7363 9.13752 16.5866L14.6499 13.4046V15.5929C14.6521 15.6196 14.641 15.6463 14.621 15.6641L10.0706 18.2925C7.95636 19.512 5.24831 18.7894 4.26883 16.8917ZM2.98406 7.90025C3.50879 6.98714 4.33046 6.28448 5.30993 5.90892V11.0626C5.30549 11.3509 5.45728 11.6191 5.70407 11.7666L11.2032 14.9419L9.31081 16.036C9.28641 16.0516 9.25536 16.0538 9.22875 16.0427L4.67393 13.4091C2.56639 12.1852 1.76033 9.78052 2.98406 7.90025ZM18.8955 12.2114L13.3964 9.03614L15.2888 7.94208C15.3132 7.9265 15.3442 7.92428 15.3708 7.93538L19.9257 10.5638C22.0443 11.7899 22.8504 14.2079 21.6044 16.0859C21.0819 16.999 20.2602 17.7017 19.2808 18.0772V12.9191C19.2874 12.633 19.1356 12.3648 18.8955 12.2114ZM20.7746 10.0973L20.5937 9.98985L16.1122 7.40145C15.8654 7.25174 15.5594 7.25174 15.3104 7.40145L9.79808 10.5835V8.39521C9.79586 8.36851 9.80696 8.34182 9.82692 8.32406L14.3773 5.70012C16.4937 4.47884 19.2084 5.20372 20.1879 7.10622C20.7104 8.01711 20.9217 9.07438 20.7879 10.1139L20.7746 10.0973ZM8.77873 13.9293L6.88413 12.8353C6.86195 12.8219 6.84643 12.8 6.84421 12.7755V7.71731C6.84865 5.27015 8.83314 3.28844 11.0012 3.29732C12.0514 3.29954 13.0617 3.67954 13.8587 4.3678L13.6778 4.47328L9.18303 7.07052C8.93401 7.21801 8.78221 7.48621 8.78443 7.77663L8.77873 13.9293ZM9.79586 11.7178L12.2228 10.3155L14.6521 11.7156V14.5181L12.2273 15.9204L9.79808 14.5203L9.79586 11.7178Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Claude",
      url: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
      color: "bg-[#CC9B7A]",
      hoverColor: "hover:bg-[#B88563]",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M17.5 4L14.5 20M9.5 4L6.5 20M20 9H4M20 15H4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Perplexity",
      url: (p) => `https://www.perplexity.ai/?q=${encodeURIComponent(p)}`,
      color: "bg-[#20808D]",
      hoverColor: "hover:bg-[#1A6A75]",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "Grok",
      url: (p) => `https://x.com/i/grok?text=${encodeURIComponent(p)}`,
      color: "bg-[#000000]",
      hoverColor: "hover:bg-[#333333]",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-background-secondary rounded-2xl p-6 mt-8 border border-strokes-primary">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-subheadline-emphasized text-label-primary">
          Explora este tema con IA
        </h3>
      </div>

      {/* AI Options Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {aiOptions.map((ai) => (
          <a
            key={ai.name}
            href={ai.url(prompt)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Explorar con ${ai.name} (abre en nueva ventana)`}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${ai.color} ${ai.hoverColor} text-white transition-all duration-200 hover:scale-105 active:scale-95`}
          >
            {ai.icon}
            <span className="text-caption1-emphasized">{ai.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
