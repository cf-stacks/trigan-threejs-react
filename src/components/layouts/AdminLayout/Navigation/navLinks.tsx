import {
  IconArticle,
  IconClipboardText,
  IconFiles,
  IconLanguage,
  IconList,
  IconMail,
  IconUser,
  IconUsers,
  IconUserCircle,
  IconTriangle,
  IconUserPlus,
  IconBrandTopbuzz,
  IconWorldWww,
  IconArrowSharpTurnRight,
  IconSchema,
  IconBrandLinkedin,
  IconBriefcase,
  TablerIcon,
  IconId
} from '@tabler/icons'

export interface NavLinkItem {
  icon: TablerIcon,
  url: string,
  label?: string
  links?: NavLinkItem[],
  roleIds?: number[]
}

export const navLinks: NavLinkItem[] = [
  {
    icon: IconUser,
    url: 'admin',
    label: 'Admin',
    links: [
      { url: 'mailinglist', icon: IconMail, label: 'Mailing list' },
      { url: 'managelanguages', icon: IconLanguage, label: 'Manage languages' },
      { url: 'document-changes', icon: IconFiles, label: 'Document changes' },
      { url: 'teammembers-proposals', icon: IconUsers, label: 'Team members proposals' },
      { url: 'admin-invitations', icon: IconUserPlus, label: 'Admin Invitations' },
    ],
  },
  {
    icon:IconId,
    url:'linkedin',
    label:'Recruitment',
    links:[
      { icon: IconBrandLinkedin, url: 'linkedin', label: 'LinkedIn' },
      { icon: IconBrandLinkedin, url: 'linkedinaccounts', label: 'LinkedIn accounts' },
      { icon: IconBriefcase, url: 'linkedinjobs', label: 'LinkedIn jobs' },
      { icon: IconFiles, url: 'linkedinapplicants', label: 'LinkedIn applicants' },
      { icon: IconFiles, url: 'hiring-role', label: 'Hiring Role' },
      { icon: IconFiles, url: 'hiring-role-process', label: 'Hiring Role Process' },
      { icon: IconFiles, url: 'hiring-role-process-step', label: 'Hiring Role Process Step' },
      { icon: IconFiles, url: 'hiring-role-applicant', label: 'Hiring Role Applicant' },
      { icon: IconFiles, url: 'hiring-role-applicant-process', label: 'Hiring Role Applicant Process' }
    ]
  },
  {
    icon:IconWorldWww,
    url:'documents',
    label:'Website',
    links:[
      { icon: IconFiles, url: 'documents', label: 'Documents' },
      { icon: IconArrowSharpTurnRight, url: 'milestones', label: 'Milestones' },
      { icon: IconTriangle, url: 'ABtesting', label: 'AB testing' },
      { icon: IconList, url: 'content', label: 'Content' }
    ]
  },
  {
    icon:IconUserCircle,
    url:'',
    label:'Users',
    links:[
      { icon: IconUserPlus, url: 'users', label: "Users" },    
      { icon: IconUsers, url: 'teammembers', label: 'Team members' }
    ]
  },
  {
    icon:IconBrandTopbuzz,
    url:'posts',
    label:'Moderation',
    links:[
      { icon: IconArticle, url: 'posts', label: "Posts" },
      { icon: IconSchema, url: 'posts-proposal', label: 'Posts proposal' },
      { icon: IconClipboardText, url: 'proposals', label: 'Proposals' }
    ]
  }
]
