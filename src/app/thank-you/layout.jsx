import { getSeoMetadata } from '@/app/utils/seoMetadata';
import SeoRawHead from '@/app/Components/SeoRawHead';

export async function generateMetadata() {
  const seoMetadata = await getSeoMetadata({
    pageUrl: '/surgical-centre/thank-you',
    hierarchyCandidates: [['Seeds of Innocence Surgical Centre', 'Thank You Page'], ['Thank You'], []],
  });

  return {
    ...seoMetadata,
    title: seoMetadata.title || 'Thank You | Seeds of Innocens Surgical Centre',
    description:
      seoMetadata.description || 'Thank you for reaching out to Seeds of Innocence Surgical Centre.',
  };
}

export default function ThankYouLayout({ children }) {
  return (
    <>
      <SeoRawHead pageUrl="/surgical-centre/thank-you" />
      {children}
    </>
  );
}
