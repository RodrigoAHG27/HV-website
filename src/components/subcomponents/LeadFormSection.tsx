import { useEffect, useRef, useState } from "react";
import LeadFormStepper from "./LeadFormStepper";
import formBg from "../../img/formbg.png";

export default function LeadFormSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="
        w-full
        bg-slate-100
        bg-cover
        bg-center
        bg-no-repeat
        px-4
        py-24
      "
      style={{ backgroundImage: `url(${formBg})` }}
    >
      <div
        ref={cardRef}
        className={`
          mx-auto max-w-3xl
          transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        `}
      >
        <LeadFormStepper />
      </div>
    </section>
  );
}
