import React from "react";
import { Metadata } from "next";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Siraa Health",
  description:
    "Learn how Siraa Health collects, uses, and protects your personal and medical information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <LegalHero
        title="Privacy Policy"
        subtitle="Last Updated: March 16, 2026"
      />

      <LegalContent>
        <p>
          We strive to offer a seamless experience to our customers that entail
          any payment that our users or patients make. With this, we have a very
          smooth payment and the cancellation policy set below.
        </p>

        <p>
          We understand the need for protecting a user's privacy. Therefore, we
          adhere to the highest standards of securing all transactions and
          customer information privacy. Please read below about our
          data/information collection and sharing practices.
        </p>

        <blockquote>
          <strong>Important Note:</strong> Our privacy policy may be revised
          from time to time without any notice at the discretion of the
          management. We believe that you are aware of any changes in it by
          reviewing this policy periodically.
        </blockquote>

        <p>
          By visiting Siraahealth website, you agree to bind by the terms and
          conditions of our Privacy Policy. If you do not agree, please do not
          use or access the website.
        </p>

        <p>
          By visiting our website, you agree to our terms and conditions to use
          and disclose your personal information by this Privacy Policy. This
          Privacy Policy is incorporated into and subject to the Terms of Use.
        </p>

        <h2>Collection of Personal and Other Information</h2>
        <p>
          When a patient visits our site and intentionally fills up the form to
          share details of his/ her health conditions, we maintain and store the
          information safely to ensure an efficient, smooth and personalized
          experience.
        </p>
        <p>
          This policy allows us to provide services and features to customize
          the website to make the experience more personalized, safer and
          easier. Hence, we collect that personal information we deem necessary.
        </p>
        <p>
          In general, you can browse the website without telling us who you are
          or revealing any personal information about yourself.
        </p>

        <p>
          Once you give us your personal information, you are not anonymous to
          us anymore. We will maintain and protect the data provided. Wherever
          applicable, we indicate which fields are required to be filled and
          which ones are optional. You always have the option to not provide
          information by choosing not to use a particular service or feature on
          the website.
        </p>

        <p>
          We may automatically track certain information about you based upon
          user behavior. We may use this information to do internal research on
          our users' demographics and interests to better understand, protect
          and serve our users. This information is compiled and analyzed on an
          aggregate basis. We use data collection devices such as 'cookies' on
          certain pages of the website to help analyze our web page flow,
          measure page effectiveness and promote trust and safety.
        </p>

        <p>
          'Cookies' are small files placed on your browser that assist us in
          providing our services. Moreover, you may encounter 'cookies' on
          certain pages of the website that are placed by third parties. We do
          not control the use of cookies by third parties. Cookies are useful
          for enabling the browser to remember information specific to a given
          user. We place both permanent and temporary cookies in your computer's
          hard drive. The cookies do not contain any of your personally
          identifiable information.
        </p>

        <p>
          During a transaction, we collect some additional information- such as
          a billing address, a credit/debit card number, and a credit/debit card
          expiration date and/ or other payment instrument details and tracking
          information from cheques or money orders. If you send us details of
          personal correspondence, such as emails or letters, or if other users
          or third parties send us correspondence about your activities or
          postings on the website, we may collect such information into a file
          specific to you.
        </p>

        <h2>Your Consent or User Consent</h2>
        <p>
          By using the website and/ or by providing your information, you are
          giving consent to the collection and use of the information you
          disclose on the website by our Privacy Policy, including but not
          limited to your consent for sharing your information as per this
          privacy policy.
        </p>
        <p>
          If we decide to change our privacy policy, we will post those changes
          on this page so that you are always aware of what information we
          collect, how we use it, and under what circumstances we disclose it.
        </p>
        <p>
          You give your consent to the applicability of the privacy policy of
          Siraahealth’s affiliate / partner in case you avail their services.
        </p>

        <h2>Reviewing, Changing or Deleting Information</h2>
        <p>
          If you would like to review, change or delete personal information we
          have collected from you, or permanently delete your account, please
          use the "Contact Us" link at the bottom of every page to go to the
          contact us page and then you can email us with your request.
          Information Grievance details are also listed at the bottom of this
          page.
        </p>

        <h3>Accessing and Correcting Your Personal Information</h3>
        <p>
          We will take reasonable steps to accurately record the personal
          information that you provide to us and any subsequent updates. We
          encourage you to review, update, and correct the personal information
          that we maintain about you, and you may request that we delete
          personal information about you that is inaccurate, incomplete, or
          irrelevant for legitimate purposes or are being processed in a way
          which infringes any applicable legal requirement.
        </p>

        <p>
          Your right to review, update, correct, and delete your personal
          information may be limited, subject to the law of your jurisdiction:
        </p>
        <ul>
          <li>If your requests are abusive or unreasonably excessive,</li>
          <li>
            Where the rights or safety of another person or persons would be
            encroached upon, or
          </li>
          <li>
            If the information or material you request relates to existing or
            anticipated legal proceedings between you and us, or providing
            access to you would prejudice negotiations between us or an
            investigation of possible unlawful activity.
          </li>
        </ul>
        <p>
          Your right to review, update, correct, and delete your information is
          subject to our records retention policies and applicable law,
          including any statutory retention requirements.
        </p>

        <h2>Contact Information Grievance Officer</h2>
        <p>
          In accordance with Information Technology Act 2000 and rules made
          there under, the name and contact details of the Grievance Officer are
          provided below:
        </p>
        {/* Contact details can be added here if available */}
      </LegalContent>
    </main>
  );
}
