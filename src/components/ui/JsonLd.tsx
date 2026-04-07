export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Badai Samoedra",
    url: "https://www.badaisamoedra.com/",
    email: "badaipunyasolusi@gmail.com",
    jobTitle: "Software Architect & Principal Engineer",
    description:
      "Software Architect and Principal Engineer based in Jakarta, Indonesia with 13+ years of experience building scalable systems, APIs, and cloud infrastructure.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    knowsAbout: [
      "System Architecture",
      "Software Engineering",
      "Backend Development",
      "Cloud Infrastructure",
      "DevOps",
      "API Design",
      "Engineering Leadership",
      "TypeScript",
      "Go",
      "Node.js",
      "Next.js",
      "AWS",
      "Azure",
      "GCP",
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
