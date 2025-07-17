import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col items-center w-full h-full min-h-screen gap-10 py-10 mx-auto md:container'>
      <div className='flex flex-col w-full gap-8 px-5 text-gray-600 md:w-2/3 md:px-2'>
        {/* Title */}
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-bold md:text-3xl '>Terms of Service</h1>
          <h1 className='text-xl font-semibold md:text-2xl'>Welcome to Alamondai Blog!</h1>
        </div>

        {/* Primary Text*/}
        <div className='flex flex-col '>
          <p className='text-base md:text-lg'>These Terms of Service {`("Terms")`} govern your use of our website located at <a className='underline text-primary' href="https://blog.alamondai.com">https://blog.alamondai.com</a> {`(the "Blog")`} and the services offered by Alamondai {`(the "Services")`}.
            By accessing or using the Website or Services, you agree to be bound by these Terms.  If you disagree with any part of these Terms, then you may not access or use the Website or Services.</p>
        </div>

        {/* Website Terms and Conditions */}
        <div className='flex flex-col w-full '>
          <ul className='flex flex-col gap-5 list-decimal list-inside'>
            {/* User Accounts */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>User Accounts</li>
              <p>You may be required to create an account to access certain features of the Website or Services, Like Paying for Services.
                You are responsible for maintaining the confidentiality of your account information, including your username and password.
                You are also fully responsible for all activities that occur under your account.
                You agree to notify Alamondai immediately of any unauthorized use of your account or any other security breach.
                Alamondai reserves the right to refuse service, terminate accounts, or remove or edit content at its sole discretion.</p>
            </div>

            {/* Use of the Website and Services */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold '>Use of the Website and Services</li>
              <div className='flex flex-col gap-2'>
                <p className=''>The Website and Services are provided for your personal and non-commercial use only. You agree not to use the Website or Services for any purpose that is unlawful or prohibited by these Terms.
                  Here are some examples of prohibited uses:</p>
                <ul className='text-sm list-disc list-inside md:text-base'>
                  <li>Violating any applicable laws or regulations.</li>
                  <li>Infringing upon the intellectual property rights of others.</li>
                  <li>Transmitting any harmful or malicious content, such as viruses or malware.</li>
                  <li>Disrupting the use of the Website or Services by others.</li>
                  <li>Collecting or storing personal data about other users without their consent.</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold '>Intellectual Property</li>
              <p>The Website and Services contain intellectual property owned by Alamondai, including trademarks,
                copyrights, and trade secrets.  You agree not to reproduce, modify, distribute, or commercially exploit any of this intellectual property without the express written permission of Alamondai.</p>
            </div>

            {/* Disclaimers */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Disclaimers</li>
              <p >The Website and Services are provided {`"as is"`} and without warranties of any kind, whether express or implied.
                Alamondai disclaims all warranties, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                Alamondai does not warrant that the Website or Services will be uninterrupted, secure, or error-free.
                Alamondai does not warrant that the results that may be obtained from the use of the Website or Services will be accurate or reliable.</p>
            </div>

            {/* Limitation of Liability */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold '>Limitation of Liability</li>
              <p>In no event shall Alamondai be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Website or Services.
                This includes, but is not limited to, damages for loss of profits, data loss, business interruption, or personal injury.</p>

            </div>
            {/* Termination */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold '> Termination</li>
              <p>Alamondai may terminate your access to the Website or Services at any time, for reason regarding, Theift Fraud and Malware / Cyber Attack.
                Alamondai may also, in its sole discretion, remove any content that you submit to the Website.</p>
            </div>

            {/* Governing Law */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Governing Law</li>
              <p>These Terms shall be governed by and construed in accordance with the laws of Addis Ababa, Ethiopia, without regard to its conflict of law provisions.</p>
            </div>

            {/* Dispute Resolution */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Dispute Resolution</li>
              <p>Any dispute arising out of or relating to these Terms shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association.
                The arbitration shall be held in Addis Ababa, Ethiopia.</p>
            </div>

            {/* Entire Agreement */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Entire Agreement</li>
              <p>These Terms constitute the entire agreement between you and Alamondai regarding your use of the Website and Services.</p>
            </div>

            {/* Changes to the Terms of Service */}
            <div className='flex flex-col gap-2 text-base md:text-lg'>
              <li className='font-bold'>Changes to the Terms of Service</li>
              <p>Alamondai reserves the right to update these Terms at any time.
                We will notify you of any changes by posting the new Terms on the Website.
                Your continued use of the Website or Services after the posting of any revised Terms means that you accept and agree to the changes.</p>
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
