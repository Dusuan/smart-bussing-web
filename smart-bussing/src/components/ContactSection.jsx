import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <div
      id="contacto"
      className="justify-center  items-center text-center mb-10 p-6"
    >
      <div className="flex flex-col">
        <div className="text-center text-outline-sm text-white text-2xl lg:text-5xl">
          ¿Quieres promocionarte? <br /> Contáctanos
        </div>
        <div className="flex items-center justify-center py-5 pb-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
