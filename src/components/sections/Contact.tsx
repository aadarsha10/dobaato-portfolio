import SectionTitle from '../ui/SectionTitle';
import ContactForm from '../ui/ContactForm';
import ContactInfo from '../ui/ContactInfo';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#F5F6FA] dark:bg-[#10172A]">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Get in Touch"
          subtitle="Let's Discuss Your Next Project"
        />
        
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}