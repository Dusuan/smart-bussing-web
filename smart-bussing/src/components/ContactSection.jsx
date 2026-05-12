import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <div
      id="contacto"
      className="justify-center items-center text-center pb-10"
    >
      <div className="flex flex-col">
        <div className="flex flex-col text-[#5F93A2]">
          <span style={{ fontSize: "25px" }}>Ponte en contacto y </span>
          <span style={{ fontSize: "33px" }}>¡PROMOCIONA TU NEGOCIO!</span>
        </div>
        <div className="flex items-center justify-center py-5 pb-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
