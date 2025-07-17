"use client";
import { useState } from 'react';
import { Button, TextInput } from '@mantine/core'

// Api
import { emailSubscription } from '@/api/blog';

// Toast
import toast from 'react-hot-toast';

export default function Page() {
  const [showEmail, setShowEmail] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }
    setIsSubmitting(true);

    try {
      const result = await emailSubscription(email);
      const status = result.status;

      if (status == 200) {
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsSubmitting(false);
      }

    } catch (error: any) {
      const status = error.response?.status;
      if (status == 400) {
        setIsSubmitting(false);
        toast.error("You are already subscribed to the newsletter.");
      } else {
        setIsSubmitting(false);
        toast.error("Failed to subscribe. Please try again.");
      }
    }

  };

  return (
    <div className="min-h-screen text-black">
      <div className="max-w-4xl px-6 py-12 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold">
            <span className="text-2xl">📄</span>
            About Alamondai Blog
          </h1>

          <div className="space-y-6 leading-relaxed text-black">
            <p>
              Alamondai Blog is a digital publication built for creators, thinkers, and developers who care deeply about the{" "}
              <span className="font-medium text-black">craft of technology</span>, the{" "}
              <span className="font-medium text-black">future of ideas</span>, and the{" "}
              <span className="font-medium text-black">beauty of well-told stories</span>.
            </p>

            <p>
              Born from a love of <span className="font-medium text-black">clean code</span>,{" "}
              <span className="font-medium black">clear writing</span>, and{" "}
              <span className="font-medium black">critical thinking</span>, Alamondai Blog exists to inspire and
              challenge anyone navigating the fast-moving digital world, whether you're a curious student, a seasoned
              engineer, or someone simply seeking clarity in complexity.
            </p>
          </div>
        </div>

        {/* What You'll Find Here */}
        <div className="mb-12">
          <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold">
            <span className="text-2xl">🎯</span>
            What You'll Find Here
          </h2>

          <p className="mb-6 text-black">At Alamondai Blog, we publish content that sits at the intersection of:</p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-xl">🧠</span>
              <div>
                <span className="font-medium text-black">Software Engineering</span>
                <span className="text-black">
                  {" "}
                  {`->`} Practical guides, mental models, and architecture insights for devs who want to think bigger.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1 text-xl">⚠️</span>
              <div>
                <span className="font-medium text-black">Tech Philosophy</span>
                <span className="text-black">
                  {" "}
                  {`->`}  Essays exploring the human side of programming, tech ethics, and the cost of speed.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1 text-xl">🟢</span>
              <div>
                <span className="font-medium text-black">Tools & Trends</span>
                <span className="text-black">
                  {" "}
                  {`->`}  Deep dives into new frameworks, productivity tools, and developer-first startups.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Who's Behind It */}
        <div className="mb-12">
          <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold">
            <span className="text-2xl">👤</span>
            Who's Behind It?
          </h2>

          <div className="space-y-4 leading-relaxed text-black">
            <p>
              I'm <span className="font-medium text-black">Natnael Engeda</span>, a software developer, writer, and
              problem-solver. I created Alamondai as a space to share the ideas I wish existed when I was starting  and
              the questions I keep asking today.
            </p>

            <p>
              You can learn more about me at{" "}
              <a
                target="_blank"
                href="https://natnaelengeda.tech"
                className="text-blue-500 transition-colors hover:text-blue-800">
                natnaelengeda.tech
              </a>
              , or connect on{" "}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/natnaelengeda/"
                className="text-blue-500 transition-colors hover:text-blue-800">
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>

        {/* Why Alamondai */}
        <div className="mb-12">
          <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold">
            <span className="text-2xl">💛</span>
            Why "Alamondai"?
          </h2>

          <div className="leading-relaxed text-black">
            <p>
              "Alamondai" is a made-up word, a fusion of sound and intention. It doesn't mean anything in a dictionary,
              but it means everything here: a space to <span className="font-medium text-black">think freely</span>,{" "}
              <span className="font-medium text-black">build intentionally</span>, and{" "}
              <span className="font-medium text-black">write like it matters</span>.
            </p>
          </div>
        </div>

        {/* Stay in the Loop */}
        <div className="mb-8">
          <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold">
            <span className="text-2xl">📬</span>
            Stay in the Loop
          </h2>

          <div className="leading-relaxed text-black">
            <p>
              If you enjoy the content, consider subscribing to the [Alamondai Newsletter] — no spam, just thoughtful
              ideas and new posts delivered occasionally.
            </p>
          </div>

          <div className="mt-6 w-[26rem]">
            <Button
              onClick={() => setShowEmail(!showEmail)}
              variant="filled"
              className="px-6 py-2 text-black transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
              Subscribe to Newsletter
            </Button>

            {
              showEmail && (
                <div className='flex flex-row items-center justify-start w-full gap-2'>
                  <TextInput
                    className="mt-4"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                  <Button
                    className="mt-4"
                    variant="filled"
                    color="blue"
                    onClick={handleNewsletterSubmit}
                    disabled={isSubmitting}
                    loading={isSubmitting}>
                    Subscribe
                  </Button>
                </div>
              )

            }
          </div>
        </div>
      </div>
    </div>
  )
}
