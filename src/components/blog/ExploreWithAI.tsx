"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ExploreWithAIProps {
  articleUrl: string;
  articleTitle: string;
  articleExcerpt: string;
}

export default function ExploreWithAI({
  articleUrl,
  articleTitle,
  articleExcerpt,
}: ExploreWithAIProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const prompt = `Basándome en el artículo "${articleTitle}" de Invoo (${articleUrl}): ${articleExcerpt}. ¿Cuáles son los puntos más importantes que debo tener en cuenta y cómo puedo aplicarlos a mi situación como autónomo o pyme en España? Siéntete libre de hacerme preguntas para personalizar mejor tu respuesta.`;

  const chatGPTUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;

  return (
    <div className="flex items-center justify-between gap-4 bg-bg-secondary rounded-xxl p-4 mt-8 border border-border-primary">
      {/* Left side - Icon and text */}
      <div className="flex items-center gap-3">
        {/* ChatGPT Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 text-text-secondary"
        >
          <path
            d="M22.2819 9.82101C22.6932 8.40733 22.5746 6.89318 21.9477 5.5594C20.9018 3.39817 18.5684 2.12827 16.1805 2.45093C15.1524 1.18103 13.6009 0.421766 11.9587 0.377571C9.56284 0.310413 7.40571 1.84759 6.63855 4.11706C5.17632 4.36091 3.86556 5.14118 2.97296 6.30647C1.60411 8.25413 1.66021 10.8715 3.12555 12.7551C2.71427 14.1688 2.83289 15.683 3.45976 17.0168C4.50569 19.178 6.83903 20.4479 9.22698 20.1252C10.255 21.3951 11.8065 22.1544 13.4487 22.1986C15.8468 22.2657 18.0039 20.7264 18.7689 18.4547C20.2311 18.2109 21.5419 17.4306 22.4345 16.2653C23.8011 14.3199 23.745 11.7047 22.2819 9.82101ZM13.4576 20.6809C12.4051 20.6787 11.3904 20.2972 10.5912 19.6046L10.7721 19.4993L15.2669 16.902C15.5159 16.7545 15.6678 16.4863 15.6678 16.1958V10.0508L17.5602 11.1449C17.5824 11.1561 17.5957 11.1782 17.599 11.2027V16.2631C17.5924 18.7036 15.6234 20.6809 13.4576 20.6809ZM4.26883 16.8917C3.74188 15.9808 3.52839 14.9235 3.66001 13.8818L3.84093 13.9893L8.33573 16.5866C8.58253 16.7363 8.88851 16.7363 9.13752 16.5866L14.6499 13.4046V15.5929C14.6521 15.6196 14.641 15.6463 14.621 15.6641L10.0706 18.2925C7.95636 19.512 5.24831 18.7894 4.26883 16.8917ZM2.98406 7.90025C3.50879 6.98714 4.33046 6.28448 5.30993 5.90892V11.0626C5.30549 11.3509 5.45728 11.6191 5.70407 11.7666L11.2032 14.9419L9.31081 16.036C9.28641 16.0516 9.25536 16.0538 9.22875 16.0427L4.67393 13.4091C2.56639 12.1852 1.76033 9.78052 2.98406 7.90025ZM18.8955 12.2114L13.3964 9.03614L15.2888 7.94208C15.3132 7.9265 15.3442 7.92428 15.3708 7.93538L19.9257 10.5638C22.0443 11.7899 22.8504 14.2079 21.6044 16.0859C21.0819 16.999 20.2602 17.7017 19.2808 18.0772V12.9191C19.2874 12.633 19.1356 12.3648 18.8955 12.2114ZM20.7746 10.0973L20.5937 9.98985L16.1122 7.40145C15.8654 7.25174 15.5594 7.25174 15.3104 7.40145L9.79808 10.5835V8.39521C9.79586 8.36851 9.80696 8.34182 9.82692 8.32406L14.3773 5.70012C16.4937 4.47884 19.2084 5.20372 20.1879 7.10622C20.7104 8.01711 20.9217 9.07438 20.7879 10.1139L20.7746 10.0973ZM8.77873 13.9293L6.88413 12.8353C6.86195 12.8219 6.84643 12.8 6.84421 12.7755V7.71731C6.84865 5.27015 8.83314 3.28844 11.0012 3.29732C12.0514 3.29954 13.0617 3.67954 13.8587 4.3678L13.6778 4.47328L9.18303 7.07052C8.93401 7.21801 8.78221 7.48621 8.78443 7.77663L8.77873 13.9293ZM9.79586 11.7178L12.2228 10.3155L14.6521 11.7156V14.5181L12.2273 15.9204L9.79808 14.5203L9.79586 11.7178Z"
            fill="currentColor"
          />
        </svg>
        <span className="text-subheadline text-text-primary">
          Explora este tema con IA
        </span>
      </div>

      {/* Right side - Button and close */}
      <div className="flex items-center gap-3">
        <a
          href={chatGPTUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-accent-blue-main hover:bg-accent-blue-dark text-system-grey100 text-footnote-emphasized rounded-lg transition-colors duration-200"
        >
          Abrir ChatGPT
        </a>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 text-text-tertiary hover:text-text-primary transition-colors duration-200"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
