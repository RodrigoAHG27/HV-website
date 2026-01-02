import LeadFormStepper from "./LeadFormStepper";
import formBg from "../../img/formbg.png";

export default function LeadFormSection() {
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
      <div className="mx-auto max-w-3xl">
        <LeadFormStepper />
      </div>
    </section>
  );
}
