import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, ogImage, schema }) => {
  const siteName = 'Kokpit Okulları';
  const defaultTitle = 'Eskişehir Kokpit Okulları | Havacılık, Yazılım ve Sağlık Lisesi';
  const defaultDescription = 'Eskişehir Kokpit Okulları Yesevi Kampüsü; havacılık, yazılım ve sağlık alanlarında uygulamalı eğitim modeliyle öğrencileri geleceğin kariyerlerine hazırlar.';
  const defaultImage = '/vite.svg';
  const siteUrl = 'https://kokpitokullari.com';

  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || 'havacılık lisesi, sağlık meslek lisesi, yazılım koleji, Eskişehir özel okul, Kokpit Okulları';
  const finalCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const finalImage = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}${defaultImage}`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Kokpit Okulları Yesevi Kampüsü',
    url: siteUrl,
    logo: finalImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Şeker Mh. Gazi Yakup Satar Cd. No:90',
      addressLocality: 'Tepebaşı',
      addressRegion: 'Eskişehir',
      postalCode: '26120',
      addressCountry: 'TR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90 222 260 00 00',
      contactType: 'customer service',
      availableLanguage: 'Turkish'
    },
    sameAs: []
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalCanonical} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="tr" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
