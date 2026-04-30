export interface NdaSection {
  id: string;
  heading: string;
  body: string;
}

export interface NdaSignatureBlock {
  party: string;
  lines: string[];
}

export interface NdaTemplate {
  title: string;
  effectiveDateLabel: string;
  preamble: string;
  sections: NdaSection[];
  signatureBlocks: NdaSignatureBlock[];
}

export const ndaTemplate: NdaTemplate = {
  title: "MUTUAL NON-DISCLOSURE AGREEMENT",
  effectiveDateLabel: "Effective Date: ____________________",
  preamble:
    'This Mutual Non-Disclosure Agreement (this "Agreement") is entered into as of the Effective Date set forth above by and between the Parties identified in Section 1. The Parties wish to explore and pursue the relationship described in Section 2 and, in connection therewith, may each disclose to the other certain Confidential Information. Each Party may act as either Disclosing Party or Receiving Party in any given exchange under this Agreement. The Parties agree as follows.',
  sections: [
    {
      id: "parties",
      heading: "PARTIES",
      body: [
        '1.1 QDaria Holdings AS, organisasjonsnummer [TBD], with registered address in Oslo, Norway ("QDaria"), and',
        "",
        '1.2 [Counterparty Name], organisasjonsnummer [TBD], with registered address at [Address] ("Counterparty"),',
        "",
        'each a "Party" and together the "Parties". This Agreement is mutual: in any given exchange of information under this Agreement, either Party may act as Disclosing Party (the Party disclosing Confidential Information) or as Receiving Party (the Party receiving Confidential Information), and the obligations of this Agreement apply to each Party in whichever capacity it acts.',
      ].join("\n"),
    },
    {
      id: "purpose",
      heading: "PURPOSE",
      body: [
        '2.1 The Parties enter into this Agreement to facilitate discussions and exchange of confidential information in connection with potential or actual collaboration between the Parties, including but not limited to employment, contracting, advisory, investment, partnership, customer, or supplier relationships (the "Purpose").',
        "",
        "2.2 Neither this Agreement nor any disclosure of Confidential Information hereunder obligates either Party to enter into any further agreement or business relationship.",
      ].join("\n"),
    },
    {
      id: "definition",
      heading: "DEFINITION OF CONFIDENTIAL INFORMATION",
      body: [
        '3.1 "Confidential Information" means any information of a confidential, proprietary, or non-public nature disclosed by or on behalf of the Disclosing Party to the Receiving Party in connection with the Purpose, regardless of the form in which it is disclosed (oral, written, electronic, visual, demonstrated, or otherwise).',
        "",
        "3.2 Confidential Information includes, without limitation: (a) technical information such as research and development plans, designs, specifications, source code, object code, algorithms, models, datasets, prototypes, know-how, methodologies, and architectures; (b) commercial information such as business plans, strategies, pricing, customer lists, supplier lists, marketing plans, and roadmaps; (c) financial information such as budgets, forecasts, capitalisation, valuations, and financial statements; (d) personnel information such as compensation, equity allocations, organisational structure, and individual evaluations; (e) customer and supplier information including identities, contracts, and contractual terms; (f) intellectual property of any kind, including patents, patent applications, trademarks, copyrights, design rights, and database rights; and (g) trade secrets within the meaning of the Norwegian Trade Secrets Act of 2020 (lov om vern av forretningshemmeligheter, forretningshemmelighetsloven).",
        "",
        '3.3 Information disclosed in tangible or electronic form should be marked or otherwise identified as "Confidential" or with a similar legend at the time of disclosure. Information disclosed orally or visually should be confirmed in writing as confidential within thirty (30) days of disclosure. Failure to mark or to provide written confirmation does not waive protection where the information would reasonably be understood to be confidential under the circumstances of disclosure.',
      ].join("\n"),
    },
    {
      id: "exclusions",
      heading: "EXCLUSIONS",
      body: [
        "4.1 The obligations under this Agreement do not apply to information that the Receiving Party can demonstrate by competent written records:",
        "",
        "(a) is or becomes publicly known and generally available through no act or omission of the Receiving Party or its Representatives in breach of this Agreement;",
        "",
        "(b) was lawfully known to the Receiving Party prior to disclosure by the Disclosing Party, without an obligation of confidence;",
        "",
        "(c) is independently developed by or for the Receiving Party without use of, reference to, or reliance upon any Confidential Information; or",
        "",
        "(d) is lawfully obtained by the Receiving Party from a third party who is not, to the Receiving Party's knowledge, under any obligation of confidence to the Disclosing Party with respect to such information.",
      ].join("\n"),
    },
    {
      id: "obligations",
      heading: "OBLIGATIONS",
      body: [
        "5.1 The Receiving Party shall:",
        "",
        "(a) hold the Disclosing Party's Confidential Information in strict confidence and protect it using at least the same degree of care that the Receiving Party uses to protect its own confidential information of like importance, and in no event less than a reasonable degree of care;",
        "",
        '(b) limit access to the Confidential Information to those of its directors, officers, employees, advisors, professional consultants, and contractors ("Representatives") who have a genuine need to know the Confidential Information for the Purpose and who are bound by written or professional obligations of confidentiality and use restriction at least as protective as those set out in this Agreement;',
        "",
        "(c) use the Confidential Information solely for the Purpose and for no other purpose;",
        "",
        "(d) not reverse engineer, decompile, disassemble, or otherwise attempt to derive the underlying ideas, structure, or source code of any software, hardware, prototype, or other tangible or intangible material disclosed as part of the Confidential Information; and",
        "",
        "(e) maintain reasonable technical, administrative, and organisational security measures designed to protect the Confidential Information from unauthorised access, use, disclosure, alteration, or destruction.",
        "",
        "5.2 The Receiving Party is responsible for any breach of this Agreement by its Representatives as if such breach had been committed by the Receiving Party itself.",
        "",
        "5.3 If the Receiving Party is required by law, regulation, court order, or governmental authority to disclose any Confidential Information, the Receiving Party shall, to the extent legally permitted, provide the Disclosing Party with prompt prior written notice and reasonable cooperation so that the Disclosing Party may seek a protective order or other appropriate remedy. Disclosure made under such legal compulsion does not, by itself, constitute a breach of this Agreement.",
      ].join("\n"),
    },
    {
      id: "term",
      heading: "TERM AND DURATION OF OBLIGATIONS",
      body: [
        "6.1 This Agreement enters into force on the Effective Date and continues until terminated by either Party upon thirty (30) days' written notice to the other Party.",
        "",
        "6.2 Notwithstanding any termination of this Agreement, the obligations of confidentiality, non-use, and protection set out herein shall continue with respect to Confidential Information disclosed during the term for a period of five (5) years from the date of last disclosure of the relevant Confidential Information.",
        "",
        "6.3 Information that constitutes a trade secret under the Norwegian Trade Secrets Act of 2020 shall remain protected for as long as it qualifies as a trade secret under that Act, irrespective of the five-year period set out in Section 6.2.",
      ].join("\n"),
    },
    {
      id: "return",
      heading: "RETURN OR DESTRUCTION",
      body: [
        "7.1 Within thirty (30) days following written request by the Disclosing Party or following termination of the relationship to which the Purpose relates, the Receiving Party shall, at the Disclosing Party's option, return or securely destroy all Confidential Information of the Disclosing Party in its possession or control, including all copies, extracts, summaries, analyses, notes, and derivative materials, in any form or medium.",
        "",
        "7.2 The Receiving Party shall, on written request, certify in writing that it has complied with its obligations under Section 7.1.",
        "",
        "7.3 The Receiving Party may retain (a) one archival copy of the Confidential Information solely for the purpose of demonstrating compliance with this Agreement and with applicable legal, regulatory, or professional retention requirements, and (b) Confidential Information held in routine system backups that cannot reasonably be deleted in the ordinary course, in each case subject to the continuing confidentiality obligations of this Agreement for as long as such information is retained.",
      ].join("\n"),
    },
    {
      id: "no-license",
      heading: "NO LICENSE",
      body: [
        "8.1 All Confidential Information remains the property of the Disclosing Party. No license, ownership interest, or other right under any patent, copyright, trademark, trade secret, or other intellectual property right is granted, expressly or by implication, by this Agreement or by the disclosure of Confidential Information, except the limited right to use the Confidential Information for the Purpose as set out in Section 5.1(c).",
        "",
        "8.2 Neither Party shall use the name, trademarks, or logos of the other Party in any publication, marketing material, or public statement without the other Party's prior written consent.",
      ].join("\n"),
    },
    {
      id: "remedies",
      heading: "REMEDIES",
      body: [
        "9.1 The Parties acknowledge that any breach or threatened breach of this Agreement may cause the Disclosing Party irreparable harm for which monetary damages would not be an adequate remedy.",
        "",
        "9.2 Accordingly, in addition to any other remedies available at law or in equity, the Disclosing Party is entitled to seek injunctive relief and specific performance to enforce this Agreement, without the requirement to post a bond or other security and without prejudice to its right to claim damages or any other legal or equitable remedy.",
        "",
        "9.3 The remedies provided in this Section are cumulative and not exclusive.",
      ].join("\n"),
    },
    {
      id: "law-and-forum",
      heading: "GOVERNING LAW AND FORUM",
      body: [
        "10.1 This Agreement is governed by and construed in accordance with the laws of Norway, without regard to its conflict-of-laws principles.",
        "",
        "10.2 The United Nations Convention on Contracts for the International Sale of Goods (CISG) does not apply to this Agreement.",
        "",
        "10.3 The Parties submit to the exclusive jurisdiction of Oslo tingrett (Oslo District Court) as the agreed venue (vernetinget) for any dispute arising out of or in connection with this Agreement, including its existence, validity, interpretation, performance, breach, or termination.",
      ].join("\n"),
    },
    {
      id: "miscellaneous",
      heading: "MISCELLANEOUS",
      body: [
        "11.1 Entire Agreement. This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior or contemporaneous agreements, understandings, and communications, whether written or oral, on that subject matter.",
        "",
        "11.2 Amendments. Any amendment or variation of this Agreement must be in writing and signed by authorised representatives of both Parties.",
        "",
        "11.3 Severability. If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect, and the Parties shall replace the invalid provision with a valid provision that most closely reflects the original intent.",
        "",
        "11.4 Assignment. Neither Party may assign or transfer this Agreement, in whole or in part, without the prior written consent of the other Party, except that either Party may assign this Agreement, on written notice and without consent, to a successor in connection with a merger, reorganisation, or sale of all or substantially all of its assets or business to which this Agreement relates.",
        "",
        "11.5 No Waiver. Failure or delay by either Party to exercise any right under this Agreement does not constitute a waiver of that right or any other right.",
        "",
        "11.6 Counterparts and Electronic Signatures. This Agreement may be executed in counterparts, each of which constitutes an original and all of which together constitute one and the same instrument. Signatures delivered by electronic means, including BankID, DocuSign, Penneo, and similar qualified or advanced electronic signature services, are valid and binding.",
        "",
        "11.7 Notices. Any notice required under this Agreement shall be in writing and delivered to the address or electronic address most recently specified by the receiving Party.",
      ].join("\n"),
    },
    {
      id: "signature-instructions",
      heading: "SIGNATURE",
      body: "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date set forth above, each through its duly authorised representative.",
    },
  ],
  signatureBlocks: [
    {
      party: "QDaria Holdings AS",
      lines: [
        "By: ____________________________________",
        "Name: Daniel Mo Houshmand",
        "Title: Chief Executive Officer",
        "Date: __________________",
        "Place: __________________",
      ],
    },
    {
      party: "[Counterparty]",
      lines: [
        "By: ____________________________________",
        "Name: __________________________________",
        "Title: _________________________________",
        "Date: __________________",
        "Place: __________________",
      ],
    },
  ],
};
