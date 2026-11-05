import React from 'react';
import {
  Layers,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  FileCheck,
  CheckCircle,
  Cpu,
  Globe2,
  Table,
} from 'lucide-react';
import type { Note, NoteMode } from '../types';
import type { PageId } from '../components/layout/Navbar';

interface TemplatesPageProps {
  onSelectTemplate: (template: Note) => void;
  onNavigate: (page: PageId) => void;
}

interface TemplateCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  icon: React.ReactNode;
  mode: NoteMode;
  noteData: Note;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onSelectTemplate,
  onNavigate,
}) => {
  const templates: TemplateCard[] = [
    {
      id: 'template-10-mark',
      title: '10-Mark University Blueprint',
      subtitle: 'Definition + Principles + Flowchart + Comparison + Cautions',
      badge: 'Most Popular',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: <Award className="w-5 h-5 text-purple-600" />,
      description: 'The standard blueprint for high-scoring answers. Follows the official evaluator checklist with formal definitions, steps, flowchart, and scoring pitfalls.',
      mode: '10-mark',
      noteData: {
        id: 'tpl-10-mark-' + Date.now(),
        title: 'Computer Science: Process Synchronization & Mutex (10 Marks)',
        topic: 'Critical Section Problem & Synchronization',
        subject: 'Operating Systems (CS401)',
        mode: '10-mark',
        dateStr: new Date().toLocaleDateString('en-GB'),
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
        tags: ['Template', '10-Mark', 'CS'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sections: [
          {
            id: 't1',
            type: 'definition',
            title: 'Definition: Critical Section',
            content: 'A Critical Section is a code segment where shared resources (variables, memory, files) are accessed concurrently. To prevent race conditions, only one process must execute in its critical section at any given time.',
            keywords: ['Critical Section', 'Shared Resources', 'Race Conditions', 'Concurrent Execution']
          },
          {
            id: 't2',
            type: 'bullet_points',
            title: 'The Three Essential Requirements',
            items: [
              '1. Mutual Exclusion: If process Pi is executing in its critical section, no other processes can be executing in their critical sections.',
              '2. Progress: If no process is executing and some want to enter, selection cannot be postponed indefinitely.',
              '3. Bounded Waiting: A bound must exist on the number of times other processes are allowed to enter after a request is made.'
            ],
            keywords: ['Mutual Exclusion', 'Progress', 'Bounded Waiting']
          },
          {
            id: 't3',
            type: 'diagram',
            title: 'Synchronization Lifecycle Flowchart',
            diagramData: {
              type: 'flowchart',
              title: 'Critical Section Entry & Exit Cycle',
              nodes: [
                { id: 'entry', label: '1. Entry Section', sublabel: 'Request Lock', color: 'blue' },
                { id: 'cs', label: '2. Critical Section', sublabel: 'Access Shared State', color: 'red' },
                { id: 'exit', label: '3. Exit Section', sublabel: 'Release Lock', color: 'green' },
                { id: 'rem', label: '4. Remainder Section', sublabel: 'Non-shared Code', color: 'purple' },
              ],
              links: [
                { from: 'entry', to: 'cs', label: 'Lock Acquired' },
                { from: 'cs', to: 'exit', label: 'Done' },
                { from: 'exit', to: 'rem', label: 'Lock Released' },
              ]
            }
          },
          {
            id: 't4',
            type: 'important_box',
            title: 'Examiner Scoring Tip',
            content: 'Never forget to mention hardware atomic instructions like TestAndSet() and Swap() alongside software solutions like Peterson\'s Algorithm.',
            keywords: ['Hardware Atomic', 'TestAndSet', 'Peterson\'s Algorithm']
          }
        ]
      }
    },
    {
      id: 'template-5-mark',
      title: '5-Mark Concise Revision Sheet',
      subtitle: 'Precise Definition + 4 Bullets + Takeaway Table',
      badge: 'Concise',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
      description: 'Ideal for 5-mark short notes. Fits tightly into a single A4 page with minimal filler and maximal punch points.',
      mode: '5-mark',
      noteData: {
        id: 'tpl-5-mark-' + Date.now(),
        title: 'DBMS: Relational Keys & Normal Forms (5 Marks)',
        topic: 'Primary, Candidate & Foreign Keys',
        subject: 'Database Systems',
        mode: '5-mark',
        dateStr: new Date().toLocaleDateString('en-GB'),
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
        tags: ['Template', '5-Mark', 'DBMS'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sections: [
          {
            id: 'k1',
            type: 'definition',
            title: 'Definition: Database Keys',
            content: 'A Key is an attribute or set of attributes that uniquely identifies any tuple or row in a relation without ambiguity.',
            keywords: ['Attribute', 'Uniquely Identifies', 'Tuple', 'Relation']
          },
          {
            id: 'k2',
            type: 'bullet_points',
            title: 'Key Types Summary',
            items: [
              'Super Key: Set of attributes that uniquely identify a row.',
              'Candidate Key: Minimal Super Key with no extraneous attributes.',
              'Primary Key: Selected candidate key chosen by the database designer.',
              'Foreign Key: Field matching the primary key of another table.'
            ],
            keywords: ['Super Key', 'Candidate Key', 'Primary Key', 'Foreign Key']
          },
          {
            id: 'k3',
            type: 'important_box',
            title: 'Exam Quick Check',
            content: 'Remember: All Candidate Keys are Super Keys, but not all Super Keys are Candidate Keys!',
            keywords: ['Super Key vs Candidate Key']
          }
        ]
      }
    },
    {
      id: 'template-telugu',
      title: 'Telugu + English Bilingual Study Card',
      subtitle: 'English Technical Vocabulary + Native Telugu Analogies',
      badge: 'Bilingual',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: <Globe2 className="w-5 h-5 text-emerald-600" />,
      description: 'Engineered for students who comprehend complex logic faster in Telugu while writing examination answers in professional English.',
      mode: 'telugu-english',
      noteData: {
        id: 'tpl-telugu-' + Date.now(),
        title: 'Computer Networks: TCP vs UDP (Telugu + English)',
        topic: 'Transport Layer Protocols',
        subject: 'Computer Networks',
        mode: 'telugu-english',
        dateStr: new Date().toLocaleDateString('en-GB'),
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
        tags: ['Template', 'Telugu-English', 'Networking'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sections: [
          {
            id: 'te1',
            type: 'telugu_explanation',
            title: 'TCP Protocol (Transmission Control Protocol)',
            content: 'TCP is connection-oriented, reliable, and guarantees in-order packet delivery using a 3-Way Handshake mechanism.',
            teluguContent: 'సులభంగా చెప్పాలంటే: Registered Post లాంటిది. లెటర్ చేరినట్లు రసీదు (ACK) వస్తేనే నెక్స్ట్ పని జరుగుతుంది. ఎక్కడైనా డేటా మిస్ అయితే మళ్లీ పంపిస్తుంది.',
            keywords: ['TCP', 'Connection-oriented', 'Reliable', '3-Way Handshake']
          },
          {
            id: 'te2',
            type: 'telugu_explanation',
            title: 'UDP Protocol (User Datagram Protocol)',
            content: 'UDP is connectionless, lightweight, and transmits data without acknowledging delivery.',
            teluguContent: 'సులభంగా చెప్పాలంటే: లైవ్ టీవీ లేదా యూట్యూబ్ లైవ్ స్ట్రీమింగ్ లాంటిది. వేగంగా వెళ్లడమే ముఖ్యం, ఒకటి రెండు ఫ్రేమ్‌లు మిస్ అయినా ఆగదు.',
            keywords: ['UDP', 'Connectionless', 'Low Overhead', 'Streaming']
          }
        ]
      }
    },
    {
      id: 'template-cornell',
      title: 'Cornell Revision Sheet Template',
      subtitle: 'Left Recall Column + Main Notes + Summary Box',
      badge: 'Active Recall',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <BookOpen className="w-5 h-5 text-amber-600" />,
      description: 'The world-renowned Cornell note-taking layout designed specifically for active recall and self-quizzing before exam day.',
      mode: 'comprehensive',
      noteData: {
        id: 'tpl-cornell-' + Date.now(),
        title: 'Data Structures: Tree Traversals (Cornell Sheet)',
        topic: 'In-order, Pre-order, Post-order',
        subject: 'Data Structures & Algorithms',
        mode: 'comprehensive',
        dateStr: new Date().toLocaleDateString('en-GB'),
        style: {
          font: 'kalam',
          paper: 'cornell',
          headingColor: '#1e40af',
          bodyColor: '#18181b',
          accentColor: '#dc2626',
          highlightColor: '#15803d',
          fontSize: 'md',
          lineSpacing: 'normal',
          showMargin: true,
          showDateBox: true,
        },
        tags: ['Template', 'Cornell', 'DSA'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sections: [
          {
            id: 'c1',
            type: 'definition',
            title: 'Tree Traversal Fundamentals',
            content: 'Tree traversal is the process of visiting every node in a tree data structure exactly once in a systematic order.',
            keywords: ['Tree Traversal', 'Systematic Order', 'Binary Tree']
          },
          {
            id: 'c2',
            type: 'bullet_points',
            title: 'Standard Traversal Sequences',
            items: [
              'In-order (LNR): Left -> Root -> Right. For BST, produces sorted non-decreasing output.',
              'Pre-order (NLR): Root -> Left -> Right. Ideal for cloning or serializing trees.',
              'Post-order (LRN): Left -> Right -> Root. Used for deleting or evaluating bottom-up trees.'
            ],
            keywords: ['In-order', 'Pre-order', 'Post-order', 'Sorted Output']
          }
        ]
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Exam Note Blueprints</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Exam Notes Templates
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Pre-structured layouts tested against university answer rubrics. Click any template to immediately open and customize it in the Handwriting Studio.
        </p>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-md border ${tpl.badgeColor}`}>
                  {tpl.badge}
                </span>
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  {tpl.icon}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                {tpl.title}
              </h3>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                {tpl.subtitle}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {tpl.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {tpl.noteData.sections.length} Pre-built Sections
              </span>
              <button
                onClick={() => {
                  onSelectTemplate(tpl.noteData);
                  onNavigate('editor');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
