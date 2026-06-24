export interface ConditionData {
  slug: string;
  name: string;
  tagline: string;
  heroColor: string;
  heroEmoji: string;
  whatIs: string;
  whatIsExtra?: string;
  parentsNotice: string[];
  howWeHelp: {
    title: string;
    description: string;
  }[];
  expertLabel: string;
  metaTitle: string;
  metaDescription: string;
}

export const CONDITIONS_DATA: Record<string, ConditionData> = {
  autism: {
    slug: "autism",
    name: "Autism Spectrum Disorder",
    tagline: "Early support makes the biggest difference — and it starts with understanding.",
    heroColor: "bg-purple-50",
    heroEmoji: "🧩",
    whatIs:
      "Autism Spectrum Disorder (ASD) is a developmental condition that affects how a child communicates, interacts socially, and processes the world around them. Every child with autism is unique — some may be highly verbal and social but struggle with sensory input, while others may have limited speech and prefer routines and solitude.",
    whatIsExtra:
      "Autism is not a disease and it cannot be 'cured' — but with the right early intervention, children with autism can develop meaningful communication, social connections, and independence. The earlier support begins, the greater the impact.",
    parentsNotice: [
      "Limited or no eye contact by 12 months",
      "Not responding to their name by 12 months",
      "Not pointing to show interest by 14 months",
      "Loss of previously acquired speech or social skills",
      "Preference for being alone or difficulty playing with other children",
      "Repetitive movements like hand-flapping, rocking, or spinning",
      "Strong attachment to routines — upset by small changes",
      "Unusual reactions to sounds, textures, lights, or smells",
      "Very focused interests in specific topics or objects",
    ],
    howWeHelp: [
      {
        title: "Comprehensive developmental assessment",
        description:
          "Our specialists conduct a thorough evaluation to understand your child's strengths, challenges, and developmental profile — giving you a clear picture and a personalised plan.",
      },
      {
        title: "Speech & communication therapy",
        description:
          "We work on building functional communication — whether through spoken words, visual supports, or AAC (augmentative and alternative communication) tools.",
      },
      {
        title: "Occupational therapy for sensory needs",
        description:
          "Many children with autism experience sensory sensitivities. Our OT sessions help children regulate sensory input so they can focus, participate, and feel comfortable.",
      },
      {
        title: "Behaviour support & ABA-informed strategies",
        description:
          "We use evidence-based approaches to help children develop adaptive behaviours, reduce challenging behaviours, and build life skills in a structured, supportive environment.",
      },
      {
        title: "Parent training & counselling",
        description:
          "You are your child's biggest support. We equip parents with strategies, tools, and emotional support to continue progress at home and school.",
      },
    ],
    expertLabel: "an Autism Specialist",
    metaTitle: "Autism Spectrum Disorder Support for Children in Gurgaon | Siraa Health",
    metaDescription:
      "Expert assessment and therapy for children with autism in Gurgaon. Speech therapy, occupational therapy, and parent support at Siraa Health.",
  },

  "speech-delay": {
    slug: "speech-delay",
    name: "Speech & Language Delay",
    tagline: "Your child has something to say. We help them find their voice.",
    heroColor: "bg-blue-50",
    heroEmoji: "💬",
    whatIs:
      "Speech and language delay is one of the most common developmental concerns in young children. It refers to a child developing communication skills — speaking, understanding, or using language — more slowly than expected for their age. Speech delay affects the sounds and words a child produces, while language delay affects how a child understands and expresses ideas.",
    whatIsExtra:
      "Speech and language delays can have many causes — hearing difficulties, developmental differences, limited exposure to language, or other underlying conditions. Early intervention with a qualified speech-language therapist significantly improves outcomes.",
    parentsNotice: [
      "Not babbling by 12 months",
      "Not saying any words by 16 months",
      "Not combining two words by 24 months (e.g. 'more milk')",
      "Difficulty following simple instructions",
      "Frustration when trying to communicate — tantrums or pointing instead of speaking",
      "Unclear speech that is hard to understand even for family members",
      "Not using gestures like waving or pointing",
      "Regression — losing words they previously used",
    ],
    howWeHelp: [
      {
        title: "Speech & language assessment",
        description:
          "We evaluate your child's receptive language (what they understand), expressive language (what they say), and speech sounds to identify exactly where support is needed.",
      },
      {
        title: "Individualised speech therapy",
        description:
          "Sessions are play-based and child-friendly, designed to build vocabulary, sentence structure, articulation, and functional communication at your child's pace.",
      },
      {
        title: "Hearing screening referral",
        description:
          "We screen for hearing issues that may be contributing to speech delay and refer for audiology evaluation where needed.",
      },
      {
        title: "Home programme for parents",
        description:
          "We give parents practical, easy-to-implement strategies to support language development throughout the day — during meals, play, and daily routines.",
      },
    ],
    expertLabel: "a Speech Therapist",
    metaTitle: "Speech & Language Delay Therapy for Children in Gurgaon | Siraa Health",
    metaDescription:
      "Speech therapy for children with speech and language delay in Gurgaon. Expert assessment and personalised therapy at Siraa Health.",
  },

  adhd: {
    slug: "adhd",
    name: "ADHD",
    tagline: "ADHD is not a lack of effort. It's a different way of thinking — and we know how to support it.",
    heroColor: "bg-orange-50",
    heroEmoji: "⚡",
    whatIs:
      "Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental condition characterised by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with daily functioning and development. ADHD is one of the most common childhood developmental conditions and is entirely manageable with the right support.",
    whatIsExtra:
      "Children with ADHD are often highly creative, energetic, and passionate — they simply need strategies and environments that work with their brain rather than against it. Early intervention helps children develop the self-regulation, attention, and organisational skills they need to thrive.",
    parentsNotice: [
      "Difficulty staying focused on tasks or activities",
      "Easily distracted by sights, sounds, or thoughts",
      "Frequently losing things — toys, school supplies, belongings",
      "Difficulty following multi-step instructions",
      "Talking excessively or interrupting conversations",
      "Difficulty waiting their turn in games or conversations",
      "Running, climbing, or moving constantly — even in situations where it's not appropriate",
      "Impulsive decisions without thinking of consequences",
      "Emotional outbursts that seem disproportionate",
      "Inconsistent performance — doing well one day, struggling the next",
    ],
    howWeHelp: [
      {
        title: "Developmental & behavioural assessment",
        description:
          "We conduct a thorough evaluation including observation, parent and teacher input, and standardised assessments to understand your child's specific ADHD profile.",
      },
      {
        title: "Occupational therapy for attention & sensory regulation",
        description:
          "OT sessions target the sensory and motor foundations of attention — helping children self-regulate, sit for tasks, and engage more effectively at home and school.",
      },
      {
        title: "Executive function skill-building",
        description:
          "We work on planning, organisation, time management, and impulse control through structured, engaging activities that build these skills gradually.",
      },
      {
        title: "School support strategies",
        description:
          "We collaborate with parents and teachers to create supportive classroom environments, modified routines, and practical strategies that help children succeed academically.",
      },
      {
        title: "Parent coaching",
        description:
          "We equip parents with ADHD-specific parenting strategies — positive reinforcement, consistent structure, and calm communication techniques that reduce conflict and build confidence.",
      },
    ],
    expertLabel: "an ADHD Specialist",
    metaTitle: "ADHD Assessment & Support for Children in Gurgaon | Siraa Health",
    metaDescription:
      "Expert ADHD assessment and therapy for children in Gurgaon. Occupational therapy, behavioural support, and parent coaching at Siraa Health.",
  },

  "global-developmental-delay": {
    slug: "global-developmental-delay",
    name: "Global Developmental Delay",
    tagline: "Every child grows at their own pace. We help yours move forward.",
    heroColor: "bg-teal-50",
    heroEmoji: "📈",
    whatIs:
      "Global Developmental Delay (GDD) is diagnosed when a child shows significant delays across two or more areas of development — including motor skills, speech and language, cognitive ability, social skills, and daily living skills. GDD is typically identified in children under 5 years old.",
    whatIsExtra:
      "GDD can have a wide variety of causes, including genetic conditions, premature birth, infections during pregnancy, or unknown factors. Early and consistent intervention across multiple therapy domains is the most effective way to support a child with GDD.",
    parentsNotice: [
      "Delayed sitting, crawling, or walking",
      "Limited or no speech by expected milestones",
      "Difficulty understanding simple instructions",
      "Limited social interaction or play with other children",
      "Challenges with self-care tasks like feeding or dressing",
      "Short attention span or difficulty engaging with toys or activities",
      "Slower learning compared to same-age peers",
    ],
    howWeHelp: [
      {
        title: "Multi-domain developmental assessment",
        description:
          "We assess all areas of development — motor, cognitive, speech, social, and adaptive — to create a complete picture and a coordinated intervention plan.",
      },
      {
        title: "Physiotherapy & motor development",
        description:
          "For children with motor delays, we support the development of gross motor skills (sitting, walking, balance) and fine motor skills (grasping, drawing, self-care).",
      },
      {
        title: "Speech & communication therapy",
        description:
          "We work on building functional communication skills, from early vocalisation and gesture to words, phrases, and sentences.",
      },
      {
        title: "Occupational therapy",
        description:
          "OT sessions build the sensory processing, attention, and daily living skills children need to participate in home, school, and social environments.",
      },
      {
        title: "Coordinated family-centred care",
        description:
          "We bring together specialists from different therapy disciplines to ensure your child's programme is joined-up, consistent, and focused on real-life goals.",
      },
    ],
    expertLabel: "a Developmental Specialist",
    metaTitle: "Global Developmental Delay Support for Children in Gurgaon | Siraa Health",
    metaDescription:
      "Expert assessment and therapy for children with Global Developmental Delay in Gurgaon. Multi-domain support at Siraa Health.",
  },

  "cerebral-palsy": {
    slug: "cerebral-palsy",
    name: "Cerebral Palsy",
    tagline: "With the right support, children with cerebral palsy can achieve more than you might imagine.",
    heroColor: "bg-rose-50",
    heroEmoji: "🏃",
    whatIs:
      "Cerebral palsy (CP) is a group of permanent movement and posture disorders caused by damage to the developing brain, usually before or during birth. It is the most common physical disability in childhood. CP affects muscle tone, movement, and motor skills — though it can also affect speech, cognition, and sensory processing depending on the area of the brain affected.",
    whatIsExtra:
      "Cerebral palsy is not progressive — the brain injury does not worsen over time. However, the effects on the body can change as a child grows. Early and ongoing therapy is essential to help children develop maximum independence and quality of life.",
    parentsNotice: [
      "Floppy or stiff muscle tone from birth",
      "Delayed motor milestones — rolling, sitting, crawling, walking",
      "Asymmetrical movement — favouring one side of the body",
      "Difficulty with fine motor tasks — grasping, feeding, drawing",
      "Abnormal gait or walking pattern",
      "Difficulty with speech or feeding",
      "Muscle spasms or tightness",
      "Poor balance and coordination",
    ],
    howWeHelp: [
      {
        title: "Physiotherapy for motor development",
        description:
          "We work on improving strength, flexibility, balance, and functional movement — helping children achieve greater physical independence.",
      },
      {
        title: "Occupational therapy",
        description:
          "OT sessions focus on fine motor skills, self-care independence, and adaptive strategies to help children participate fully in daily life.",
      },
      {
        title: "Speech & feeding therapy",
        description:
          "For children with speech or feeding difficulties related to CP, we provide targeted therapy to improve communication and safe, enjoyable mealtimes.",
      },
      {
        title: "Assistive technology & equipment guidance",
        description:
          "We advise on supportive equipment, orthotics, and adaptive tools that can improve posture, mobility, and independence.",
      },
      {
        title: "Family training & home programme",
        description:
          "We train families in positioning, handling, and daily activity strategies that support development and prevent secondary complications.",
      },
    ],
    expertLabel: "a Cerebral Palsy Specialist",
    metaTitle: "Cerebral Palsy Therapy for Children in Gurgaon | Siraa Health",
    metaDescription:
      "Physiotherapy, occupational therapy, and speech therapy for children with cerebral palsy in Gurgaon at Siraa Health.",
  },

  "learning-disorders": {
    slug: "learning-disorders",
    name: "Learning Disorders",
    tagline: "Your child isn't struggling because they're not trying. Their brain just learns differently.",
    heroColor: "bg-amber-50",
    heroEmoji: "📚",
    whatIs:
      "Learning disorders are neurodevelopmental conditions that affect how the brain processes information, making it harder for a child to read, write, spell, or do maths — despite having average or above-average intelligence. Common learning disorders include dyslexia (reading), dysgraphia (writing), and dyscalculia (maths).",
    whatIsExtra:
      "Children with learning disorders are often bright, creative, and capable — they simply need a different approach to learning. Early identification and targeted intervention can help children develop compensatory strategies and succeed academically and in life.",
    parentsNotice: [
      "Difficulty learning to read despite regular instruction",
      "Slow, laboured reading with frequent errors",
      "Poor spelling — inconsistent, even for familiar words",
      "Messy handwriting or difficulty holding a pencil",
      "Difficulty organising thoughts in writing",
      "Struggling with basic maths concepts or number sense",
      "Avoiding reading or writing activities",
      "Homework taking significantly longer than peers",
      "Discrepancy between verbal ability and written/academic performance",
    ],
    howWeHelp: [
      {
        title: "Educational & psychoeducational assessment",
        description:
          "We conduct standardised assessments to identify the specific nature and severity of a child's learning difficulties, and rule out other contributing factors.",
      },
      {
        title: "Targeted literacy & numeracy intervention",
        description:
          "Using evidence-based approaches like structured literacy, we provide intensive, individualised support for reading, writing, and maths skills.",
      },
      {
        title: "Occupational therapy for writing difficulties",
        description:
          "For children with dysgraphia or handwriting difficulties, OT addresses the fine motor, visual-motor, and sensory foundations of writing.",
      },
      {
        title: "School liaison & accommodation support",
        description:
          "We provide documentation and recommendations to help schools implement appropriate accommodations — extra time, oral assessments, assistive technology.",
      },
      {
        title: "Building confidence & self-esteem",
        description:
          "Children with learning disorders often experience frustration and low confidence. We integrate self-esteem building into every aspect of our work.",
      },
    ],
    expertLabel: "a Learning Specialist",
    metaTitle: "Learning Disorders Assessment & Therapy in Gurgaon | Siraa Health",
    metaDescription:
      "Expert assessment and intervention for dyslexia, dysgraphia, and other learning disorders in children. Siraa Health, Gurgaon.",
  },

  "down-syndrome": {
    slug: "down-syndrome",
    name: "Down Syndrome",
    tagline: "Children with Down syndrome have incredible strengths. We help them build on every one.",
    heroColor: "bg-pink-50",
    heroEmoji: "❤️",
    whatIs:
      "Down syndrome is a genetic condition caused by the presence of an extra copy of chromosome 21. It is one of the most common chromosomal conditions and occurs in approximately 1 in 700 births. Down syndrome affects development differently in every child — some children develop quickly and attend mainstream schools, while others need more intensive support.",
    whatIsExtra:
      "Children with Down syndrome often have warm personalities, strong social awareness, and a genuine love of people. With early intervention, consistent therapy, and an inclusive environment, children with Down syndrome can develop strong communication skills, independence, and a meaningful quality of life.",
    parentsNotice: [
      "Delayed motor milestones — sitting, standing, walking",
      "Low muscle tone (hypotonia) — floppy limbs, difficulty with posture",
      "Speech and language development that is slower than motor development",
      "Difficulty with fine motor tasks — feeding, drawing, dressing",
      "Short attention span and difficulty with task completion",
      "Hearing or vision difficulties (common in Down syndrome)",
      "Social strengths — warmth, empathy, and desire to connect",
    ],
    howWeHelp: [
      {
        title: "Early intervention programme",
        description:
          "The earlier therapy begins, the better the outcomes. We provide coordinated early intervention across speech, OT, and physiotherapy from infancy.",
      },
      {
        title: "Physiotherapy for motor development",
        description:
          "We address hypotonia and support the development of gross motor skills — rolling, sitting, walking, and physical coordination.",
      },
      {
        title: "Speech & feeding therapy",
        description:
          "We support communication development from early vocalisation to words and sentences, and address feeding difficulties common in infants with Down syndrome.",
      },
      {
        title: "Occupational therapy",
        description:
          "OT sessions build fine motor skills, daily living independence, and sensory processing — preparing children for school and life at home.",
      },
      {
        title: "Inclusive education support",
        description:
          "We work with families and schools to support successful inclusion in mainstream or special education settings.",
      },
    ],
    expertLabel: "a Down Syndrome Specialist",
    metaTitle: "Down Syndrome Therapy & Support for Children in Gurgaon | Siraa Health",
    metaDescription:
      "Early intervention, speech therapy, physiotherapy, and occupational therapy for children with Down syndrome in Gurgaon at Siraa Health.",
  },

  "milestone-delays": {
    slug: "milestone-delays",
    name: "Milestone Delays",
    tagline: "Every child has their own timeline — but some delays are a signal worth acting on early.",
    heroColor: "bg-emerald-50",
    heroEmoji: "🌱",
    whatIs:
      "Developmental milestones are skills that most children can do by a certain age — like smiling, sitting, walking, or saying their first words. A milestone delay occurs when a child is significantly behind their peers in reaching one or more of these markers. Delays can occur in gross motor, fine motor, speech and language, cognitive, or social-emotional development.",
    whatIsExtra:
      "Not every delay is a cause for alarm — children develop at different rates. But persistent or significant delays are worth investigating early. A professional assessment can identify whether a delay is a normal variation or the sign of an underlying condition that would benefit from support.",
    parentsNotice: [
      "Not holding head up by 4 months",
      "Not sitting without support by 9 months",
      "Not walking by 18 months",
      "Not saying any words by 16 months",
      "Not using two-word phrases by 24 months",
      "Not following simple instructions by 18 months",
      "Not playing alongside other children by 3 years",
      "Difficulty with age-appropriate self-care tasks",
      "Regression — losing skills they previously had",
    ],
    howWeHelp: [
      {
        title: "Developmental screening & assessment",
        description:
          "We use validated screening tools to assess your child across all developmental domains and identify areas of concern that need closer attention.",
      },
      {
        title: "Personalised intervention plan",
        description:
          "Based on the assessment, we create a tailored therapy plan targeting the specific areas of delay — whether motor, language, cognitive, or social.",
      },
      {
        title: "Parent guidance & home strategies",
        description:
          "We equip parents with practical, play-based activities to support development between therapy sessions — because the home environment is where most learning happens.",
      },
      {
        title: "Monitoring & reassessment",
        description:
          "We track progress regularly and adjust the intervention plan based on how your child is developing — ensuring therapy always targets the most impactful goals.",
      },
    ],
    expertLabel: "a Developmental Specialist",
    metaTitle: "Developmental Milestone Delay Support for Children in Gurgaon | Siraa Health",
    metaDescription:
      "Expert developmental screening and therapy for children with milestone delays in Gurgaon. Early intervention at Siraa Health.",
  },
};

export function getConditionData(slug: string): ConditionData | null {
  return CONDITIONS_DATA[slug] || null;
}

export function getAllConditionSlugs(): string[] {
  return Object.keys(CONDITIONS_DATA);
}
