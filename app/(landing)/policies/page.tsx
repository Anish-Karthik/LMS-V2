import React from "react"
import Link from "next/link"

import ContactUs from "../_components/landing/contact-us"

type SimpleSection = {
  heading: string
  sectionType: "SIMPLE"
  content: (JSX.Element | string)[]
}
type NestedSection = {
  section: string
  sectionType: "NESTED"
  subsections: (SimpleSection | NestedSection)[]
}

const termsAndConditions: (NestedSection | SimpleSection)[] = [
  /*{
    sectionType: "SIMPLE",
    heading: "Terms & Conditions",
    content: [
      <span>
        Welcome to Praglis! These terms and conditions outline the rules and
        regulations for the use of Praglis&apos;s Website, located at
        <Link href={"https://www.praglis.in/"}>https://www.praglis.in/</Link>
      </span>,
      `By accessing this website, we assume you accept these terms and conditions. Do not continue to use Praglis if you do not agree to take all of the terms and conditions stated on this page.`,
    ],
  },*/
  {
    sectionType: "NESTED",
    section: "Interpretation and Definitions",
    subsections: [
      {
        sectionType: "SIMPLE",
        heading: "Interpretation",
        content: [
          `The words of which the initial letter is capitalised have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.`,
        ],
      },
      {
        sectionType: "SIMPLE",
        heading: "Definitions",
        content: [
          "For the purposes of these Terms and Conditions:",
          "Country refers to India.",
          `Company (referred to as either "the Company", "We", "Us", or "Our" in this Agreement) refers to Praglis, 30/4, Tharavad, Shanthi medu, Nehru nagar, Coimbatore, Tamil nadu. PIN: 641019.`,
          "Device means any device that can access the Service, such as a computer, a cellphone, or a digital tablet.",
          "Service refers to the Website.",
          'Terms and Conditions (also referred to as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.',
          "Third-party Social Media Service means any services or content (including data, information, products, or services) provided by a third-party that may be displayed, included, or made available by the Service.",
          <span>
            The website refers to Praglis, accessible from{" "}
            <Link
              href={"https://www.praglis.in"}
              className="text-blue-500 underline hover:text-blue-400"
            >
              https://www.praglis.in
            </Link>
            .
          </span>,
          "You means, the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.",
        ],
      },
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Acknowledgment",
    content: [
      `These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.`,
      `Your access to and use of the Service are conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.`,
      `By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.`,
      `You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.`,
      `Your access to and use of the Service are also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Links to Other Websites",
    content: [
      `Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.`,
      `The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.`,
      `We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Termination",
    content: [
      `We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.`,
      `Upon termination, Your right to use the Service will cease immediately.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Limitation of Liability",
    content: [
      `Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You.`,
      `To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software, and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.`,
      `Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: `"AS IS" and "AS AVAILABLE" Disclaimer`,
    content: [
      `The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage, or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems, or services, operate without interruption, meet any performance or reliability standards, or be error-free or that any errors or defects can or will be corrected.`,
      `Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.`,
      `Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply. But in such a case the exclusions and limitations set forth in this section shall be applied to the`,
      `greatest extent enforceable under applicable law.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Governing Law",
    content: [
      `The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to applicable laws in India.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Disputes Resolution",
    content: [
      `If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company or within the jurisdiction of the applicable laws of Coimbatore, India.`,
    ],
  },
  {
    sectionType: "NESTED",
    section: "Severability and Waiver",
    subsections: [
      {
        sectionType: "SIMPLE",
        heading: "Severability",
        content: [
          `If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.`,
        ],
      },
      {
        sectionType: "SIMPLE",
        heading: "Waiver",
        content: [
          `Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.`,
        ],
      },
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Translation Interpretation",
    content: [
      `These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Changes to These Terms and Conditions",
    content: [
      `We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.`,
      `By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Contact Us",
    content: [
      `If you have any questions about these Terms and Conditions, You can contact us:`,
      <span>
        By email:{" "}
        <Link
          href={"mailto:praglis.media@gmail.com"}
          className="text-blue-500 underline hover:text-blue-400"
        >
          praglis.media@gmail.com
        </Link>
      </span>,
      `within the jurisdiction of the applicable laws of Coimbatore, India.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Refund Policy",
    content: [
      `Once paid, registration fees for the membership and other plans are non-refundable. If a registrant desires to reschedule his or her date of training, the registration is transferable to another training date/event hosted by Praglis, its affiliates, subsidiaries or successors so long as registrant provides us with at least five (5) days written or electronic (emailed) notice of the desire to transfer the registration.`,
      <span>
        In order to exercise Your right of transfer, You must inform Us of your
        decision by means of a clear statement. You can inform us of your
        decision By email:{" "}
        <Link
          href={"mailto:praglis.media@gmail.com"}
          className="text-blue-500 underline hover:text-blue-400"
        >
          praglis.media@gmail.com
        </Link>
      </span>,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Gifts",
    content: [
      `If the services were marked as a gift when purchased and then sent directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Contact Us",
    content: [
      `If you have any questions about these Terms and Conditions, You can contact us:`,
      <span>
        By email:{" "}
        <Link
          href={"mailto:praglis.media@gmail.com"}
          className="text-blue-500 underline hover:text-blue-400"
        >
          praglis.media@gmail.com
        </Link>
      </span>,
      `within the jurisdiction of the applicable laws of Coimbatore, India.`,
    ],
  },
  {
    sectionType: "SIMPLE",
    heading: "Privacy Policy",
    content: [
      `Our Privacy Policy is designed to clarify how we handle your personal information. In this policy, certain terms are defined to ensure consistency in interpretation. For instance, an "Account" refers to the unique access you have to our services, while "Company" denotes PRAGLIS, the entity responsible for this agreement. "Cookies" are small files placed on your device by our website, which may contain browsing history details and other relevant information. This policy applies regardless of whether these terms appear in singular or plural form.`,
      `When you use our service, we may ask you to provide certain personally identifiable information, such as your email address, name, phone number, and address. Additionally, we automatically collect usage data, including your device's IP address, browser type, pages visited, and more. We utilize tracking technologies like cookies, flash cookies, and web beacons to improve and analyze our service. While using cookies is optional, disabling them may limit your ability to access certain parts of our service.`,
      `We use your personal data for various purposes, including providing and maintaining our service, managing your account, contacting you, providing news and offers, and managing your requests. Your personal information may be shared with service providers, affiliates, business partners, other users, or with your consent. We retain your personal data only for as long as necessary and take steps to ensure its security, although no method of transmission over the internet is completely secure.`,
      `Our service may contain links to third-party websites that are not operated by us. We have no control over the content, privacy policies, or practices of these third-party sites and assume no responsibility for them. We may update our privacy policy from time to time, and any changes will be communicated to you via email or through a prominent notice on our service. It's important to review this policy periodically for any updates or changes.`,
      `If you have any questions about our privacy policy or how we handle your personal information, you can contact us at . Your privacy and security are important to us, and we are committed to ensuring that your personal data is handled responsibly and in accordance with this policy.`,
    ],
  },
]

const displaySections = (arr: typeof termsAndConditions) => {
  return (
    <section className="flex flex-col gap-4">
      {arr.map((term) => {
        if (term.sectionType === "SIMPLE") {
          return (
            <section className="flex flex-col gap-4">
              <h2 className="text-pink-color text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                {term.heading}
              </h2>
              <div className="flex flex-col gap-2">
                {term.content.map((content, index) => (
                  <p key={index}>{content}</p>
                ))}
              </div>
            </section>
          )
        } else {
          return (
            <section className="flex flex-col gap-4">
              <h2 className="text-pink-color text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                {term.section}
              </h2>
              <div>{displaySections(term.subsections)}</div>
            </section>
          )
        }
      })}
    </section>
  )
}

const page = () => {
  return (
    <main className="w-full">
      <section className="mx-auto mb-12 mt-32 flex w-full max-w-7xl flex-col gap-5 p-2 max-xl:p-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-purple-color text-2xl font-extrabold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Terms & Conditions
          </h1>
          <p>
            {`Welcome to Praglis! These terms and conditions outline the rules and
          regulations for the use of Praglis's Website, located at `}
            <Link
              href={"https://www.praglis.in"}
              className="text-blue-500 underline hover:text-blue-400"
            >
              https://www.praglis.in
            </Link>
            .
          </p>
          <p>
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Praglis if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>
        </div>
        {displaySections(termsAndConditions)}
      </section>

      <ContactUs className="!mt-0 text-white" />
    </main>
  )
}

export default page
