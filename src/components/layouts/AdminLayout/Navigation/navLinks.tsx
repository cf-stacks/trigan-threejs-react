import {
  IconArticle,
  IconClipboardText,
  IconFiles,
  IconLanguage,
  IconList,
  IconMail,
  IconUser,
  IconUsers,
  IconTriangle,
  IconUserPlus,
  IconArrowSharpTurnRight,
  IconSchema,
  IconBrandLinkedin,
  IconBriefcase,
  TablerIcon,
} from '@tabler/icons'

export interface NavLinkItem {
  icon: TablerIcon,
  url: string
  label?: string
  links?: NavLinkItem[]
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
    ],
  },
  { icon: IconUserPlus, url: 'users', label: "Users" },
  { icon: IconArticle, url: 'posts', label: "Posts" },
  { icon: IconSchema, url: 'posts-proposal', label: 'Posts proposal' },
  { icon: IconArrowSharpTurnRight, url: 'milestones', label: 'Milestones' },
  { icon: IconUsers, url: 'teammembers', label: 'Team members' },
  { icon: IconFiles, url: 'documents', label: 'Documents' },
  { icon: IconClipboardText, url: 'proposals', label: 'Proposals' },
  { icon: IconList, url: 'content', label: 'Content' },
  { icon: IconTriangle, url: 'ABtesting', label: 'AB testing' },
  { icon: IconBrandLinkedin, url: 'linkedinaccounts', label: 'LinkedIn accounts' },
  { icon: IconBriefcase, url: 'linkedinjobs', label: 'LinkedIn jobs' },
  { icon: IconFiles, url: 'linkedinapplicants', label: 'LinkedIn applicants' },
]
