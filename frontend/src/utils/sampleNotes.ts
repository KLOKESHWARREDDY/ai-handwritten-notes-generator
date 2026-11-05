import { Note } from '../types';

export const SAMPLE_NOTES: Note[] = [
  {
    id: 'sample-os-deadlock',
    title: 'Operating Systems: Deadlock & Prevention (10 Marks)',
    topic: 'Deadlock Conditions & Banker\'s Algorithm',
    subject: 'Operating Systems (CS301)',
    mode: '10-mark',
    dateStr: '15/11/2026',
    style: {
      font: 'kalam',
      paper: 'ruled',
      headingColor: '#1e40af',
      bodyColor: '#18181b',
      accentColor: '#dc2626',
      highlightColor: '#15803d',
      fontSize: 'md',
      lineSpacing: 'normal',
      showMargin: true,
      showDateBox: true,
    },
    tags: ['OS', 'Deadlocks', 'B.Tech Exam Prep', '10-Marker'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: 's1',
        type: 'definition',
        title: 'Definition: Deadlock',
        content: 'A deadlock is a situation in an operating system where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.',
        keywords: ['Deadlock', 'Blocked Processes', 'Resource Allocation', 'Mutual Waiting']
      },
      {
        id: 's2',
        type: 'important_box',
        title: 'Coffman Conditions (All 4 must hold simultaneously)',
        items: [
          '1. Mutual Exclusion: At least one resource must be non-shareable.',
          '2. Hold & Wait: A process holds at least one resource and is waiting for others.',
          '3. No Preemption: Resources cannot be forcibly confiscated from a process.',
          '4. Circular Wait: A closed loop exists where P0 waits for P1, and Pn waits for P0.'
        ],
        keywords: ['Mutual Exclusion', 'Hold & Wait', 'No Preemption', 'Circular Wait']
      },
      {
        id: 's3',
        type: 'diagram',
        title: 'Deadlock Circular Wait Flowchart',
        diagramData: {
          type: 'cycle',
          title: 'Circular Wait Resource Dependency',
          nodes: [
            { id: 'p1', label: 'Process P1', sublabel: 'Holds R1, Wants R2', color: 'blue' },
            { id: 'r2', label: 'Resource R2', sublabel: 'Allocated to P2', color: 'purple' },
            { id: 'p2', label: 'Process P2', sublabel: 'Holds R2, Wants R1', color: 'red' },
            { id: 'r1', label: 'Resource R1', sublabel: 'Allocated to P1', color: 'green' },
          ],
          links: [
            { from: 'p1', to: 'r2', label: 'Requests' },
            { from: 'r2', to: 'p2', label: 'Assigned to' },
            { from: 'p2', to: 'r1', label: 'Requests' },
            { from: 'r1', to: 'p1', label: 'Assigned to' },
          ]
        }
      },
      {
        id: 's4',
        type: 'table',
        title: 'Comparison: Deadlock Prevention vs Avoidance',
        tableData: {
          title: 'Prevention vs Avoidance Comparison',
          headers: ['Parameter', 'Deadlock Prevention', 'Deadlock Avoidance'],
          rows: [
            ['Core Mechanism', 'Eliminates at least 1 of 4 Coffman conditions', 'Dynamically evaluates resource allocation state'],
            ['Resource Utilization', 'Low (Strict conservative rules)', 'High (Allows requests if state is safe)'],
            ['Key Algorithm', 'Spooling, Resource Ordering', 'Banker\'s Algorithm, Safety Algorithm'],
            ['Prior Knowledge', 'No future request knowledge needed', 'Requires maximum resource claim in advance']
          ]
        }
      },
      {
        id: 's5',
        type: 'paragraph',
        title: 'Exam Quick Revision Formula',
        content: 'Banker\'s Algorithm Safety Check: Need[i][j] = Max[i][j] - Allocation[i][j]. If Need <= Available, allocate and return Work = Work + Allocation[i]. If all processes finish, state is SAFE.',
        keywords: ['Need Matrix', 'Max - Allocation', 'Safe State']
      }
    ]
  },
  {
    id: 'sample-dbms-acid',
    title: 'DBMS: ACID Properties & Transactions (5 Marks)',
    topic: 'Transaction Processing & ACID Guarantees',
    subject: 'Database Management Systems',
    mode: '5-mark',
    dateStr: '16/11/2026',
    style: {
      font: 'patrick',
      paper: 'ruled',
      headingColor: '#1e40af',
      bodyColor: '#18181b',
      accentColor: '#dc2626',
      highlightColor: '#15803d',
      fontSize: 'md',
      lineSpacing: 'normal',
      showMargin: true,
      showDateBox: true,
    },
    tags: ['DBMS', 'ACID', 'Transactions', '5-Marker'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: 'db1',
        type: 'definition',
        title: 'Definition: Database Transaction',
        content: 'A transaction is a single logical unit of work that accesses and potentially modifies database content. It must satisfy all four ACID properties to guarantee data consistency.',
        keywords: ['Logical Unit of Work', 'Consistency', 'Integrity']
      },
      {
        id: 'db2',
        type: 'bullet_points',
        title: 'The 4 Pillars of ACID',
        items: [
          'A - Atomicity: "All or Nothing". Either all operations execute or entire transaction rolls back.',
          'C - Consistency: Preserves database integrity constraints before and after execution.',
          'I - Isolation: Concurrent transactions execute independently without mutual interference.',
          'D - Durability: Once committed, updates persist permanently even during system crashes.'
        ],
        keywords: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Rollback', 'Commit']
      },
      {
        id: 'db3',
        type: 'important_box',
        title: 'Exam Tip for 5-Mark Answers',
        content: 'Always draw the State Transition Diagram: Active -> Partially Committed -> Committed (or Active -> Failed -> Aborted). State that Recovery Manager handles Atomicity/Durability, while Concurrency Control handles Isolation.',
        keywords: ['Recovery Manager', 'Concurrency Control', 'Commit / Abort']
      }
    ]
  },
  {
    id: 'sample-tenglish-ml',
    title: 'Machine Learning: Supervised vs Unsupervised (Telugu + English)',
    topic: 'Supervised, Unsupervised & Reinforcement Learning',
    subject: 'Artificial Intelligence & Machine Learning',
    mode: 'telugu-english',
    dateStr: '18/11/2026',
    style: {
      font: 'kalam',
      paper: 'cornell',
      headingColor: '#1e40af',
      bodyColor: '#18181b',
      accentColor: '#dc2626',
      highlightColor: '#15803d',
      fontSize: 'md',
      lineSpacing: 'relaxed',
      showMargin: true,
      showDateBox: true,
    },
    tags: ['AI/ML', 'Telugu-English', 'Exam Prep', 'Bilingual'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: 'ml1',
        type: 'telugu_explanation',
        title: 'Supervised Learning (Supervised శిక్షణ)',
        content: 'Supervised Learning lo data ki labels untayi (Input X tho paatu correct Output Y kuda istamu). Model input chusi correct answer predict cheyadam nerchukunthundi.',
        teluguContent: 'ఉదాహరణ: Email Spam Detection - ప్రతీ email కి \'Spam\' లేదా \'Not Spam\' అనే label ముందే ఉంటుంది. టీచర్ స్టూడెంట్ కి సమాధానాలతో నేర్పించినట్లు ఇది పనిచేస్తుంది.',
        keywords: ['Labeled Data', 'Input-Output Mapping', 'Classification', 'Regression']
      },
      {
        id: 'ml2',
        type: 'telugu_explanation',
        title: 'Unsupervised Learning (Unsupervised శిక్షణ)',
        content: 'Unsupervised Learning lo labels undavu (Only raw input data is provided). Algorithm data lo unde hidden patterns, similarities mariyu clusters ni tana anthata ade kanugontundi.',
        teluguContent: 'ఉదాహరణ: Customer Segmentation in E-Commerce - కస్టమర్ల కొనుగోలు అలవాట్లను బట్టి గ్రూపులుగా విభజించడం. ఇక్కడ ముందే ఏ label ఉండదు.',
        keywords: ['Unlabeled Data', 'Clustering', 'K-Means', 'Dimensionality Reduction']
      },
      {
        id: 'ml3',
        type: 'table',
        title: 'Key Differences / ముఖ్యాంశాలు',
        tableData: {
          title: 'Supervised vs Unsupervised Comparison',
          headers: ['Feature', 'Supervised Learning', 'Unsupervised Learning'],
          rows: [
            ['Data Type', 'Labeled Data (X and Y)', 'Unlabeled Data (Only X)'],
            ['Telugu Simple Idea', 'సమాధానం ముందే తెలుసు (Teacher model)', 'సమాధానం తెలియదు, pattern కనిపెట్టాలి'],
            ['Main Tasks', 'Classification, Regression', 'Clustering, Association Rules'],
            ['Algorithms', 'Linear Regression, SVM, Random Forest', 'K-Means, PCA, Apriori']
          ]
        }
      }
    ]
  }
];
