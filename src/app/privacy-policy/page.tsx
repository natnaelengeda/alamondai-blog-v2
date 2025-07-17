import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col items-center w-full h-full min-h-screen gap-10 py-10 mx-auto md:container'>
      <div className='flex flex-col w-full gap-8 px-5 text-gray-600 md:w-2/3 md:px-2'>

        {/* Title */}
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-bold md:text-3xl '>Privacy Policy</h1>
        </div>

        {/* Primary Text*/}
        <div className='flex flex-col '>
          <p className='text-base md:text-lg'>Your privacy is important to Alamondai. This Privacy Policy explains how we collect, use,
            and disclose information from and about you when you use our website located at <a className='underline text-primary' href="https://blog.alamondai.com">https://blog.alamondai.com</a> {`(the "Blog")`}
            and the services offered by Alamondai {`(the "Services")`}.</p>
        </div>

        {/* Content */}
        <div className='flex flex-col w-full '>
          <ul className='flex flex-col gap-5 list-decimal list-inside'>

            {/* Information We Collect */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Information We Collect</li>
              <p>We may collect several different types of information when you use our Website and Services:</p>
              <ul className='px-2 list-disc list-inside'>
                <li><b>Information You Provide Directly:</b>This includes personal information you enter when you contact us, request a quote, or subscribe to our newsletter. This may include your name, email address, phone number, company name, and project details.</li>
                <li><b>Information Collected Automatically:</b> We may collect certain usage data automatically when you use the Website. This data may include your IP address, browser type, operating system, referring URL, pages visited, and time spent on the Website.</li>
                <li><b>Cookies and Similar Technologies:</b> We may use cookies and similar tracking technologies to collect and store certain information. Cookies are small data files that are placed on your device when you visit a website.
                  They can be used to remember your preferences, track your activity on the website, and understand how you interact with our content.</li>
              </ul>
            </div>

            {/* Use of Information */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Use of Information</li>
              <p>We may use the information we collect for the following purposes:</p>
              <ul className='px-2 list-disc list-inside'>
                <li>To provide and improve our Services, including responding to your inquiries and requests.</li>
                <li>To send you marketing communications (only with your consent).</li>
                <li>To personalize your experience on the Website.</li>
                <li>To analyze website usage and user trends.</li>
                <li>To improve the functionality and security of the Website.</li>
                <li>To comply with legal obligations and enforce our Terms of Service.</li>
              </ul>
            </div>

            {/* Your Choices */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Your Choices</li>
              <p>You have choices regarding your information:</p>
              <ul className='px-2 list-disc list-inside'>
                <li><b>Access and Update Your Information:</b> You can request access to your personal information and update it by contacting us at <a className='underline text-primary' href="mailto:support@alamondaii.com">support@alamondaii.com</a>.</li>
                <li><b>Opt-Out of Marketing Communications:</b> {`You can unsubscribe from our marketing communications by clicking the "unsubscribe" link at the bottom of any email you receive from us.`}</li>
              </ul>
            </div>

            {/* Disclosure of Information */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Disclosure of Information</li>
              <p>We may disclose your information to third-party service providers who help us operate the Website and provide the Services.  These service providers are obligated to keep your information confidential and use it only for the purposes we have specified.</p>
              {/* <br /> */}
              <p>We may also disclose your information if required to do so by law or in the good faith belief that such disclosure is necessary to comply with legal processes, protect the security of the Website, or protect the rights, safety, or property of Alamondai or others.</p>
            </div>

            {/* Data Retention */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Data Retention</li>
              <p>We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
            </div>

            {/* Security */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Security</li>
              <p>We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction.  However, no website or internet transmission is completely secure.  We cannot guarantee the security of your information.</p>
            </div>

            {/*  Children's Privacy */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>{`Children's Privacy`}</li>
              <p>Our Website and Services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.  If you are a parent or guardian and you believe your child has provided us with personal information, please contact us.  We will take steps to remove the information from our systems.</p>
            </div>

            {/* International Transfers */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>International Transfers</li>
              <p>Your information may be transferred to and processed in countries other than your own.  These countries may have different data protection laws than your own country.  By using our Website and Services, you consent to the transfer of your information to these countries.</p>
            </div>

            {/* Changes to this Privacy Policy */}
            <div className='flex flex-col gap-2 tet'>
              <li className='font-bold'>Changes to this Privacy Policys</li>
              <p>We may update this Privacy Policy from time to time.  We will notify you of any changes by posting the new Privacy Policy on the Website.  You are advised to review this Privacy Policy periodically for any changes.</p>
            </div>

            {/* Contact Us */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Contact Us</li>
              <p>If you have any questions about these Terms, please contact us at <a className='underline text-primary' href="mailto:support@alamondaii.com.">support@alamondaii.com.</a></p>
              <p>If you want the {` Company's`} CEO email: <a className='underline text-primary' href="mailto:natnaelengeda@alamondaii.com">natnaelengeda@alamondaii.com</a></p>
            </div>

          </ul>
        </div>
      </div>
    </div>
  )
}
