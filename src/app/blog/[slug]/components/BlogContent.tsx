import DOMPurify from 'dompurify';  // Optional but HIGHLY recommended for safety

export default function BlogContent({ content }: { content: any }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  )
}
